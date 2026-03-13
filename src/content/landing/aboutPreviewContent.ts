// About Preview Content - Condensed version for landing page preview
export const aboutPreviewContent = {
    // Section Header
    overline: 'About Excellence Academy',
    title: 'Shaping Excellence',
    subtitle:
        'Empowering students through innovative education and dedicated mentorship.',

    // Mission Statement (Brief)
    mission:
        'Excellence Academy is dedicated to providing a comprehensive, challenging, and supportive educational experience. We foster critical thinking, creativity, and character development while maintaining the highest academic standards.',

    // Core Values (Top 3)
    coreValues: [
        {
            id: 'academic-excellence',
            title: 'Academic Excellence',
            description:
                'Rigorous curriculum and innovative teaching methods that challenge students to reach their full potential.',
            icon: 'School',
            color: '#6366f1',
        },
        {
            id: 'character-development',
            title: 'Character Development',
            description:
                'Building integrity, leadership, and ethical decision-making skills that extend beyond the classroom.',
            icon: 'EmojiPeople',
            color: '#8b5cf6',
        },
        {
            id: 'community',
            title: 'Community & Support',
            description:
                'Fostering a collaborative environment where students, families, and educators work together.',
            icon: 'Groups',
            color: '#10b981',
        },
    ],

    // Quick Stats
    stats: [
        { number: '1985', label: 'Established' },
        { number: '1,200+', label: 'Students' },
        { number: '85+', label: 'Educators' },
        { number: '95%', label: 'College Acceptance' },
    ],

    // CTA Configuration
    cta: {
        text: 'Learn More About Us',
        route: '/about',
    },
};

export type AboutPreviewContent = typeof aboutPreviewContent;
