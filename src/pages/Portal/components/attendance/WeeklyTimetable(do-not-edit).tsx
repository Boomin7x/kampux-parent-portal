// import {
//     Cancel as AbsentIcon,
//     GetApp as DownloadIcon,
//     Warning as LateIcon,
//     CheckCircle as PresentIcon,
//     Print as PrintIcon,
//     Schedule as ScheduleIcon,
//     Today as TodayIcon,
// } from '@mui/icons-material';
// import {
//     Box,
//     Button,
//     Chip,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Tooltip,
//     Typography,
// } from '@mui/material';
// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { useStudentStore } from '../../../../stores/studentStore';
// import type { Student } from '../../../../types/student.types';
// import { useGetClassTimeTable } from '../../_hooks/useParent';

// interface WeeklyTimetableProps {
//     selectedStudent: Student | null;
//     weekOffset?: number;
// }

// interface TimetableSlot {
//     id: string;
//     subject: string;
//     teacher: string;
//     room: string;
//     startTime: string;
//     endTime: string;
//     color: string;
//     type: 'academic' | 'break' | 'lunch' | 'activity';
//     attendance?: 'present' | 'absent' | 'late';
//     notes?: string;
// }

// interface DaySchedule {
//     day: string;
//     date: string;
//     slots: TimetableSlot[];
// }

// // API Response Interfaces
// interface TimetableEvent {
//     title: string;
//     start: string;
//     end: string;
//     extendedProps: {
//         Id: number;
//         SchoolYearTimeSlotId: number | null;
//     };
// }

// interface TimetableApiResponse {
//     weekStart: string;
//     weekEnd: string;
//     minTimeStr: string;
//     maxTimeStr: string;
//     timetableEvents: TimetableEvent[];
// }

// interface TimeSlotInfo {
//     startTime: string;
//     endTime: string;
//     timeSlot: string;
// }

