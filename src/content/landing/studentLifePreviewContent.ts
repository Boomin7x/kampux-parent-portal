// Student Life Preview Content - Condensed version for landing page preview
export const studentLifePreviewContent = {
    // Section Header
    overline: 'Student Life',
    title: 'Beyond the Classroom',
    subtitle:
        'Rich extracurricular programs that develop character, creativity, and leadership for life.',

    // Featured Activities (Top 4)
    featuredActivities: [
        {
            id: 'athletics',
            title: 'Athletic Excellence',
            description:
                'Competitive sports programs that build character and develop teamwork while fostering physical wellness.',
            icon: 'Sports',
            color: '#ef4444',
            participants: '400+ Students',
        },
        {
            id: 'creative-arts',
            title: 'Creative Arts',
            description:
                'Comprehensive arts programs including theater, music, and visual arts that nurture creative expression.',
            icon: 'Palette',
            color: '#ec4899',
            participants: '350+ Students',
        },
        {
            id: 'stem-innovation',
            title: 'STEM Innovation',
            description:
                "Cutting-edge science, technology, and robotics programs that prepare students for tomorrow's challenges.",
            icon: 'Science',
            color: '#10b981',
            participants: '280+ Students',
        },
        {
            id: 'leadership',
            title: 'Leadership Development',
            description:
                'Student government, debate teams, and community service programs that cultivate the next generation of leaders.',
            icon: 'Groups',
            color: '#6366f1',
            participants: '200+ Students',
        },
    ],

    // Engagement Stats
    stats: [
        { number: '45+', label: 'Clubs &\nActivities' },
        { number: '1,200+', label: 'Active\nParticipants' },
        { number: '95%', label: 'Student\nParticipation' },
        { number: '150+', label: 'Annual\nEvents' },
    ],

    // CTA Configuration
    cta: {
        text: 'Explore Student Life',
        route: '/student-life',
    },
};

export type StudentLifePreviewContent = typeof studentLifePreviewContent;
