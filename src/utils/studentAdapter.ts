/**
 * Student adapter utilities
 * Converts between API student type and UI student type
 */

import type { Student as APIStudent } from '../pages/Portal/_service/parentService';
import type { Student as UIStudent } from '../types/student.types';

/**
 * Convert API student to UI student format
 */
export const convertAPIStudentToUI = (apiStudent: APIStudent): UIStudent => {
    const fullName = `${apiStudent.firstName} ${apiStudent.lastName}`.trim();

    return {
        id: apiStudent.id.toString(),
        firstName: apiStudent.firstName,
        lastName: apiStudent.lastName,
        fullName,
        studentId:
            apiStudent.registrationCode ||
            apiStudent.studentCode ||
            apiStudent.id.toString(),
        grade: apiStudent.schoolYearClassName || 'Unknown',
        gradeLevel:
            parseInt(
                apiStudent.schoolYearClassName?.match(/\d+/)?.[0] || '0'
            ) || 0,
        dateOfBirth: apiStudent.birthDate,
        enrollmentDate: apiStudent.statusDate,
        graduationYear:
            new Date().getFullYear() +
            (18 -
                (new Date().getFullYear() -
                    new Date(apiStudent.birthDate).getFullYear())),
        homeroom: 'Room ' + (apiStudent.schoolYearClassId || 'Unknown'),
        homeroomTeacher: {
            id: 'teacher' + apiStudent.schoolYearClassId,
            name: 'Teacher',
            email: '',
            avatar: undefined,
        },
        status:
            apiStudent.status === '10'
                ? ('active' as const)
                : ('inactive' as const),
        emergencyContacts: [],
        parentIds: [
            apiStudent.fatherId?.toString(),
            apiStudent.motherId?.toString(),
            apiStudent.tutorId?.toString(),
        ].filter(Boolean) as string[],
        avatar: apiStudent.picturePath || undefined,
    };
};

/**
 * Convert API students array to UI students array
 */
export const convertAPIStudentsToUI = (
    apiStudents: APIStudent[]
): UIStudent[] => {
    return apiStudents.map(convertAPIStudentToUI);
};

/**
 * Create a display name for a student
 */
export const getStudentDisplayName = (
    student: APIStudent | UIStudent
): string => {
    if ('fullName' in student) {
        // UI Student
        return student.fullName;
    } else {
        // API Student
        return `${student.firstName} ${student.lastName}`.trim();
    }
};

/**
 * Create a display avatar for a student
 */
export const getStudentAvatar = (
    student: APIStudent | UIStudent
): string | undefined => {
    if ('fullName' in student) {
        // UI Student
        return student.avatar;
    } else {
        // API Student
        return student.picturePath || undefined;
    }
};

/**
 * Create a display grade for a student
 */
export const getStudentGrade = (student: APIStudent | UIStudent): string => {
    if ('grade' in student) {
        // UI Student
        return student.grade;
    } else {
        // API Student
        return student.schoolYearClassName || 'Unknown';
    }
};