// // Mock simplified timetable data for visual presentation
// const mockTimetable: DaySchedule[] = [
//     {
//         day: 'Monday',
//         date: '2024-01-15',
//         slots: [
//             {
//                 id: '1',
//                 subject: 'Mathematics',
//                 teacher: 'Ms. Rodriguez',
//                 room: 'Room 204',
//                 startTime: '08:00',
//                 endTime: '08:45',
//                 color: '#3b82f6',
//                 type: 'academic',
//                 attendance: 'present',
//             },
//             {
//                 id: '2',
//                 subject: 'English Literature',
//                 teacher: 'Mr. Thompson',
//                 room: 'Room 105',
//                 startTime: '08:50',
//                 endTime: '09:35',
//                 color: '#10b981',
//                 type: 'academic',
//                 attendance: 'present',
//             },
//             {
//                 id: '3',
//                 subject: 'Break',
//                 teacher: '',
//                 room: 'Cafeteria',
//                 startTime: '09:35',
//                 endTime: '09:50',
//                 color: '#6b7280',
//                 type: 'break',
//             },
//             {
//                 id: '4',
//                 subject: 'Science',
//                 teacher: 'Dr. Wilson',
//                 room: 'Lab 1',
//                 startTime: '09:50',
//                 endTime: '10:35',
//                 color: '#f59e0b',
//                 type: 'academic',
//                 attendance: 'present',
//             },
//             {
//                 id: '5',
//                 subject: 'History',
//                 teacher: 'Ms. Davis',
//                 room: 'Room 308',
//                 startTime: '10:40',
//                 endTime: '11:25',
//                 color: '#ef4444',
//                 type: 'academic',
//                 attendance: 'late',
//                 notes: '5 min late',
//             },
//             {
//                 id: '6',
//                 subject: 'Lunch Break',
//                 teacher: '',
//                 room: 'Cafeteria',
//                 startTime: '11:25',
//                 endTime: '12:10',
//                 color: '#6b7280',
//                 type: 'lunch',
//             },
//             {
//                 id: '7',
//                 subject: 'Physical Education',
//                 teacher: 'Coach Martinez',
//                 room: 'Gymnasium',
//                 startTime: '12:10',
//                 endTime: '12:55',
//                 color: '#16a34a',
//                 type: 'activity',
//                 attendance: 'present',
//             },
//             {
//                 id: '8',
//                 subject: 'Art & Crafts',
//                 teacher: 'Mrs. Chen',
//                 room: 'Art Studio',
//                 startTime: '13:00',
//                 endTime: '13:45',
//                 color: '#ec4899',
//                 type: 'activity',
//                 attendance: 'present',
//             },
//         ],
//     },
//     {
//         day: 'Tuesday',
//         date: '2024-01-16',
//         slots: [
//             {
//                 id: '9',
//                 subject: 'Science',
//                 teacher: 'Dr. Wilson',
//                 room: 'Lab 1',
//                 startTime: '08:00',
//                 endTime: '08:45',
//                 color: '#f59e0b',
//                 type: 'academic',
//                 attendance: 'absent',
//                 notes: 'Sick leave',
//             },
//             {
//                 id: '10',
//                 subject: 'Mathematics',
//                 teacher: 'Ms. Rodriguez',
//                 room: 'Room 204',
//                 startTime: '08:50',
//                 endTime: '09:35',
//                 color: '#3b82f6',
//                 type: 'academic',
//                 attendance: 'present',
//             },
//             {
//                 id: '11',
//                 subject: 'Break',
//                 teacher: '',
//                 room: 'Cafeteria',
//                 startTime: '09:35',
//                 endTime: '09:50',
//                 color: '#6b7280',
//                 type: 'break',
//             },
//             {
//                 id: '12',
//                 subject: 'Geography',
//                 teacher: 'Mr. Parker',
//                 room: 'Room 201',
//                 startTime: '09:50',
//                 endTime: '10:35',
//                 color: '#06b6d4',
//                 type: 'academic',
//                 attendance: 'present',
//             },
//         ],
//     },
//     {
//         day: 'Wednesday',
//         date: '2024-01-17',
//         slots: [
//             {
//                 id: '13',
//                 subject: 'English Literature',
//                 teacher: 'Mr. Thompson',
//                 room: 'Room 105',
//                 startTime: '08:00',
//                 endTime: '08:45',
//                 color: '#10b981',
//                 type: 'academic',
//                 attendance: 'present',
//             },
//             {
//                 id: '14',
//                 subject: 'Chemistry',
//                 teacher: 'Dr. Brown',
//                 room: 'Lab 2',
//                 startTime: '08:50',
//                 endTime: '09:35',
//                 color: '#84cc16',
//                 type: 'academic',
//                 attendance: 'present',
//             },
//         ],
//     },
//     {
//         day: 'Thursday',
//         date: '2024-01-18',
//         slots: [
//             {
//                 id: '15',
//                 subject: 'Mathematics',
//                 teacher: 'Ms. Rodriguez',
//                 room: 'Room 204',
//                 startTime: '08:00',
//                 endTime: '08:45',
//                 color: '#3b82f6',
//                 type: 'academic',
//                 attendance: 'present',
//             },
//             {
//                 id: '16',
//                 subject: 'Music',
//                 teacher: 'Ms. Garcia',
//                 room: 'Music Room',
//                 startTime: '08:50',
//                 endTime: '09:35',
//                 color: '#f97316',
//                 type: 'activity',
//                 attendance: 'present',
//             },
//         ],
//     },
//     {
//         day: 'Friday',
//         date: '2024-01-19',
//         slots: [
//             {
//                 id: '17',
//                 subject: 'Science Review',
//                 teacher: 'Dr. Wilson',
//                 room: 'Lab 1',
//                 startTime: '08:00',
//                 endTime: '08:45',
//                 color: '#f59e0b',
//                 type: 'academic',
//                 attendance: 'present',
//             },
//             {
//                 id: '18',
//                 subject: 'Library Period',
//                 teacher: 'Ms. White',
//                 room: 'Library',
//                 startTime: '08:50',
//                 endTime: '09:35',
//                 color: '#a855f7',
//                 type: 'activity',
//                 attendance: 'present',
//             },
//         ],
//     },
// ];

// // Subject categorization and color mapping
// const getSubjectCategory = (
//     title: string
// ): 'academic' | 'activity' | 'break' | 'lunch' => {
//     const lowerTitle = title.toLowerCase();

