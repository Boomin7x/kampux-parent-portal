/**
 * Simple Student Store
 * Just stores the selected student ID for app navigation and queries
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StudentStore {
    selectedStudentId: string | null;
    setSelectedStudent: (studentId: string | null) => void;
    clearSelectedStudent: () => void;
}

export const useStudentStore = create<StudentStore>()(
    persist(
        set => ({
            selectedStudentId: null,

            setSelectedStudent: (studentId: string | null) => {
                console.log(
                    '🏪 Zustand: Setting selected student ID:',
                    studentId
                );
                set({ selectedStudentId: studentId });
                console.log(
                    '📝 Zustand: Selected student ID updated to:',
                    studentId
                );
            },

            clearSelectedStudent: () => {
                set({ selectedStudentId: null });
                console.log('🗑️ Cleared selected student');
            },
        }),
        {
            name: 'student-store',
        }
    )
);
