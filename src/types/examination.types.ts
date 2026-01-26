export interface ExaminationOverview {
    studentId: string;
    currentTerm: string;
    academicYear: string;
    upcomingExams: UpcomingExam[];
    recentExams: RecentExam[];
    examAnnouncements: ExamAnnouncement[];
    examCalendar: ExamCalendarEvent[];
    generalInstructions: ExamInstruction[];
    lastUpdated: string;
}

export interface UpcomingExam {
    id: string;
    subject: string;
    examType: 'midterm' | 'final' | 'quiz' | 'continuous_assessment' | 'practical';
    examDate: string;
    startTime: string;
    endTime: string;
    duration: number; // in minutes
    venue: ExamVenue;
    teacher: ExamTeacher;
    examiner?: ExamTeacher;
    instructions: string[];
    materialsRequired: string[];
    materialsNotAllowed: string[];
    syllabusCovered: string[];
    totalMarks: number;
    passingMarks: number;
    status: 'scheduled' | 'postponed' | 'cancelled' | 'completed';
    priority: 'high' | 'medium' | 'low';
    daysUntilExam: number;
}

export interface RecentExam {
    id: string;
    subject: string;
    examType: 'midterm' | 'final' | 'quiz' | 'continuous_assessment' | 'practical';
    examDate: string;
    venue: ExamVenue;
    teacher: ExamTeacher;
    examiner?: ExamTeacher;
    marksObtained?: number;
    totalMarks: number;
    grade?: string;
    percentage?: number;
    status: 'graded' | 'pending_results' | 'under_review';
    resultAnnouncementDate?: string;
}

export interface ExamAnnouncement {
    id: string;
    title: string;
    message: string;
    type: 'general' | 'subject_specific' | 'venue_change' | 'schedule_update' | 'instructions';
    priority: 'high' | 'medium' | 'low';
    targetAudience: 'all_students' | 'specific_grade' | 'specific_subject';
    subjects?: string[];
    grades?: string[];
    publishedDate: string;
    effectiveDate?: string;
    expiryDate?: string;
    publishedBy: ExamTeacher;
    isRead: boolean;
    attachments?: ExamAttachment[];
}

export interface ExamCalendarEvent {
    id: string;
    title: string;
    subject?: string;
    examType: 'midterm' | 'final' | 'quiz' | 'continuous_assessment' | 'practical';
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    venue: ExamVenue;
    description?: string;
    color: string;
    isAllDay: boolean;
}

export interface ExamVenue {
    id: string;
    name: string;
    building: string;
    floor?: number;
    capacity: number;
    facilities: string[];
    instructions?: string[];
    mapUrl?: string;
    contactPerson?: {
        name: string;
        phone: string;
        email: string;
    };
}

export interface ExamTeacher {
    id: string;
    name: string;
    title: string;
    subject: string;
    department: string;
    email: string;
    phone?: string;
    avatar?: string;
    officeHours?: string[];
    officeLocation?: string;
}

export interface ExamInstruction {
    id: string;
    category: 'general' | 'subject_specific' | 'venue_specific' | 'special_requirements';
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    applicableFor: 'all_exams' | 'specific_subjects' | 'specific_venues';
    subjects?: string[];
    venues?: string[];
    icon?: string;
}

export interface ExamAttachment {
    id: string;
    name: string;
    fileType: 'pdf' | 'doc' | 'image' | 'excel';
    fileSize: number;
    downloadUrl: string;
    uploadedDate: string;
}

export interface ExamStatistics {
    totalUpcomingExams: number;
    examsBySubject: {
        subject: string;
        count: number;
    }[];
    examsByType: {
        type: string;
        count: number;
    }[];
    nextExam: UpcomingExam | null;
    unreadAnnouncements: number;
}