//     if (lowerTitle.includes('break') || lowerTitle.includes('récré')) {
//         return 'break';
//     }
//     if (
//         lowerTitle.includes('lunch') ||
//         lowerTitle.includes('déjeuner') ||
//         lowerTitle.includes('repas')
//     ) {
//         return 'lunch';
//     }
//     if (
//         lowerTitle.includes('physique') ||
//         lowerTitle.includes('sport') ||
//         lowerTitle.includes('manuel') ||
//         lowerTitle.includes('art') ||
//         lowerTitle.includes('musique')
//     ) {
//         return 'activity';
//     }
//     return 'academic';
// };

// const getSubjectColor = (
//     title: string,
//     type: 'academic' | 'activity' | 'break' | 'lunch'
// ): string => {
//     const lowerTitle = title.toLowerCase();

//     if (type === 'break' || type === 'lunch') return '#6b7280';
//     if (type === 'activity') return '#16a34a';

//     // Academic subjects color mapping
//     if (lowerTitle.includes('math')) return '#3b82f6';
//     if (lowerTitle.includes('anglais') || lowerTitle.includes('english'))
//         return '#10b981';
//     if (lowerTitle.includes('science')) return '#f59e0b';
//     if (lowerTitle.includes('histoire') || lowerTitle.includes('history'))
//         return '#ef4444';
//     if (lowerTitle.includes('géographie') || lowerTitle.includes('geography'))
//         return '#06b6d4';
//     if (lowerTitle.includes('français') || lowerTitle.includes('french'))
//         return '#84cc16';
//     if (lowerTitle.includes('économie') || lowerTitle.includes('economy'))
//         return '#f97316';
//     if (lowerTitle.includes('physique')) return '#16a34a';
//     return '#f59e0b'; // Default purple
// };

// // Generate dynamic time slots from API events
// const generateTimeSlots = (events: TimetableEvent[]): TimeSlotInfo[] => {
//     const times = new Set<string>();

//     events.forEach(event => {
//         const startTime = new Date(event.start).toLocaleTimeString('en-GB', {
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: false,
//         });
//         const endTime = new Date(event.end).toLocaleTimeString('en-GB', {
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: false,
//         });
//         times.add(startTime);
//         times.add(endTime);
//     });

//     const sortedTimes = Array.from(times).sort();
//     const slots: TimeSlotInfo[] = [];

//     for (let i = 0; i < sortedTimes.length - 1; i++) {
//         slots.push({
//             startTime: sortedTimes[i],
//             endTime: sortedTimes[i + 1],
//             timeSlot: `${sortedTimes[i]} - ${sortedTimes[i + 1]}`,
//         });
//     }

//     return slots;
// };

// // Transform API data to timetable format
// const transformApiDataToTimetable = (
//     apiData: TimetableApiResponse
// ): {
//     timetable: DaySchedule[];
//     timeSlots: string[];
// } => {
//     if (!apiData || !apiData.timetableEvents) {
//         return { timetable: [], timeSlots: [] };
//     }

//     const timeSlotInfos = generateTimeSlots(apiData.timetableEvents);
//     const timeSlots = timeSlotInfos.map(slot => slot.timeSlot);

//     const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
//     const timetable: DaySchedule[] = [];

//     const weekStart = new Date(apiData.weekStart);

//     weekDays.forEach((dayName, dayIndex) => {
//         const currentDate = new Date(weekStart);
//         currentDate.setDate(weekStart.getDate() + dayIndex);
//         const dayDateStr = currentDate.toISOString().split('T')[0];

//         const dayEvents = apiData.timetableEvents.filter(event => {
//             const eventDate = event.start.split(' ')[0];
//             return eventDate === dayDateStr;
//         });

//         const slots: TimetableSlot[] = [];

//         timeSlotInfos.forEach((timeInfo, timeIndex) => {
//             const matchingEvent = dayEvents.find(event => {
//                 const eventStartTime = new Date(event.start).toLocaleTimeString(
//                     'fr-FR',
//                     {
//                         hour: '2-digit',
//                         minute: '2-digit',
//                         hour12: false,
//                     }
//                 );
//                 return eventStartTime === timeInfo.startTime;
//             });

//             if (matchingEvent) {
//                 const type = getSubjectCategory(matchingEvent.title);
//                 const color = getSubjectColor(matchingEvent.title, type);

//                 slots.push({
//                     id: matchingEvent.extendedProps.Id.toString(),
//                     subject: matchingEvent.title,
//                     teacher: '', // Not provided in API
//                     room: '', // Not provided in API
//                     startTime: timeInfo.startTime,
//                     endTime: timeInfo.endTime,
//                     color,
//                     type,
//                     attendance: undefined, // Will be handled separately
//                 });
//             }
//         });

