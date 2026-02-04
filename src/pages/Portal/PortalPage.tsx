import { Box, LinearProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useStudentStore } from '../../stores/studentStore';
import type { Student } from '../../types/student.types';
import { convertAPIStudentsToUI } from '../../utils/studentAdapter';
import { useGetStudents } from './_hooks/useParent';
import { AttendanceCalendar } from './components/attendance/AttendanceCalendar';
import { BillingOverview } from './components/billing/BillingOverview';
import PaymentHistory from './components/billing/PaymentHistory';
import CreateComplaints from './components/complaints/createComplaints';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { ExaminationAnnouncements } from './components/examinations/ExaminationAnnouncements';
import { PortalLayout } from './components/layout/PortalLayout';
import { ResultsOverview } from './components/results/ResultsOverview';
import { StudentSelector } from './components/student/StudentSelector';
import { StudentSheet } from './components/student/StudentSheet';
import { WeeklyTimetable } from './components/attendance/WeeklyTimetable';

// Mock parent data with multiple children
// const mockStudents: Student[] = [
//     {
//         id: 'student1',
//         firstName: 'Emma',
//         lastName: 'Johnson',
//         fullName: 'Emma Johnson',
//         studentId: 'STU001234',
//         grade: '10',
//         gradeLevel: 10,
//         dateOfBirth: '2008-03-15',
//         enrollmentDate: '2022-08-15',
//         graduationYear: 2026,
//         homeroom: 'Room 204',
//         homeroomTeacher: {
//             id: 'teacher1',
//             name: 'Ms. Rodriguez',
//             email: 'mrodriguez@excellenceacademy.edu',
//             avatar: undefined,
//         },
//         status: 'active',
//         emergencyContacts: [],
//         parentIds: ['parent1'],
//         avatar: undefined,
//     },
//     {
//         id: 'student2',
//         firstName: 'Michael',
//         lastName: 'Johnson',
//         fullName: 'Michael Johnson',
//         studentId: 'STU001235',
//         grade: '7',
//         gradeLevel: 7,
//         dateOfBirth: '2011-09-22',
//         enrollmentDate: '2022-08-15',
//         graduationYear: 2029,
//         homeroom: 'Room 105',
//         homeroomTeacher: {
//             id: 'teacher2',
//             name: 'Mr. Chen',
//             email: 'mchen@excellenceacademy.edu',
//             avatar: undefined,
//         },
//         status: 'active',
//         emergencyContacts: [],
//         parentIds: ['parent1'],
//         avatar: undefined,
//     },
// ];

