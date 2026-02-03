/**
 * Hook to easily access the selected student ID throughout the app
 * Use this for API queries and navigation
 */

import { useStudentStore } from '../stores/studentStore';

export const useSelectedStudent = () => {
    const { selectedStudentId, setSelectedStudent, clearSelectedStudent } = useStudentStore();

    return {
        // The current selected student ID - use this for API queries
        selectedStudentId,

        // Actions
        setSelectedStudent,
        clearSelectedStudent,

        // Utility
        hasSelectedStudent: !!selectedStudentId,
    };
};