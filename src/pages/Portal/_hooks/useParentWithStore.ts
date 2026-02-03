/**
 * Enhanced parent hooks that work with the student store
 * These hooks automatically use the selected student ID from Zustand
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelectedStudent } from '../../../hooks/useSelectedStudent';
import {
    parentService,
    type CreateComplaintRequest,
    type CreateComplaintResponse,
    type GetBillingsResponse,
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
} as const;

// Hook to get students (same as before)
export const useGetStudents = () => {
    return useQuery<GetStudentsResponse, Error>({
        queryKey: PARENT_QUERY_KEYS.students,
        queryFn: parentService.getStudents,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
};

// Hook to get class timetable
export const useGetClassTimeTable = () => {
    return useQuery<GetTimeTableResponse, Error>({
        queryKey: PARENT_QUERY_KEYS.timetable,
        queryFn: parentService.getClassTimeTable,
        staleTime: 30 * 60 * 1000, // 30 minutes
        gcTime: 60 * 60 * 1000, // 1 hour
    });
};

// Hook to get billings for the currently selected student
export const useGetSelectedStudentBillings = () => {
    const { selectedStudentId, hasSelectedStudent } = useSelectedStudent();

    return useQuery<GetBillingsResponse, Error>({
        queryKey: PARENT_QUERY_KEYS.billings(selectedStudentId || ''),
        queryFn: () => parentService.getStudentBillings(selectedStudentId!),
        enabled: hasSelectedStudent,
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook to get teller operations for the currently selected student
export const useGetSelectedStudentTellerOps = () => {
    const { selectedStudentId, hasSelectedStudent } = useSelectedStudent();

    return useQuery<GetTellerOperationsResponse, Error>({
        queryKey: PARENT_QUERY_KEYS.tellerOperations(selectedStudentId || ''),
        queryFn: () => parentService.getTellerOperations(selectedStudentId!),
        enabled: hasSelectedStudent,
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook to get billings for a specific student ID
export const useGetStudentBillings = (
    studentId: string,
    enabled: boolean = true
) => {
    return useQuery<GetBillingsResponse, Error>({
        queryKey: PARENT_QUERY_KEYS.billings(studentId),
        queryFn: () => parentService.getStudentBillings(studentId),
        enabled: enabled && !!studentId,
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook to get teller operations for a specific student ID
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

// Hook to create complaint for the currently selected student
export const useCreateComplaintForSelectedStudent = () => {
    const { selectedStudentId } = useSelectedStudent();
    const queryClient = useQueryClient();

    return useMutation<
        CreateComplaintResponse,
        Error,
        Omit<CreateComplaintRequest, 'studentId'>
    >({
        mutationFn: complaintData =>
            parentService.createComplaint({
                ...complaintData,
                studentId: selectedStudentId!,
            }),
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

// Hook to create complaint for any student
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