//         timetable.push({
//             day: dayName,
//             date: dayDateStr,
//             slots,
//         });
//     });

//     return { timetable, timeSlots };
// };

// export const WeeklyTimetable: React.FC<WeeklyTimetableProps> = ({
//     selectedStudent,
//     weekOffset = 0,
// }) => {
//     const printRef = useRef<HTMLDivElement>(null);

//     const { schoolYearClassId } = useStudentStore();
//     console.log({ schoolYearClassId });

//     const { data } = useGetClassTimeTable();
//     console.log({ data });

//     const handlePrint = useReactToPrint({
//         contentRef: printRef,
//         documentTitle: `${selectedStudent?.fullName || 'Student'} - Weekly Timetable`,
//         pageStyle: `
//             @media print {
//                 body { margin: 0; }
//                 table { page-break-inside: avoid; }
//                 .no-print { display: none !important; }
//             }
//         `,
//     });

//     const getWeekDates = () => {
//         if (data?.weekStart) {
//             const startOfWeek = new Date(data.weekStart);
//             const weekDates = [];
//             for (let i = 0; i < 5; i++) {
//                 const date = new Date(startOfWeek);
//                 date.setDate(startOfWeek.getDate() + i);
//                 weekDates.push(date);
//             }
//             return weekDates;
//         }

//         // Fallback to current week calculation
//         const today = new Date();
//         const startOfWeek = new Date(today);
//         startOfWeek.setDate(
//             today.getDate() - today.getDay() + 1 + weekOffset * 7
//         );

//         const weekDates = [];
//         for (let i = 0; i < 5; i++) {
//             const date = new Date(startOfWeek);
//             date.setDate(startOfWeek.getDate() + i);
//             weekDates.push(date);
//         }
//         return weekDates;
//     };

//     const getCurrentDay = () => {
//         const today = new Date().toLocaleDateString('en-US', {
//             weekday: 'long',
//         });
//         const weekDates = getWeekDates();

//         // Check if today falls within the displayed week
//         const todayDate = new Date();
//         todayDate.setHours(0, 0, 0, 0);

//         for (const date of weekDates) {
//             if (date.getTime() === todayDate.getTime()) {
//                 return today;
//             }
//         }

//         return null; // Today is not in the current week view
//     };

//     // Transform API data to UI format
//     const { timetable: transformedTimetable, timeSlots: dynamicTimeSlots } =
//         data
//             ? transformApiDataToTimetable(
//                   data as unknown as TimetableApiResponse
//               )
//             : {
//                   timetable: mockTimetable,
//                   timeSlots: [
//                       '08:00 - 08:45',
//                       '08:50 - 09:35',
//                       '09:35 - 09:50',
//                       '09:50 - 10:35',
//                       '10:40 - 11:25',
//                       '11:25 - 12:10',
//                       '12:10 - 12:55',
//                       '13:00 - 13:45',
//                   ],
//               };

//     const getSlotForDayAndTime = (
//         day: string,
//         timeIndex: number
//     ): TimetableSlot | null => {
//         const daySchedule = transformedTimetable.find(d => d.day === day);
//         return daySchedule?.slots[timeIndex] || null;
//     };

//     const getAttendanceIcon = (status?: string) => {
//         switch (status) {
//             case 'present':
//                 return (
//                     <PresentIcon sx={{ fontSize: 14, color: 'success.main' }} />
//                 );
//             case 'absent':
//                 return (
//                     <AbsentIcon sx={{ fontSize: 14, color: 'error.main' }} />
//                 );
//             case 'late':
//                 return (
//                     <LateIcon sx={{ fontSize: 14, color: 'warning.main' }} />
//                 );
//             default:
//                 return null;
//         }
//     };

//     const renderSubjectCell = (
//         slot: TimetableSlot | null,
//         isCurrentDay: boolean
//     ) => {
//         if (!slot) {
//             return (
//                 <TableCell
//                     sx={{
//                         p: 0.5,
//                         border: '1px solid',
//                         borderColor: 'divider',
//                         minHeight: 48,
//                         backgroundColor: 'background.default',
//                     }}
//                 />
//             );
//         }

