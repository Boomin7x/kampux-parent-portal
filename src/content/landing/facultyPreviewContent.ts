// Faculty Preview Content - Condensed version for landing page preview
export const facultyPreviewContent = {
    // Section Header
    overline: 'Meet Our Faculty',
    title: 'Inspiring Educators',
    subtitle:
        "World-class educators dedicated to nurturing minds and shaping tomorrow's leaders.",

    // Featured Faculty (Top 3)
    featuredFaculty: [
        {
            id: '1',
            name: 'Dr. Sarah Mitchell',
            title: 'Principal & Educational Leader',
            department: 'Administration',
            bio: 'Leading Excellence Academy with 25+ years of educational expertise, championing student-centered learning.',
            image: '/pexels-cottonbro-7395304.jpg',
        },
        {
            id: '2',
            name: 'Prof. Michael Chen',
            title: 'STEM Department Head',
            department: 'Science & Mathematics',
            bio: 'Inspiring the next generation of scientists through hands-on research and innovative STEM curricula.',
            image: '/pexels-matazumultimedia-32951018.jpg',
        },
        {
            id: '3',
            name: 'Ms. Elena Rodriguez',
            title: 'Arts & Literature Director',
            department: 'Humanities & Fine Arts',
            bio: 'Fostering creativity and critical thinking through integrated arts education that develops expression.',
            image: '/pexels-katerina-holmes-5905899.jpg',
        },
    ],

    // Faculty Stats
    stats: [
        { number: '85+', label: 'Expert\nEducators' },
        { number: '95%', label: 'Advanced\nDegrees' },
        { number: '12:1', label: 'Student\nRatio' },
        { number: '25+', label: 'Avg. Years\nExperience' },
    ],

    // CTA Configuration
    cta: {
        text: 'Meet All Faculty',
        route: '/faculty',
    },
};

export type FacultyPreviewContent = typeof facultyPreviewContent;
