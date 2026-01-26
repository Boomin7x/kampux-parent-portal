// Attendance and tardiness tracking type definitions

export interface AttendanceRecord {
    id: string;
    studentId: string;
    date: string;
    status: AttendanceStatus;
    period?: number; // For period-specific attendance
    classId?: string; // If tracking per-class attendance
    timeIn?: string;
    timeOut?: string;
    excusedReason?: string;
    unexcusedReason?: string;
    verifiedBy: string; // Staff member ID
    notes?: string;
    parentNotified: boolean;
    parentNotifiedAt?: string;
    parentContactMethod?: 'email' | 'phone' | 'text';
    makeupWorkAssigned: boolean;
    makeupWorkCompleted: boolean;
}

export type AttendanceStatus =
    | 'present'
    | 'absent_excused'
    | 'absent_unexcused'
    | 'tardy_excused'
    | 'tardy_unexcused'
    | 'early_dismissal_excused'
    | 'early_dismissal_unexcused'
    | 'partial_day';

export interface AttendanceSummary {
    studentId: string;
    schoolYear: string;
    gradingPeriod?: string;
    totalSchoolDays: number;
    daysPresent: number;
    daysAbsent: number;
    excusedAbsences: number;
    unexcusedAbsences: number;
    tardies: number;
    excusedTardies: number;
    unexcusedTardies: number;
    earlyDismissals: number;
    attendanceRate: number; // Percentage
    tardyRate: number; // Percentage
    consecutiveAbsences: number;
    attendancePattern: AttendancePattern;
    alerts: AttendanceAlert[];
    trends: AttendanceTrend[];
}

export interface AttendancePattern {
    frequentAbsentDays: string[]; // Days of week frequently absent
    absentPeriods: number[]; // Class periods frequently missed
    seasonalTrends: SeasonalTrend[];
    timeOfDayPatterns: TimePattern[];
}

export interface SeasonalTrend {
    month: number;
    absenceRate: number;
    tardyRate: number;
    commonReasons: string[];
}

export interface TimePattern {
    period: number;
    className: string;
    absenceRate: number;
    tardyRate: number;
    possibleCauses: string[];
}

export interface AttendanceAlert {
    id: string;
    type: AttendanceAlertType;
    severity: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    message: string;
    threshold: number;
    currentValue: number;
    triggerDate: string;
    actionRequired: boolean;
    actionTaken?: string;
    actionDate?: string;
    parentNotified: boolean;
    counselorNotified: boolean;
    adminNotified: boolean;
}

export type AttendanceAlertType =
    | 'excessive_absences'
    | 'consecutive_absences'
    | 'chronic_tardiness'
    | 'attendance_improvement'
    | 'perfect_attendance'
    | 'truancy_risk'
    | 'pattern_concern';

export interface AttendanceTrend {
    period: string;
    startDate: string;
    endDate: string;
    attendanceRate: number;
    change: number; // Percentage change from previous period
    trend: 'improving' | 'declining' | 'stable';
    daysPresent: number;
    daysAbsent: number;
    tardies: number;
}

export interface AttendanceCalendarDay {
    date: string;
    status: AttendanceStatus;
    isSchoolDay: boolean;
    isHoliday: boolean;
    holidayName?: string;
    notes?: string;
    timeIn?: string;
    timeOut?: string;
    hasAlert: boolean;
    alertType?: AttendanceAlertType;
}

export interface AttendancePolicy {
    maxUnexcusedAbsences: number;
    maxConsecutiveAbsences: number;
    tardyThreshold: number; // Minutes late to be considered tardy
    tardyLimit: number; // Number of tardies before intervention
    truancyThreshold: number; // Unexcused absences triggering truancy
    makeupWorkPolicy: string;
    excusedReasons: string[];
    requiresDocumentation: string[]; // Reasons requiring doctor's note, etc.
}

export interface ExcuseRequest {
    id: string;
    studentId: string;
    attendanceRecordId: string;
    requestDate: string;
    requestedBy: string; // Parent/guardian ID
    reason: string;
    documentation?: ExcuseDocumentation[];
    status: 'pending' | 'approved' | 'denied';
    reviewedBy?: string;
    reviewedAt?: string;
    reviewNotes?: string;
    autoApproved: boolean;
}

export interface ExcuseDocumentation {
    id: string;
    type: 'medical_note' | 'court_document' | 'family_emergency' | 'other';
    fileName: string;
    fileUrl: string;
    uploadedAt: string;
    verified: boolean;
    verifiedBy?: string;
    verifiedAt?: string;
}

export interface MakeupWork {
    id: string;
    studentId: string;
    attendanceRecordId: string;
    classId: string;
    teacherId: string;
    assignmentIds: string[];
    dueDate: string;
    status: 'assigned' | 'in_progress' | 'completed' | 'overdue';
    notes?: string;
    completedAt?: string;
    gradeAdjustment?: number;
}

