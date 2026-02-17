// Events & Announcements Section Content
export const eventsAnnouncementsSectionContent = {
    // Section Header
    overline: 'Events & Announcements',

    // Main Headlines
    title: {
        primary: 'Stay',
        secondary: 'Informed', // This gets gradient styling
    },

    // Subtitle
    subtitle:
        'Important announcements, exam schedules, and school updates delivered with clarity and timeliness.',

    // Events & Announcements Data
    events: [
        {
            id: 'finals-exams',
            type: 'exam',
            title: 'End-of-Term Examinations',
            description:
                'Final exams for all grades begin Monday, May 19 and end Friday, May 30. Students must bring their ID cards and required materials.',
            date: 'May 19 – May 30',
            image: '/pexels-yaroslav-shuraev-6281132.jpg',
            color: '#6366f1',
            urgent: false,
        },
        {
            id: 'pta-meeting',
            type: 'announcement',
            title: 'Parent-Teacher Association Meeting',
            description:
                'Our next PTA meeting is scheduled for Thursday, June 5, at 6:00 pm. Attendance is strongly encouraged for all parents and guardians.',
            date: 'June 5, 6:00pm',
            image: '/pexels-kampus-8629106.jpg',
            color: '#10b981',
            urgent: false,
        },
        {
            id: 'exam-venue-update',
            type: 'announcement',
            title: 'Exam Venue Change',
            description:
                'Due to ongoing facility renovations, Grade 10 and 11 exams will now take place in Room B201. Please adjust arrival plans accordingly.',
            date: 'Effective Immediately',
            image: '/pexels-rdne-8500421.jpg',
            color: '#ef4444',
            urgent: true,
        },
        {
            id: 'midterm-results',
            type: 'announcement',
            title: 'Midterm Results Published',
            description:
                'Midterm exam results are now available on the student and parent portal. For any concerns, contact the academic office.',
            date: 'May 10',
            image: '/pexels-cottonbro-6208926.jpg',
            color: '#6366f1',
            urgent: false,
        },
        {
            id: 'graduation-ceremony',
            type: 'event',
            title: 'Graduation Ceremony',
            description:
                'Celebrate our senior class! Ceremony will take place at the Main Hall, Saturday, June 15, at 4:00 pm. All are welcome.',
            date: 'June 15, 4:00pm',
            image: '/pexels-kampus-8629106.jpg',
            color: '#f59e0b',
            urgent: false,
        },
    ],

    // Visual Configuration
    styling: {
        backgroundColor: '#fefefe',
        titleGradient:
            'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #10b981 100%)',
        gridColumns: {
            mobile: 1,
            tablet: 2,
            desktop: 3,
        },
        aspectRatio: '4/3',
    },
};

export type EventsAnnouncementsSectionContent =
    typeof eventsAnnouncementsSectionContent;