const PortalPage: React.FC = () => {
    const navigate = useNavigate();
    // const { selectedStudentId, setSelectedStudent } = useStudentStore();

    // Get student store
    const {
        selectedStudentId,
        setSelectedStudent,
        schoolYearClassId,
        setSchoolYearClassId,
    } = useStudentStore();

    // Fetch students using the real API
    const {
        data: studentsResponse,
        isLoading,
        error,
        refetch,
    } = useGetStudents();

    // Log the API response for debugging
    useEffect(() => {
        console.log('🔍 Students API Response:', {
            data: studentsResponse,
            isLoading,
            error: error?.message || error,
            timestamp: new Date().toISOString(),
        });
    }, [studentsResponse, isLoading, error]);

    // Convert API students to UI format - NO FALLBACK, only real API data
    const apiStudents = studentsResponse || [];
    const students = convertAPIStudentsToUI(apiStudents);

    console.log('📊 Student conversion:', {
        apiStudentsCount: apiStudents.length,
        uiStudentsCount: students.length,
        apiPreview: apiStudents.slice(0, 1),
        uiPreview: students.slice(0, 1),
    });

    // Find selected student object
    const selectedStudent =
        students.find(s => s.id === selectedStudentId) || null;

    // Debug current state
    useEffect(() => {
        console.log('🎯 Current State:', {
            selectedStudentId,
            studentsCount: students.length,
            selectedStudent: selectedStudent
                ? {
                      id: selectedStudent.id,
                      name: selectedStudent.fullName,
                  }
                : null,
            studentsPreview: students.slice(0, 2).map(s => ({
                id: s.id,
                name: s.fullName,
            })),
        });
    }, [selectedStudentId, students, selectedStudent]);

    // Adapter for PortalLayout which expects different student format
    const layoutStudent = selectedStudent
        ? {
              id: selectedStudent.id,
              name: selectedStudent.fullName,
              avatar: selectedStudent.avatar,
              grade: selectedStudent.grade,
          }
        : undefined;

    // Auto-select first student if none selected

    console.log({ xxxxxx: students });
    useEffect(() => {
        if (students.length > 0 && (!selectedStudentId || !schoolYearClassId)) {
            console.log({ students });
            const firstStudent = students[0];
            setSelectedStudent(firstStudent.id?.toString());
            setSchoolYearClassId(firstStudent.schoolYearClassId);
        }
    }, [students, selectedStudentId, setSelectedStudent, setSchoolYearClassId]);

    const handleStudentChange = (student: Student) => {
        console.log('🔄 Student selection changed:', {
            studentId: student.id,
            studentName: student.fullName,
            previousSelection: selectedStudentId,
            currentStudents: students.length,
        });
        setSelectedStudent(student.id);
        setSchoolYearClassId(student.schoolYearClassId);
        console.log('✅ setSelectedStudent called with:', student.id);
        // Navigate to dashboard when student is selected
        navigate('dashboard');
    };

    // Show error state if API call fails
    if (error && !studentsResponse) {
        return (
            <PortalLayout currentStudent={layoutStudent}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '40vh',
                        gap: 2,
                    }}
                >
                    <Typography variant="h6" color="error">
                        Failed to load students
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {error?.message || 'An error occurred'}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="primary"
                        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={() => refetch()}
                    >
                        Click to retry
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                    >
                        No API data available...
                    </Typography>
                </Box>
            </PortalLayout>
        );
    }

    if (isLoading) {
        return (
            <PortalLayout currentStudent={layoutStudent}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '40vh',
                        gap: 2,
                    }}
                >
                    <LinearProgress sx={{ width: '200px' }} />
                    <Typography variant="body2" color="text.secondary">
                        Loading students from API...
                    </Typography>
                </Box>
            </PortalLayout>
        );
    }

    // Show message when no students returned from API
    if (!isLoading && students.length === 0) {
        return (
            <PortalLayout currentStudent={layoutStudent}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '40vh',
                        gap: 2,
                    }}
                >
                    <Typography variant="h6" color="warning.main">
                        No students found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        The API returned no students for this parent account.
                    </Typography>
                    <Typography
                        variant="body2"
                        color="primary"
                        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={() => refetch()}
                    >
                        Click to retry
                    </Typography>
                </Box>
            </PortalLayout>
        );
    }

    return (
        <PortalLayout currentStudent={layoutStudent}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Compact Student Selector */}
                <StudentSelector
                    students={students}
                    selectedStudent={selectedStudent}
                    onStudentChange={handleStudentChange}
                />

                {/* Main Content Area */}
                <Box sx={{ flex: 1, minHeight: 0 }}>
                    <Routes>
                        <Route
                            index
                            element={<Navigate to="dashboard" replace />}
                        />

                        {/* Dashboard Route */}
                        <Route
                            path="dashboard"
                            element={
                                <DashboardOverview
                                    selectedStudent={selectedStudent}
                                />
                            }
                        />

                        {/* Billing Routes */}
                        <Route
                            path="billing"
                            element={<Navigate to="overview" replace />}
                        />
                        <Route
                            path="billing/overview"
                            element={
                                <BillingOverview
                                    selectedStudent={selectedStudent}
                                />
                            }
                        />
                        <Route
                            path="billing/payments"
                            element={<PaymentHistory />}
                        />

                        {/* Examination Routes */}
                        <Route
                            path="examinations"
                            element={<Navigate to="announcements" replace />}
                        />
                        <Route
                            path="examinations/announcements"
                            element={
                                <ExaminationAnnouncements
                                    selectedStudent={selectedStudent}
                                />
                            }
                        />
                        <Route
                            path="examinations/calendar"
                            element={
                                <ExaminationAnnouncements
                                    selectedStudent={selectedStudent}
                                />
                            }
                        />

                        {/* Academic Results Routes */}
                        <Route
                            path="results"
                            element={<Navigate to="overview" replace />}
                        />
                        <Route
                            path="results/overview"
                            element={
                                <ResultsOverview
                                    selectedStudent={selectedStudent}
                                />
                            }
                        />
                        <Route
                            path="results/sequential"
                            element={
                                <ResultsOverview
                                    selectedStudent={selectedStudent}
                                />
                            }
                        />
                        <Route
                            path="results/term"
                            element={
                                <ResultsOverview
                                    selectedStudent={selectedStudent}
                                />
                            }
                        />

                        {/* Attendance Routes */}
                        <Route
                            path="attendance"
                            element={<Navigate to="timetable" replace />}
                        />
                        <Route
                            path="attendance/timetable"
                            element={
                                <AttendanceCalendar
                                    selectedStudent={selectedStudent}
                                />
                            }
                        />
                        <Route
                            path="attendance/tracking"
                            element={
                                <AttendanceCalendar
                                    selectedStudent={selectedStudent}
                                />
                            }
                        />
                        <Route
                            path="complaints"
                            element={<CreateComplaints />}
                        />
                        <Route
                            path="student-sheet"
                            element={
                                <StudentSheet
                                    selectedStudent={selectedStudent}
                                />
                            }
                        />
                        <Route
                            path="timetable"
                            element={
                                <WeeklyTimetable
                                    selectedStudent={selectedStudent}
                                />
                            }
                        />

                        {/* Catch all route */}
                        <Route
                            path="*"
                            element={
                                <Navigate to="/portal/dashboard" replace />
                            }
                        />
                    </Routes>
                </Box>
            </Box>
        </PortalLayout>
    );
};

export default PortalPage;
