import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import type { Student } from '../../types/student.types';
import { AssignmentList } from './components/academic/AssignmentList';
import { GradesOverview } from './components/academic/GradesOverview';
import { AttendanceCalendar } from './components/attendance/AttendanceCalendar';
import { MessageCenter } from './components/communication/MessageCenter';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { PortalLayout } from './components/layout/PortalLayout';
import { PerformanceAnalytics } from './components/reports/PerformanceAnalytics';
import { ReportGenerator } from './components/reports/ReportGenerator';
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

    // Initialize with first student or redirect to student selection
    useEffect(() => {
        if (students.length > 0) {
            // Auto-select first student if only one, otherwise let user choose
            if (students.length === 1) {
                setSelectedStudent(students[0]);
            } else {
                // For multiple students, start with first one but allow easy switching
                setSelectedStudent(students[0]);
            }
        }
        setIsLoading(false);
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
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                    }}
                >
                    Loading...
                </Box>
            </PortalLayout>
        );
    }

    return (
        <PortalLayout currentStudent={selectedStudent || undefined}>
            <Box>
                {/* Student Selector - Always visible at the top */}
                <StudentSelector
                    students={students}
                    selectedStudent={selectedStudent}
                    onStudentChange={handleStudentChange}
                    className="mb-4"
                />

                {/* Route Content */}
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="dashboard" replace />}
                    />
                    <Route
                        path="dashboard"
                        element={
                            <DashboardOverview
                                selectedStudent={selectedStudent}
                            />
                        }
                    />
                    {/* Academic Routes */}
                    <Route
                        path="academic"
                        element={<Navigate to="academic/grades" replace />}
                    />
                    <Route
                        path="academic/grades"
                        element={
                            <GradesOverview selectedStudent={selectedStudent} />
                        }
                    />
                    <Route
                        path="academic/assignments"
                        element={
                            <AssignmentList selectedStudent={selectedStudent} />
                        }
                    />
                    <Route
                        path="academic/progress"
                        element={
                            <div>
                                Progress Reports coming soon... (Selected:{' '}
                                {selectedStudent?.fullName || 'None'})
                            </div>
                        }
                    />

                    {/* Attendance Routes */}
                    <Route
                        path="attendance"
                        element={<Navigate to="attendance/calendar" replace />}
                    />
                    <Route
                        path="attendance/calendar"
                        element={
                            <AttendanceCalendar
                                selectedStudent={selectedStudent}
                            />
                        }
                    />
                    <Route
                        path="attendance/summary"
                        element={
                            <div>
                                Attendance Summary coming soon... (Selected:{' '}
                                {selectedStudent?.fullName || 'None'})
                            </div>
                        }
                    />

                    {/* Communication Routes */}
                    <Route
                        path="communication"
                        element={
                            <Navigate to="communication/messages" replace />
                        }
                    />
                    <Route
                        path="communication/messages"
                        element={
                            <MessageCenter selectedStudent={selectedStudent} />
                        }
                    />
                    <Route
                        path="communication/announcements"
                        element={
                            <div>
                                Announcements coming soon... (Selected:{' '}
                                {selectedStudent?.fullName || 'None'})
                            </div>
                        }
                    />
                    <Route
                        path="communication/notifications"
                        element={
                            <div>
                                Notifications coming soon... (Selected:{' '}
                                {selectedStudent?.fullName || 'None'})
                            </div>
                        }
                    />
                    {/* Activities Routes */}
                    <Route
                        path="activities/*"
                        element={
                            <div>
                                Activities section coming soon... (Selected:{' '}
                                {selectedStudent?.fullName || 'None'})
                            </div>
                        }
                    />
                    {/* Reports Routes */}
                    <Route
                        path="reports"
                        element={<Navigate to="reports/analytics" replace />}
                    />
                    <Route
                        path="reports/analytics"
                        element={
                            <PerformanceAnalytics
                                selectedStudent={selectedStudent}
                            />
                        }
                    />
                    <Route
                        path="reports/generate"
                        element={
                            <ReportGenerator
                                selectedStudent={selectedStudent}
                            />
                        }
                    />
                    {/* Settings Route */}
                    <Route
                        path="settings"
                        element={<div>Settings section coming soon...</div>}
                    />
                    {/* DataTable Demo Route */}
                    {/* <Route
                        path="demo/datatable"
                        element={<DataTableExample />}
                    /> */}
                    {/* Catch all route */}
                    <Route
                        path="*"
                        element={<Navigate to="dashboard" replace />}
                    />
                </Routes>
            </Box>
        </PortalLayout>
    );
};

export default PortalPage;
