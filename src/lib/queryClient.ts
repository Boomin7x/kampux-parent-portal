/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient } from '@tanstack/react-query';

// Professional TanStack Query configuration
export const createQueryClient = (): QueryClient => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // Stale time: 5 minutes for most queries
                staleTime: 1000 * 60 * 5,
                // Cache time: 10 minutes
                gcTime: 1000 * 60 * 10,
                // Retry failed requests 3 times with exponential backoff
                retry: (failureCount, error: any) => {
                    // Don't retry on 4xx errors (client errors)
                    if (
                        error?.response?.status >= 400 &&
                        error?.response?.status < 500
                    ) {
                        return false;
                    }
                    // Retry up to 3 times for other errors
                    return failureCount < 3;
                },
                retryDelay: attemptIndex =>
                    Math.min(1000 * 2 ** attemptIndex, 30000),
                // Refetch on window focus for important data
                refetchOnWindowFocus: false,
                // Refetch on reconnect
                refetchOnReconnect: true,
                // Network mode - online first
                networkMode: 'online',
            },
            mutations: {
                // Retry mutations once on network error
                retry: (failureCount, error: any) => {
                    // Don't retry client errors (400-499)
                    if (
                        error?.response?.status >= 400 &&
                        error?.response?.status < 500
                    ) {
                        return false;
                    }
                    // Retry once for network errors
                    return failureCount < 1;
                },
                retryDelay: 1000,
                // Network mode
                networkMode: 'online',
                onError: (error: any) => {
                    // Global error handling for mutations
                    console.error('Mutation error:', error);
                    // TODO: Add toast notification here
                },
            },
        },
    });
};

// Singleton query client instance
export const queryClient = createQueryClient();

// Query keys factory for consistent key management
export const queryKeys = {
    all: ['app'] as const,

    // Authentication
    auth: () => [...queryKeys.all, 'auth'] as const,
    currentUser: () => [...queryKeys.auth(), 'current-user'] as const,

    // Students
    students: () => [...queryKeys.all, 'students'] as const,
    studentList: (parentId: string) =>
        [...queryKeys.students(), 'list', parentId] as const,
    studentDetail: (studentId: string) =>
        [...queryKeys.students(), 'detail', studentId] as const,
    studentGrades: (studentId: string) =>
        [...queryKeys.students(), 'grades', studentId] as const,
    studentAttendance: (studentId: string) =>
        [...queryKeys.students(), 'attendance', studentId] as const,

    // School
    school: () => [...queryKeys.all, 'school'] as const,
    schoolInfo: () => [...queryKeys.school(), 'info'] as const,
    schoolEvents: () => [...queryKeys.school(), 'events'] as const,

    // Announcements
    announcements: () => [...queryKeys.all, 'announcements'] as const,
    announcementList: (filters?: Record<string, any>) =>
        [...queryKeys.announcements(), 'list', filters] as const,

    // Reports
    reports: () => [...queryKeys.all, 'reports'] as const,
    progressReport: (studentId: string, period: string) =>
        [...queryKeys.reports(), 'progress', studentId, period] as const,
} as const;

// Query invalidation helpers
export const invalidateQueries = {
    all: () => queryClient.invalidateQueries({ queryKey: queryKeys.all }),
    auth: () => queryClient.invalidateQueries({ queryKey: queryKeys.auth() }),
    students: () =>
        queryClient.invalidateQueries({ queryKey: queryKeys.students() }),
    studentData: (studentId: string) => {
        queryClient.invalidateQueries({
            queryKey: queryKeys.studentDetail(studentId),
        });
        queryClient.invalidateQueries({
            queryKey: queryKeys.studentGrades(studentId),
        });
        queryClient.invalidateQueries({
            queryKey: queryKeys.studentAttendance(studentId),
        });
    },
    school: () =>
        queryClient.invalidateQueries({ queryKey: queryKeys.school() }),
    announcements: () =>
        queryClient.invalidateQueries({ queryKey: queryKeys.announcements() }),
    reports: () =>
        queryClient.invalidateQueries({ queryKey: queryKeys.reports() }),
};

// Prefetch helpers for performance optimization
export const prefetchQueries = {
    studentDetail: async (studentId: string) => {
        await queryClient.prefetchQuery({
            queryKey: queryKeys.studentDetail(studentId),
            staleTime: 1000 * 60 * 2, // 2 minutes
        });
    },

    schoolInfo: async () => {
        await queryClient.prefetchQuery({
            queryKey: queryKeys.schoolInfo(),
            staleTime: 1000 * 60 * 30, // 30 minutes (school info changes rarely)
        });
    },
};
