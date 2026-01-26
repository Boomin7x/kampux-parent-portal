// Student-related type definitions for the parent portal system

export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    studentId: string;
    grade: string;
    gradeLevel: number;
    dateOfBirth: string;
    avatar?: string;
    enrollmentDate: string;
    graduationYear: number;
    homeroom: string;
    homeroomTeacher: {
        id: string;
        name: string;
        email: string;
        avatar?: string;
    };
    status: 'active' | 'inactive' | 'graduated' | 'transferred';
    emergencyContacts: EmergencyContact[];
    medicalInfo?: MedicalInfo;
    parentIds: string[];
}

export interface EmergencyContact {
    id: string;
    name: string;
    relationship: string;
    phone: string;
    email?: string;
    address?: string;
    isPrimary: boolean;
    canPickUp: boolean;
}

export interface MedicalInfo {
    allergies: string[];
    medications: string[];
    medicalConditions: string[];
    doctorName?: string;
    doctorPhone?: string;
    insuranceProvider?: string;
    lastPhysicalDate?: string;
}

export interface Parent {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string;
    avatar?: string;
    relationship: 'mother' | 'father' | 'guardian' | 'stepparent' | 'other';
    isEmergencyContact: boolean;
    canPickUp: boolean;
    receiveNotifications: boolean;
    preferredContactMethod: 'email' | 'phone' | 'both';
    children: Student[];
}

export interface StudentEnrollment {
    studentId: string;
    schoolYear: string;
    grade: string;
    enrollmentStatus: 'active' | 'inactive' | 'pending' | 'completed';
    enrollmentDate: string;
    withdrawalDate?: string;
    withdrawalReason?: string;
}

export interface AcademicYear {
    id: string;
    year: string; // e.g., "2024-2025"
    startDate: string;
    endDate: string;
    quarters: Quarter[];
    isCurrentYear: boolean;
}

export interface Quarter {
    id: string;
    name: string; // e.g., "Q1", "Q2", "Semester 1"
    startDate: string;
    endDate: string;
    isCurrentQuarter: boolean;
}

export interface ClassSchedule {
    studentId: string;
    schoolYear: string;
    classes: ClassInfo[];
    lastUpdated: string;
}

export interface ClassInfo {
    id: string;
    subject: string;
    courseCode: string;
    courseName: string;
    teacher: Teacher;
    classroom: string;
    period: number;
    meetingDays: string[]; // ['Monday', 'Wednesday', 'Friday']
    startTime: string;
    endTime: string;
    credits: number;
    semester: 'Fall' | 'Spring' | 'Full Year' | 'Summer';
}

export interface Teacher {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone?: string;
    avatar?: string;
    department: string;
    subjects: string[];
    yearsExperience: number;
    bio?: string;
    officeLocation?: string;
    officeHours?: string;
}

// Filter and sorting options
export interface StudentFilters {
    grade?: string[];
    status?: ('active' | 'inactive' | 'graduated' | 'transferred')[];
    schoolYear?: string;
}

export interface StudentSortOptions {
    field: 'name' | 'grade' | 'enrollmentDate' | 'gpa';
    direction: 'asc' | 'desc';
}

// API response types
export interface StudentsResponse {
    students: Student[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

export interface StudentDetailResponse {
    student: Student;
    enrollment: StudentEnrollment;
    schedule: ClassSchedule;
    academicYear: AcademicYear;
}