//         const isBreak = slot.type === 'break' || slot.type === 'lunch';
//         const attendanceIcon = getAttendanceIcon(slot.attendance);

//         return (
//             <TableCell
//                 sx={{
//                     p: 0.5,
//                     border: '1px solid',
//                     borderColor: 'divider',
//                     minHeight: 48,
//                     backgroundColor: isCurrentDay
//                         ? `${slot.color}08`
//                         : 'background.paper',
//                     position: 'relative',
//                     ...(isCurrentDay && {
//                         borderLeft: `3px solid ${slot.color}`,
//                     }),
//                 }}
//             >
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         gap: 0.25,
//                         minHeight: 40,
//                         justifyContent: 'center',
//                     }}
//                 >
//                     {!isBreak && (
//                         <>
//                             <Box
//                                 sx={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: 0.5,
//                                     mb: 0.25,
//                                 }}
//                             >
//                                 <Typography
//                                     variant="caption"
//                                     sx={{
//                                         fontWeight: 600,
//                                         fontSize: '0.6875rem',
//                                         lineHeight: 1,
//                                         color: isCurrentDay
//                                             ? slot.color
//                                             : 'text.primary',
//                                         flex: 1,
//                                     }}
//                                 >
//                                     {slot.subject}
//                                 </Typography>
//                                 {attendanceIcon}
//                             </Box>
//                             <Typography
//                                 variant="caption"
//                                 sx={{
//                                     fontSize: '0.625rem',
//                                     color: 'text.secondary',
//                                     lineHeight: 1,
//                                 }}
//                             >
//                                 {slot.teacher}
//                             </Typography>
//                             <Typography
//                                 variant="caption"
//                                 sx={{
//                                     fontSize: '0.5625rem',
//                                     color: 'text.secondary',
//                                     lineHeight: 1,
//                                 }}
//                             >
//                                 {slot.room}
//                             </Typography>
//                             {slot.notes && (
//                                 <Typography
//                                     variant="caption"
//                                     sx={{
//                                         fontSize: '0.5rem',
//                                         color: 'warning.main',
//                                         fontStyle: 'italic',
//                                         lineHeight: 1,
//                                     }}
//                                 >
//                                     {slot.notes}
//                                 </Typography>
//                             )}
//                         </>
//                     )}
//                     {isBreak && (
//                         <Box sx={{ textAlign: 'center' }}>
//                             <Typography
//                                 variant="caption"
//                                 sx={{
//                                     fontWeight: 500,
//                                     fontSize: '0.6875rem',
//                                     color: 'text.secondary',
//                                     fontStyle: 'italic',
//                                 }}
//                             >
//                                 {slot.subject}
//                             </Typography>
//                         </Box>
//                     )}
//                 </Box>
//             </TableCell>
//         );
//     };

//     if (!selectedStudent) {
//         return (
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     height: '40vh',
//                     gap: 2,
//                 }}
//             >
//                 <ScheduleIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
//                 <Typography variant="body1" color="text.secondary">
//                     Select a student to view their weekly timetable
//                 </Typography>
//             </Box>
//         );
//     }

//     const currentDay = getCurrentDay();
//     const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

//     // Calculate attendance stats
//     const allSlots = transformedTimetable.flatMap(day =>
//         day.slots.filter(slot => slot.type === 'academic')
//     );
//     const totalClasses = allSlots.length;
//     const attendedClasses = allSlots.filter(
//         slot => slot.attendance === 'present'
//     ).length;
//     const lateClasses = allSlots.filter(
//         slot => slot.attendance === 'late'
//     ).length;
//     const missedClasses = allSlots.filter(
//         slot => slot.attendance === 'absent'
//     ).length;
//     const attendanceRate =
//         totalClasses > 0
//             ? ((attendedClasses + lateClasses) / totalClasses) * 100
//             : 0;

