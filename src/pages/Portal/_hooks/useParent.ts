import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useStudentStore } from '../../../stores/studentStore';
import {
    parentService,
    type CreateComplaintRequest,
    type CreateComplaintResponse,
    type GetBillingsResponse,
    type GetCodificationItemsResponse,
    type GetStudentsResponse,
    type GetTellerOperationsResponse,
    type GetTimeTableResponse,
} from '../_service/parentService';

// Query Keys
export const PARENT_QUERY_KEYS = {
    students: ['parent', 'students'],
    timetable: ['parent', 'timetable'],
    billings: (studentId: string) => ['parent', 'billings', studentId],
    tellerOperations: (studentId: string) => [
        'parent',
        'teller-operations',
        studentId,
    ],
    codificationItems: (codes: string) => [
        'parent',
        'codification-items',
        codes,
    ],
} as const;

// Custom hook to get students linked to parent
export const useGetStudents = () => {
    return useQuery<GetStudentsResponse, Error>({
        queryKey: PARENT_QUERY_KEYS.students,
        queryFn: parentService.getStudents,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
    });
};

// Custom hook to get class timetable
export const useGetClassTimeTable = () => {
    const { schoolYearClassId } = useStudentStore();
    return useQuery<GetTimeTableResponse, Error>({
        queryKey: PARENT_QUERY_KEYS.timetable,
        queryFn: () => parentService.getClassTimeTable(schoolYearClassId),
        staleTime: 30 * 60 * 1000, // 30 minutes (timetable doesn't change often)
        gcTime: 60 * 60 * 1000, // 1 hour
    });
};

// Custom hook to get student billings
export const useGetStudentBillings = (
    studentId: string,
    enabled: boolean = true
) => {
    return useQuery<GetBillingsResponse, Error>({
        queryKey: PARENT_QUERY_KEYS.billings(studentId),
        queryFn: () => parentService.getStudentBillings(studentId),
        enabled: enabled && !!studentId,
        staleTime: 2 * 60 * 1000, // 2 minutes (billing data should be fresh)
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Custom hook to get teller operations (payments)
export const useGetTellerOperations = (
    studentId: string,
    enabled: boolean = true
) => {
    return useQuery<GetTellerOperationsResponse, Error>({
        queryKey: PARENT_QUERY_KEYS.tellerOperations(studentId),
        queryFn: () => parentService.getTellerOperations(studentId),
        enabled: enabled && !!studentId,
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Custom hook to get codification items
export const useGetCodificationItems = (
    codificationCodes: string | string[],
    enabled: boolean = true
) => {
    // Convert codes to consistent string format for cache key
    const codesKey = Array.isArray(codificationCodes)
        ? codificationCodes.join(',')
        : codificationCodes;

    return useQuery<GetCodificationItemsResponse, Error>({
        queryKey: PARENT_QUERY_KEYS.codificationItems(codesKey),
        queryFn: () => parentService.getCodificationItems(codificationCodes),
        enabled:
            enabled &&
            !!codificationCodes &&
            (Array.isArray(codificationCodes)
                ? codificationCodes.length > 0
                : codificationCodes.length > 0),
        staleTime: 30 * 60 * 1000, // 30 minutes (codification items don't change often)
        gcTime: 60 * 60 * 1000, // 1 hour
    });
};

// Custom hook to create complaint
export const useCreateComplaint = () => {
    const queryClient = useQueryClient();

    return useMutation<CreateComplaintResponse, Error, CreateComplaintRequest>({
        mutationFn: parentService.createComplaint,
        onSuccess: data => {
            console.log('Complaint created successfully:', data);

            // Invalidate students query to refresh any complaint-related data
            queryClient.invalidateQueries({
                queryKey: PARENT_QUERY_KEYS.students,
            });
        },
        onError: error => {
            console.error('Failed to create complaint:', error);
        },
    });
};

// Combined hook to get all student-related data
export const useStudentData = (studentId: string) => {
    const studentsQuery = useGetStudents();
    const billingsQuery = useGetStudentBillings(studentId, !!studentId);
    const tellerOperationsQuery = useGetTellerOperations(
        studentId,
        !!studentId
    );

    return {
        students: studentsQuery,
        billings: billingsQuery,
        tellerOperations: tellerOperationsQuery,
        isLoading:
            studentsQuery.isLoading ||
            billingsQuery.isLoading ||
            tellerOperationsQuery.isLoading,
        hasError:
            studentsQuery.isError ||
            billingsQuery.isError ||
            tellerOperationsQuery.isError,
        error:
            studentsQuery.error ||
            billingsQuery.error ||
            tellerOperationsQuery.error,
    };
};

// Hook to refresh all student data
export const useRefreshStudentData = () => {
    const queryClient = useQueryClient();

    const refreshAll = (studentId?: string) => {
        // Invalidate students query
        queryClient.invalidateQueries({ queryKey: PARENT_QUERY_KEYS.students });

        // Invalidate timetable
        queryClient.invalidateQueries({
            queryKey: PARENT_QUERY_KEYS.timetable,
        });

        // If studentId is provided, invalidate student-specific queries
        if (studentId) {
            queryClient.invalidateQueries({
                queryKey: PARENT_QUERY_KEYS.billings(studentId),
            });
            queryClient.invalidateQueries({
                queryKey: PARENT_QUERY_KEYS.tellerOperations(studentId),
            });
        } else {
            // Invalidate all billings and teller operations
            queryClient.invalidateQueries({ queryKey: ['parent', 'billings'] });
            queryClient.invalidateQueries({
                queryKey: ['parent', 'teller-operations'],
            });
            // Invalidate all codification items
            queryClient.invalidateQueries({
                queryKey: ['parent', 'codification-items'],
            });
        }
    };

    return { refreshAll };
};
