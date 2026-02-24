/**
 * Type definitions for Faculty page content
 */

export interface FacultyMember {
    id: string;
    name: string;
    title: string;
    department: string;
    bio: string;
    photoUrl: string;
    email: string;
    qualifications: string[];
    yearsOfExperience: number;
    specializations?: string[];
}

export interface Department {
    id: string;
    name: string;
    description: string;
    facultyCount: number;
    icon: string;
    headOfDepartment?: string;
}

export interface FacultyStats {
    totalFaculty: number;
    averageExperience: number;
    advancedDegrees: string;
    departments: number;
}

export interface ProfessionalDevelopment {
    title: string;
    description: string;
    frequency: string;
}

export interface FacultyContent {
    overview: string;
    stats: FacultyStats;
    departments: Department[];
    faculty: FacultyMember[];
    professionalDevelopment: ProfessionalDevelopment[];
    recruitmentInfo: string;
}