//     return (
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//             {/* Header Section */}
//             <Box
//                 sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'flex-start',
//                     flexWrap: 'wrap',
//                     gap: 2,
//                 }}
//             >
//                 <Box>
//                     <Typography
//                         variant="subtitle1"
//                         sx={{
//                             fontWeight: 600,
//                             mb: 0.5,
//                             fontSize: '1rem',
//                         }}
//                     >
//                         Weekly Timetable
//                     </Typography>
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: 1.5,
//                             mb: 1,
//                         }}
//                     >
//                         <Typography
//                             variant="body2"
//                             sx={{
//                                 color: 'text.secondary',
//                                 fontSize: '0.8125rem',
//                             }}
//                         >
//                             {selectedStudent.fullName} • Grade{' '}
//                             {selectedStudent.grade}
//                         </Typography>
//                         <Chip
//                             label={`Today: ${currentDay}`}
//                             size="small"
//                             icon={<TodayIcon />}
//                             sx={{
//                                 height: 20,
//                                 fontSize: '0.625rem',
//                                 backgroundColor: 'primary.50',
//                                 color: 'primary.main',
//                                 '& .MuiChip-icon': {
//                                     fontSize: 12,
//                                 },
//                             }}
//                         />
//                     </Box>
//                 </Box>

//                 <Box sx={{ display: 'flex', gap: 1, className: 'no-print' }}>
//                     <Tooltip title="Download as PDF">
//                         <Button
//                             variant="outlined"
//                             size="small"
//                             startIcon={<DownloadIcon sx={{ fontSize: 14 }} />}
//                             sx={{
//                                 minWidth: 'auto',
//                                 px: 1.5,
//                                 py: 0.5,
//                                 fontSize: '0.75rem',
//                                 borderColor: 'divider',
//                                 color: 'text.secondary',
//                                 mr: 0.5,
//                                 '&:hover': {
//                                     backgroundColor: 'action.hover',
//                                     borderColor: 'primary.main',
//                                     color: 'primary.main',
//                                 },
//                             }}
//                         >
//                             PDF
//                         </Button>
//                     </Tooltip>
//                     <Tooltip title="Print Timetable">
//                         <Button
//                             variant="outlined"
//                             size="small"
//                             startIcon={<PrintIcon sx={{ fontSize: 14 }} />}
//                             onClick={handlePrint}
//                             sx={{
//                                 minWidth: 'auto',
//                                 px: 1.5,
//                                 py: 0.5,
//                                 fontSize: '0.75rem',
//                                 borderColor: 'divider',
//                                 color: 'text.secondary',
//                                 '&:hover': {
//                                     backgroundColor: 'action.hover',
//                                     borderColor: 'primary.main',
//                                     color: 'primary.main',
//                                 },
//                             }}
//                         >
//                             Print
//                         </Button>
//                     </Tooltip>
//                 </Box>
//             </Box>

//             {/* Quick Stats */}
//             <Box
//                 sx={{
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
//                     gap: 1.5,
//                     mb: 1,
//                     className: 'no-print',
//                 }}
//             >
//                 {[
//                     {
//                         label: 'Present',
//                         value: attendedClasses,
//                         icon: <PresentIcon />,
//                         color: 'success',
//                     },
//                     {
//                         label: 'Late',
//                         value: lateClasses,
//                         icon: <LateIcon />,
//                         color: 'warning',
//                     },
//                     {
//                         label: 'Absent',
//                         value: missedClasses,
//                         icon: <AbsentIcon />,
//                         color: 'error',
//                     },
//                     {
//                         label: 'Rate',
//                         value: `${attendanceRate.toFixed(0)}%`,
//                         icon: <ScheduleIcon />,
//                         color: 'primary',
//                     },
//                 ].map((stat, index) => (
//                     <Box
//                         key={index}
//                         sx={{
//                             p: 1.5,
//                             borderRadius: 1,
//                             backgroundColor: `${stat.color}.50`,
//                             border: '1px solid',
//                             borderColor: `${stat.color}.100`,
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: 1,
//                         }}
//                     >
//                         <Box
//                             sx={{
//                                 color: `${stat.color}.main`,
//                                 '& > svg': { fontSize: 16 },
//                             }}
//                         >
//                             {stat.icon}
//                         </Box>
//                         <Box>
//                             <Typography
//                                 variant="subtitle2"
//                                 sx={{
//                                     fontWeight: 600,
//                                     lineHeight: 1,
//                                     fontSize: '0.875rem',
//                                     color: `${stat.color}.main`,
//                                 }}
//                             >
//                                 {stat.value}
//                             </Typography>
//                             <Typography
//                                 variant="caption"
//                                 sx={{
//                                     fontSize: '0.625rem',
//                                     color: 'text.secondary',
//                                     lineHeight: 1,
//                                 }}
//                             >
//                                 {stat.label}
//                             </Typography>
//                         </Box>
//                     </Box>
//                 ))}
//             </Box>

