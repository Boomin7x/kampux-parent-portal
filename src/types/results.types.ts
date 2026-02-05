export interface AcademicResultsOverview {
    studentId: string;
    currentTerm: string;
    academicYear: string;
    overallPerformance: OverallPerformance;
    subjectResults: SubjectResult[];
    sequentialAssessments: SequentialAssessment[];
    termReports: TermReport[];
    teacherComments: TeacherComment[];
    performanceTrends: PerformanceTrend[];
    lastUpdated: string;
}

export interface OverallPerformance {
    currentGPA: number;
    currentGrade: string;
    classRank: number;
    totalStudentsInClass: number;
    overallPercentage: number;
    gradeStatus:
        | 'excellent'
        | 'good'
        | 'satisfactory'
        | 'needs_improvement'
        | 'unsatisfactory';
    termCompletion: number; // percentage of term completed
    assessmentCompletion: number; // percentage of assessments completed
}

export interface SubjectResult {
    id: string;
    subject: string;
    subjectCode: string;
    teacher: ResultTeacher;
    examiner?: ResultTeacher;
    currentGrade: string;
    currentPercentage: number;
    creditHours: number;
    gradePoints: number;
    classAverage: number;
    highestMark: number;
    lowestMark: number;
    studentRank: number;
    totalStudents: number;
    assessments: Assessment[];
    attendance: SubjectAttendance;
    status: 'active' | 'completed' | 'dropped';
    lastAssessmentDate: string;
}

export interface SequentialAssessment {
    id: string;
    sequenceNumber: number;
    assessmentPeriod: string; // e.g., "Week 1-4", "Month 1"
    startDate: string;
    endDate: string;
    subjects: SequentialSubjectResult[];
    overallPerformance: {
        averagePercentage: number;
        totalMarks: number;
        obtainedMarks: number;
        grade: string;
        rank: number;
    };
    teacherComments: string[];
    status: 'completed' | 'in_progress' | 'pending';
}

export interface SequentialSubjectResult {
    subject: string;
    teacher: string;
    marksObtained: number;
    totalMarks: number;
    percentage: number;
    grade: string;
    assessmentType:
        | 'test'
        | 'assignment'
        | 'project'
        | 'presentation'
        | 'practical';
    assessmentDate: string;
    comments?: string;
}

export interface TermReport {
    id: string;
    term: string;
    academicYear: string;
    startDate: string;
    endDate: string;
    subjects: TermSubjectResult[];
    overallSummary: {
        totalMarks: number;
        obtainedMarks: number;
        percentage: number;
        gpa: number;
        grade: string;
        rank: number;
        totalStudents: number;
    };
    attendance: {
        totalDays: number;
        daysPresent: number;
        daysAbsent: number;
        attendancePercentage: number;
    };
    conduct: ConductAssessment;
    extracurricular: ExtracurricularActivity[];
    principalComments: string;
    classTeacherComments: string;
    nextTermBegins: string;
    isPromoted: boolean;
    status: 'published' | 'draft' | 'under_review';
    publishedDate?: string;
}

export interface TermSubjectResult {
    subject: string;
    subjectCode: string;
    teacher: ResultTeacher;
    examiner?: ResultTeacher;
    continuousAssessment: number;
    midtermExam: number;
    finalExam: number;
    totalMarks: number;
    obtainedMarks: number;
    percentage: number;
    grade: string;
    gradePoints: number;
    position: number;
    highestInClass: number;
    classAverage: number;
    teacherComments: string;
    effortGrade: 'A' | 'B' | 'C' | 'D';
    conductGrade: 'A' | 'B' | 'C' | 'D';
}

export interface Assessment {
    id: string;
    name: string;
    type:
        | 'quiz'
        | 'test'
        | 'midterm'
        | 'final'
        | 'assignment'
        | 'project'
        | 'practical'
        | 'presentation';
    date: string;
    marksObtained: number;
    totalMarks: number;
    percentage: number;
    grade: string;
    weight: number; // weight in final grade calculation
    feedback?: string;
    status: 'graded' | 'pending' | 'submitted' | 'overdue';
    submissionDate?: string;
    dueDate?: string;
}

export interface ResultTeacher {
    id: string;
    name: string;
    title: string;
    subject: string;
    department: string;
    email: string;
    phone?: string;
    avatar?: string;
    qualifications: string[];
    experienceYears: number;
}

export interface TeacherComment {
    id: string;
    teacherId: string;
    teacherName: string;
    subject: string;
    commentType: 'improvement' | 'praise' | 'concern' | 'general';
    comment: string;
    date: string;
    isPrivate: boolean;
}

export interface PerformanceTrend {
    subject: string;
    trend: 'improving' | 'declining' | 'stable';
    trendValue: number; // percentage change
    dataPoints: {
        period: string;
        percentage: number;
        grade: string;
    }[];
    recommendation?: string;
}

export interface SubjectAttendance {
    totalClasses: number;
    classesAttended: number;
    attendancePercentage: number;
    lastClassDate: string;
}

export interface ConductAssessment {
    punctuality: 'A' | 'B' | 'C' | 'D';
    discipline: 'A' | 'B' | 'C' | 'D';
    cooperation: 'A' | 'B' | 'C' | 'D';
    leadership: 'A' | 'B' | 'C' | 'D';
    initiative: 'A' | 'B' | 'C' | 'D';
    overallConduct: 'A' | 'B' | 'C' | 'D';
    comments?: string;
}

export interface ExtracurricularActivity {
    activity: string;
    participation: 'excellent' | 'good' | 'satisfactory' | 'poor';
    achievements?: string[];
    position?: string;
    comments?: string;
}

export interface ResultsAnalytics {
    strongestSubjects: string[];
    weakestSubjects: string[];
    improvementAreas: string[];
    consistentPerformers: string[];
    gradeDistribution: {
        grade: string;
        count: number;
        percentage: number;
    }[];
}
