// Academic Preview Content - Condensed version for landing page preview
export const academicPreviewContent = {
    // Section Header
    overline: 'Academic Programs',
    title: 'Excellence Across Every Level',
    subtitle:
        'Comprehensive programs designed to challenge, inspire, and prepare students for lifelong success.',

    // Featured Programs (Top 4)
    programs: [
        {
            id: 'elementary',
            title: 'Elementary Excellence',
            level: 'Grades K-5',
            description:
                'Building strong foundations through hands-on learning, creativity, and character development.',
            icon: 'School',
            color: '#6366f1',
            stats: [
                { label: 'Class Size', value: '12:1' },
                { label: 'Programs', value: '8+' },
            ],
        },
        {
            id: 'middle',
            title: 'Middle School Growth',
            level: 'Grades 6-8',
            description:
                'Developing critical thinking and leadership skills with personalized attention and advanced curricula.',
            icon: 'MenuBook',
            color: '#8b5cf6',
            stats: [
                { label: 'Honor Students', value: '85%' },
                { label: 'Clubs', value: '15+' },
            ],
        },
        {
            id: 'high',
            title: 'College Preparatory',
            level: 'Grades 9-12',
            description:
                'Comprehensive preparation for higher education with AP courses, college counseling, and real-world opportunities.',
            icon: 'School',
            color: '#ec4899',
            stats: [
                { label: 'College Accept', value: '100%' },
                { label: 'Scholarships', value: '$2.4M' },
            ],
        },
        {
            id: 'stem',
            title: 'STEM Innovation',
            level: 'All Grades',
            description:
                'Cutting-edge Science, Technology, Engineering, and Mathematics programs with state-of-the-art labs.',
            icon: 'Science',
            color: '#10b981',
            stats: [
                { label: 'Competitions', value: '12+' },
                { label: 'Awards', value: '45+' },
            ],
        },
    ],

    // Overall Academic Stats
    overallStats: [
        { number: '100%', label: 'College Acceptance' },
        { number: '$2.4M', label: 'Scholarships' },
        { number: '18+', label: 'AP Courses' },
        { number: '95%', label: 'Advanced Degrees' },
    ],

    // CTA Configuration
    cta: {
        text: 'Explore All Programs',
        route: '/academics',
    },
};

export type AcademicPreviewContent = typeof academicPreviewContent;