//             {/* Timetable Grid */}
//             <Box ref={printRef}>
//                 <Paper
//                     elevation={0}
//                     sx={{
//                         border: '1px solid',
//                         borderColor: 'divider',
//                         borderRadius: 1,
//                         overflow: 'hidden',
//                         '@media print': {
//                             boxShadow: 'none',
//                             border: '1px solid #000',
//                         },
//                     }}
//                 >
//                     <TableContainer>
//                         <Table size="small" sx={{ minWidth: 600 }}>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell
//                                         sx={{
//                                             backgroundColor: 'primary.50',
//                                             borderRight: '1px solid',
//                                             borderColor: 'divider',
//                                             width: 120,
//                                             fontWeight: 600,
//                                             fontSize: '0.75rem',
//                                             py: 1,
//                                         }}
//                                     >
//                                         Time
//                                     </TableCell>
//                                     {weekDays.map(day => {
//                                         const isToday = day === currentDay;
//                                         return (
//                                             <TableCell
//                                                 key={day}
//                                                 sx={{
//                                                     backgroundColor: isToday
//                                                         ? 'primary.100'
//                                                         : 'primary.50',
//                                                     borderRight: '1px solid',
//                                                     borderColor: 'divider',
//                                                     fontWeight: 600,
//                                                     fontSize: '0.75rem',
//                                                     textAlign: 'center',
//                                                     py: 1,
//                                                     color: isToday
//                                                         ? 'primary.main'
//                                                         : 'text.primary',
//                                                     position: 'relative',
//                                                 }}
//                                             >
//                                                 {day}
//                                                 {isToday && (
//                                                     <Box
//                                                         sx={{
//                                                             position:
//                                                                 'absolute',
//                                                             bottom: 0,
//                                                             left: 0,
//                                                             right: 0,
//                                                             height: 2,
//                                                             backgroundColor:
//                                                                 'primary.main',
//                                                         }}
//                                                     />
//                                                 )}
//                                             </TableCell>
//                                         );
//                                     })}
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {dynamicTimeSlots.map((timeSlot, timeIndex) => (
//                                     <TableRow key={timeSlot}>
//                                         <TableCell
//                                             sx={{
//                                                 backgroundColor:
//                                                     'background.paper',
//                                                 borderRight: '1px solid',
//                                                 borderColor: 'divider',
//                                                 fontWeight: 500,
//                                                 fontSize: '0.6875rem',
//                                                 color: 'text.secondary',
//                                                 py: 0.75,
//                                                 verticalAlign: 'top',
//                                             }}
//                                         >
//                                             {timeSlot}
//                                         </TableCell>
//                                         {weekDays.map(day => {
//                                             const slot = getSlotForDayAndTime(
//                                                 day,
//                                                 timeIndex
//                                             );
//                                             const isCurrentDay =
//                                                 day === currentDay;
//                                             return renderSubjectCell(
//                                                 slot,
//                                                 isCurrentDay
//                                             );
//                                         })}
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Paper>
//             </Box>

//             {/* Legend */}
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexWrap: 'wrap',
//                     gap: 1.5,
//                     justifyContent: 'center',
//                     pt: 1,
//                     borderTop: '1px solid',
//                     borderColor: 'divider',
//                     className: 'no-print',
//                 }}
//             >
//                 {[
//                     { label: 'Academic', color: '#3b82f6', type: 'academic' },
//                     { label: 'Activity', color: '#16a34a', type: 'activity' },
//                     { label: 'Break/Lunch', color: '#6b7280', type: 'break' },
//                 ].map(item => (
//                     <Box
//                         key={item.type}
//                         sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: 0.5,
//                         }}
//                     >
//                         <Box
//                             sx={{
//                                 width: 12,
//                                 height: 12,
//                                 backgroundColor: item.color,
//                                 borderRadius: 0.5,
//                             }}
//                         />
//                         <Typography
//                             variant="caption"
//                             sx={{
//                                 fontSize: '0.6875rem',
//                                 color: 'text.secondary',
//                             }}
//                         >
//                             {item.label}
//                         </Typography>
//                     </Box>
//                 ))}
//             </Box>
//         </Box>
//     );
// };
