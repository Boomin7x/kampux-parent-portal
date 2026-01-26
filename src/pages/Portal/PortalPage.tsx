import { Box, Typography, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import type { Student } from '../../types/student.types';
import { AttendanceCalendar } from './components/attendance/AttendanceCalendar';
import { BillingOverview } from './components/billing/BillingOverview';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { ExaminationAnnouncements } from './components/examinations/ExaminationAnnouncements';
import { PortalLayout } from './components/layout/PortalLayout';
import { ResultsOverview } from './components/results/ResultsOverview';
import { StudentSelector } from './components/student/StudentSelector';

// Mock parent data with multiple children
const mockStudents: Student[] = [
    {
        id: 'student1',
        firstName: 'Emma',
        lastName: 'Johnson',
        fullName: 'Emma Johnson',
        studentId: 'STU001234',
        grade: '10',
        gradeLevel: 10,
        dateOfBirth: '2008-03-15',
        enrollmentDate: '2022-08-15',
        graduationYear: 2026,
        homeroom: 'Room 204',
        homeroomTeacher: {
            id: 'teacher1',
            name: 'Ms. Rodriguez',
            email: 'mrodriguez@excellenceacademy.edu',
            avatar: undefined,
        },
        status: 'active',
        emergencyContacts: [],
        parentIds: ['parent1'],
        avatar: undefined,
    },
    {
        id: 'student2',
        firstName: 'Michael',
        lastName: 'Johnson',
        fullName: 'Michael Johnson',
        studentId: 'STU001235',
        grade: '7',
        gradeLevel: 7,
        dateOfBirth: '2011-09-22',
        enrollmentDate: '2022-08-15',
        graduationYear: 2029,
        homeroom: 'Room 105',
        homeroomTeacher: {
            id: 'teacher2',
            name: 'Mr. Chen',
            email: 'mchen@excellenceacademy.edu',
            avatar: undefined,
        },
        status: 'active',
        emergencyContacts: [],
        parentIds: ['parent1'],
        avatar: undefined,
    },
];

const PortalPage: React.FC = () => {
    const navigate = useNavigate();
    const [students] = useState<Student[]>(mockStudents);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(true);

    // Initialize with first student for smoother UX
    useEffect(() => {
        if (students.length > 0) {
            // Auto-select first student for smoother UX
            setSelectedStudent(students[0]);
        }
        // Simulate brief loading for smooth transitions
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [students]);

    const handleStudentChange = (student: Student) => {
        setSelectedStudent(student);
        // Navigate to dashboard when student is selected
        navigate('dashboard');
    };

    if (isLoading) {
        return (
            <PortalLayout currentStudent={selectedStudent || undefined}>
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
                        Loading portal...
                    </Typography>
                </Box>
            </PortalLayout>
        );
    }

    return (
        <PortalLayout currentStudent={selectedStudent || undefined}>
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
                        element={
                            <BillingOverview
                                selectedStudent={selectedStudent}
                            />
                        }
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

                    {/* Catch all route */}
                    <Route
                        path="*"
                        element={<Navigate to="/portal/dashboard" replace />}
                    />
                    </Routes>
                </Box>
            </Box>
        </PortalLayout>
    );
};

export default PortalPage;
