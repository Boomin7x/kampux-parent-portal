/**
 * Type definitions for Academics page content
 */

export interface Program {
    id: string;
    name: string;
    gradeLevel: string;
    description: string;
    features: string[];
    subjects: string[];
}

export interface SpecialProgram {
    id: string;
    name: string;
    description: string;
    gradeLevels: string[];
    features: string[];
    icon: string;
}

export interface Subject {
    id: string;
    name: string;
    description: string;
    courses: string[];
    weeklyHours: number;
    icon: string;
}

export interface CalendarEvent {
    id: string;
    date: string;
    title: string;
    description: string;
    type: 'holiday' | 'exam' | 'event' | 'break';
}

export interface AcademicStats {
    graduationRate: string;
    collegeAcceptance: string;
    averageGPA: string;
    apCourses: string;
    studentTeacherRatio: string;
    nationalMeritScholars: string;
}

export interface AcademicsContent {
    philosophy: string;
    programs: Program[];
    specialPrograms: SpecialProgram[];
    curriculum: Subject[];
    calendar: CalendarEvent[];
    stats: AcademicStats;
}