export interface AttendanceNotification {
    id: string;
    studentId: string;
    parentId: string;
    attendanceRecordId: string;
    type: 'absence' | 'tardy' | 'early_dismissal' | 'alert' | 'improvement';
    method: 'email' | 'sms' | 'phone' | 'app_notification';
    sentAt: string;
    delivered: boolean;
    deliveredAt?: string;
    opened?: boolean;
    openedAt?: string;
    responded?: boolean;
    response?: string;
    responseAt?: string;
}

// Period-specific attendance for secondary schools
export interface PeriodAttendance {
    id: string;
    studentId: string;
    classId: string;
    date: string;
    period: number;
    status: AttendanceStatus;
    timeMarked: string;
    markedBy: string; // Teacher ID
    notes?: string;
    parentNotified: boolean;
}

export interface ClassAttendanceSummary {
    classId: string;
    className: string;
    teacher: string;
    period: number;
    attendanceRate: number;
    studentAttendance: {
        studentId: string;
        studentName: string;
        presentDays: number;
        absentDays: number;
        tardyDays: number;
        attendanceRate: number;
    }[];
}

// API response types
export interface AttendanceResponse {
    summary: AttendanceSummary;
    calendar: AttendanceCalendarDay[];
    recentRecords: AttendanceRecord[];
    alerts: AttendanceAlert[];
    trends: AttendanceTrend[];
    policy: AttendancePolicy;
}

export interface AttendanceHistoryResponse {
    records: AttendanceRecord[];
    summary: AttendanceSummary;
    trends: AttendanceTrend[];
    periodBreakdown?: PeriodAttendance[];
}

export interface AttendanceAlertsResponse {
    alerts: AttendanceAlert[];
    thresholds: {
        absenceWarning: number;
        absenceCritical: number;
        tardyWarning: number;
        tardyCritical: number;
    };
    interventions: {
        available: string[];
        recommended: string[];
    };
}

// Enhanced attendance types for timetable and teacher tracking
export interface WeeklyTimetable {
    studentId: string;
    weekOf: string;
    schedule: DailySchedule[];
    lastUpdated: string;
}

export interface DailySchedule {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    date: string;
    classes: ClassSession[];
    isWeekend: boolean;
    isHoliday: boolean;
    holidayName?: string;
}

export interface ClassSession {
    id: string;
    subject: string;
    subjectCode: string;
    startTime: string;
    endTime: string;
    duration: number; // in minutes
    teacher: AttendanceTeacher;
    classroom: Classroom;
    sessionType: 'lecture' | 'practical' | 'tutorial' | 'study_hall' | 'break' | 'assembly';
    studentAttendance: StudentClassAttendance;
    teacherAttendance: TeacherClassAttendance;
    notes?: string;
    isOnline: boolean;
    meetingLink?: string;
    assignments?: ClassAssignment[];
}

export interface StudentClassAttendance {
    status: 'present' | 'absent' | 'late' | 'excused';
    timeIn?: string;
    timeOut?: string;
    lateMinutes?: number;
    reason?: string;
    markedBy: string;
    markedAt: string;
    isVerified: boolean;
}

export interface TeacherClassAttendance {
    isPresent: boolean;
    timeIn?: string;
    timeOut?: string;
    substituteTeacher?: AttendanceTeacher;
    reason?: string;
    classDeliveryMethod: 'in_person' | 'online' | 'hybrid' | 'cancelled';
    notes?: string;
}

export interface AttendanceTeacher {
    id: string;
    name: string;
    title: string;
    subject: string;
    department: string;
    email: string;
    phone?: string;
    avatar?: string;
    officeLocation?: string;
    officeHours?: string[];
}

export interface Classroom {
    id: string;
    name: string;
    building: string;
    floor?: number;
    capacity: number;
    type: 'regular' | 'laboratory' | 'workshop' | 'library' | 'gymnasium' | 'auditorium';
    facilities: string[];
    isAccessible: boolean;
}

export interface ClassAssignment {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
    submissionStatus: 'not_submitted' | 'submitted' | 'late' | 'graded';
}

export interface TeacherAttendanceOverview {
    totalClasses: number;
    classesWithTeacher: number;
    classesWithSubstitute: number;
    cancelledClasses: number;
    attendanceRate: number;
    subjectBreakdown: SubjectTeacherAttendance[];
}

export interface SubjectTeacherAttendance {
    subject: string;
    teacher: string;
    totalClasses: number;
    classesPresent: number;
    attendanceRate: number;
    lastAbsentDate?: string;
    substituteTeachers: string[];
}