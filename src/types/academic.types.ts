// Academic performance and grading type definitions

export interface Grade {
    id: string;
    studentId: string;
    classId: string;
    assignmentId: string;
    grade: string; // Letter grade (A, B, C, etc.) or percentage
    numericGrade: number; // 0-100 or 4.0 scale
    pointsEarned: number;
    pointsPossible: number;
    percentage: number;
    letterGrade: string;
    gpValue: number; // 4.0 scale
    dateGraded: string;
    gradedBy: string; // Teacher ID
    isExcused: boolean;
    isLate: boolean;
    teacherComments?: string;
    parentViewed: boolean;
    parentViewedAt?: string;
}

export interface Assignment {
    id: string;
    classId: string;
    title: string;
    description?: string;
    type: AssignmentType;
    category: AssignmentCategory;
    pointsPossible: number;
    dueDate: string;
    assignedDate: string;
    submissionType: SubmissionType[];
    isExtraCredit: boolean;
    allowLateSubmissions: boolean;
    latePenalty?: number; // percentage deduction per day
    rubricId?: string;
    instructions?: string;
    attachments?: AssignmentAttachment[];
    status: AssignmentStatus;
}

export type AssignmentType =
    | 'homework'
    | 'quiz'
    | 'test'
    | 'project'
    | 'essay'
    | 'lab'
    | 'presentation'
    | 'participation'
    | 'extra_credit';

export type AssignmentCategory =
    | 'classwork'
    | 'homework'
    | 'assessments'
    | 'projects'
    | 'participation'
    | 'final_exam';

export type SubmissionType =
    | 'online'
    | 'paper'
    | 'presentation'
    | 'file_upload'
    | 'text_entry';

export type AssignmentStatus =
    | 'assigned'
    | 'submitted'
    | 'graded'
    | 'returned'
    | 'missing'
    | 'late'
    | 'excused';

export interface AssignmentAttachment {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
}

export interface StudentAssignment {
    assignment: Assignment;
    submission?: AssignmentSubmission;
    grade?: Grade;
    status: AssignmentStatus;
    isOverdue: boolean;
    daysPastDue?: number;
}

export interface AssignmentSubmission {
    id: string;
    assignmentId: string;
    studentId: string;
    submittedAt: string;
    submissionType: SubmissionType;
    content?: string; // Text entry
    attachments?: AssignmentAttachment[];
    isLate: boolean;
    attempt: number;
    status: 'submitted' | 'draft' | 'graded';
    teacherFeedback?: string;
    grade?: Grade;
}

export interface SubjectPerformance {
    classId: string;
    subject: string;
    teacher: string;
    currentGrade: string;
    currentPercentage: number;
    currentGPA: number;
    letterGrade: string;
    trend: 'improving' | 'declining' | 'stable';
    trendPercentage: number; // % change from last period
    assignments: {
        total: number;
        completed: number;
        missing: number;
        late: number;
        upcoming: number;
    };
    categoryBreakdown: CategoryGrade[];
    recentGrades: Grade[];
    upcomingAssignments: Assignment[];
    lastUpdated: string;
}

export interface CategoryGrade {
    category: AssignmentCategory;
    weight: number; // Percentage weight in overall grade
    currentGrade: number;
    letterGrade: string;
    pointsEarned: number;
    pointsPossible: number;
    assignmentCount: number;
    dropLowest?: number; // How many lowest scores to drop
}

export interface GradingPeriod {
    id: string;
    name: string;
    type: 'quarter' | 'semester' | 'trimester' | 'year';
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    isFinalized: boolean;
    reportCardDate?: string;
    parentConferenceDate?: string;
}

export interface ReportCard {
    id: string;
    studentId: string;
    gradingPeriodId: string;
    schoolYear: string;
    issuedDate: string;
    subjects: SubjectGrade[];
    overallGPA: number;
    overallLetterGrade: string;
    classRank?: number;
    totalStudentsInClass?: number;
    attendanceSummary: {
        daysPresent: number;
        daysAbsent: number;
        daysTardy: number;
        totalDays: number;
    };
    behaviorGrades?: BehaviorGrade[];
    teacherComments: TeacherComment[];
    promotionStatus: 'promoted' | 'retained' | 'conditional';
    nextGradeLevel?: string;
}

export interface SubjectGrade {
    classId: string;
    subject: string;
    teacher: string;
    finalGrade: string;
    finalPercentage: number;
    finalGPA: number;
    effort: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement';
    categoryGrades: CategoryGrade[];
    absences: number;
    tardies: number;
    teacherComment?: string;
}

export interface BehaviorGrade {
    category: string; // 'Respect', 'Responsibility', 'Effort', etc.
    grade: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement';
    comment?: string;
}

export interface TeacherComment {
    teacherId: string;
    teacherName: string;
    subject?: string;
    comment: string;
    type: 'academic' | 'behavior' | 'general';
    isPositive: boolean;
}

export interface AcademicProgress {
    studentId: string;
    schoolYear: string;
    currentGPA: number;
    cumulativeGPA: number;
    classRank?: number;
    totalStudents?: number;
    creditProgress: {
        earned: number;
        required: number;
        onTrack: boolean;
    };
    gradeTrends: GradeTrend[];
    subjectPerformance: SubjectPerformance[];
    upcomingAssignments: Assignment[];
    missingAssignments: Assignment[];
    recentGrades: Grade[];
    performanceAlerts: PerformanceAlert[];
}

export interface GradeTrend {
    period: string;
    gpa: number;
    percentage: number;
    change: number;
    trend: 'improving' | 'declining' | 'stable';
}

export interface PerformanceAlert {
    id: string;
    type: 'missing_assignment' | 'failing_grade' | 'attendance' | 'behavior' | 'positive';
    severity: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    message: string;
    actionRequired: boolean;
    actionText?: string;
    classId?: string;
    teacherId?: string;
    createdAt: string;
    acknowledgedAt?: string;
    acknowledgedBy?: string;
}

// API response types
export interface AcademicSummaryResponse {
    student: {
        id: string;
        name: string;
        grade: string;
    };
    currentPeriod: GradingPeriod;
    overallGPA: number;
    subjectCount: number;
    subjectPerformance: SubjectPerformance[];
    upcomingAssignments: Assignment[];
    recentActivity: {
        newGrades: Grade[];
        missingAssignments: Assignment[];
        upcomingDueDates: Assignment[];
    };
    alerts: PerformanceAlert[];
}

export interface GradeHistoryResponse {
    grades: Grade[];
    assignments: Assignment[];
    trends: GradeTrend[];
    summary: {
        totalAssignments: number;
        completedAssignments: number;
        averageGrade: number;
        lowestGrade: number;
        highestGrade: number;
    };
}