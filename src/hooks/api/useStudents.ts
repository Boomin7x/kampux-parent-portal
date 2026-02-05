import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { queryKeys } from '../../lib/queryClient';
import { type Student } from '../../types';

// Student-related API types
export interface StudentGrade {
    id: string;
    subject: string;
    grade: string | number;
    maxGrade: number;
    date: string;
    teacher: string;
    comments?: string;
}

export interface StudentAttendance {
    id: string;
    date: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    notes?: string;
}

export interface StudentProgressReport {
    id: string;
    studentId: string;
    period: string;
    subjects: Array<{
        name: string;
        grade: string;
        teacher: string;
        comments: string;
    }>;
    overallGrade: string;
    teacherComments: string;
    generatedDate: string;
}

// API service functions
const studentsApi = {
    getStudentsByParent: async (parentId: string): Promise<Student[]> => {
        return api.get(`/students/parent/${parentId}`);
    },

    getStudentById: async (studentId: string): Promise<Student> => {
        return api.get(`/students/${studentId}`);
    },

    getStudentGrades: async (studentId: string): Promise<StudentGrade[]> => {
        return api.get(`/students/${studentId}/grades`);
    },

    getStudentAttendance: async (
        studentId: string,
        params?: { startDate?: string; endDate?: string }
    ): Promise<StudentAttendance[]> => {
        return api.get(`/students/${studentId}/attendance`, { params });
    },

    getProgressReport: async (
        studentId: string,
        period: string
    ): Promise<StudentProgressReport> => {
        return api.get(`/students/${studentId}/reports/${period}`);
    },

    updateStudentInfo: async (
        studentId: string,
        data: Partial<Student>
    ): Promise<Student> => {
        return api.put(`/students/${studentId}`, data);
    },
};

// React Query hooks

// Get students for a parent
export function useStudentsByParent(parentId: string) {
    return useQuery({
        queryKey: queryKeys.studentList(parentId),
        queryFn: () => studentsApi.getStudentsByParent(parentId),
        enabled: !!parentId,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
}

// Get individual student details
export function useStudent(studentId: string) {
    return useQuery({
        queryKey: queryKeys.studentDetail(studentId),
        queryFn: () => studentsApi.getStudentById(studentId),
        enabled: !!studentId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

// Get student grades
export function useStudentGrades(studentId: string) {
    return useQuery<StudentGrade[]>({
        queryKey: queryKeys.studentGrades(studentId),
        queryFn: () => studentsApi.getStudentGrades(studentId),
        enabled: !!studentId,
        staleTime: 1000 * 60 * 2, // 2 minutes (grades change frequently)
    });
}

// Get student attendance
export function useStudentAttendance(
    studentId: string,
    params?: { startDate?: string; endDate?: string }
) {
    return useQuery({
        queryKey: [...queryKeys.studentAttendance(studentId), params],
        queryFn: () => studentsApi.getStudentAttendance(studentId, params),
        enabled: !!studentId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

// Get progress report
export function useProgressReport(studentId: string, period: string) {
    return useQuery({
        queryKey: queryKeys.progressReport(studentId, period),
        queryFn: () => studentsApi.getProgressReport(studentId, period),
        enabled: !!studentId && !!period,
        staleTime: 1000 * 60 * 30, // 30 minutes (reports don't change often)
    });
}

// Update student information
export function useUpdateStudentInfo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            studentId,
            data,
        }: {
            studentId: string;
            data: Partial<Student>;
        }) => studentsApi.updateStudentInfo(studentId, data),
        onSuccess: updatedStudent => {
            // Update student detail cache
            queryClient.setQueryData(
                queryKeys.studentDetail(updatedStudent.id),
                updatedStudent
            );

            // Invalidate parent's student list
            queryClient.invalidateQueries({
                queryKey: queryKeys.studentList(updatedStudent.parentId),
            });
        },
    });
}

// Comprehensive hook for all student data
export function useStudentData(studentId: string) {
    const studentQuery = useStudent(studentId);
    const gradesQuery = useStudentGrades(studentId);
    const attendanceQuery = useStudentAttendance(studentId);

    return {
        // Data
        student: studentQuery.data,
        grades: gradesQuery.data,
        attendance: attendanceQuery.data,

        // Loading states
        isLoading:
            studentQuery.isLoading ||
            gradesQuery.isLoading ||
            attendanceQuery.isLoading,
        isStudentLoading: studentQuery.isLoading,
        isGradesLoading: gradesQuery.isLoading,
        isAttendanceLoading: attendanceQuery.isLoading,

        // Error states
        error: studentQuery.error || gradesQuery.error || attendanceQuery.error,
        studentError: studentQuery.error,
        gradesError: gradesQuery.error,
        attendanceError: attendanceQuery.error,

        // Refetch functions
        refetch: () => {
            studentQuery.refetch();
            gradesQuery.refetch();
            attendanceQuery.refetch();
        },
        refetchStudent: studentQuery.refetch,
        refetchGrades: gradesQuery.refetch,
        refetchAttendance: attendanceQuery.refetch,

        // Success states
        isSuccess:
            studentQuery.isSuccess &&
            gradesQuery.isSuccess &&
            attendanceQuery.isSuccess,
    };
}

// Hook for student statistics and analytics
export function useStudentStats(studentId: string) {
    const { grades, attendance } = useStudentData(studentId);

    const stats = {
        averageGrade: 0,
        attendanceRate: 0,
        totalAbsences: 0,
        recentGrades: [],
        subjectPerformance: {},
    };

    if (grades && grades.length > 0) {
        // Calculate average grade
        const numericGrades = grades
            .map(g =>
                typeof g.grade === 'number'
                    ? g.grade
                    : parseFloat(g.grade.toString())
            )
            .filter(g => !isNaN(g));

        if (numericGrades.length > 0) {
            stats.averageGrade =
                numericGrades.reduce((sum, grade) => sum + grade, 0) /
                numericGrades.length;
        }

        // Get recent grades (last 10)
        (stats as any).recentGrades = grades
            .sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, 10);

        // Subject performance
        stats.subjectPerformance = grades.reduce(
            (acc, grade) => {
                if (!acc[grade.subject]) {
                    acc[grade.subject] = [];
                }
                acc[grade.subject].push(grade);
                return acc;
            },
            {} as Record<string, StudentGrade[]>
        );
    }

    if (attendance && attendance.length > 0) {
        // Calculate attendance rate
        const totalDays = attendance.length;
        const presentDays = attendance.filter(
            a => a.status === 'present'
        ).length;
        stats.attendanceRate =
            totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

        // Count total absences
        stats.totalAbsences = attendance.filter(
            a => a.status === 'absent'
        ).length;
    }

    return stats;
}
