// Gallery Section Content
export const gallerySectionContent = {
    // Section Header
    overline: 'Gallery',

    // Main Headlines
    title: {
        primary: 'Moments of',
        secondary: 'Excellence', // This gets gradient styling
    },

    // Subtitle
    subtitle:
        'Capturing the vibrant spirit of our school community through unforgettable moments and achievements.',

    // Category Configuration
    categories: [
        {
            id: 'all',
            label: 'All Moments',
            icon: 'Collections', // Material-UI icon name
            color: '#f59e0b',
        },
        {
            id: 'sports',
            label: 'Athletic Excellence',
            icon: 'Sports',
            color: '#ef4444',
        },
        {
            id: 'arts',
            label: 'Creative Arts',
            icon: 'Palette',
            color: '#ec4899',
        },
        {
            id: 'academics',
            label: 'Academic Achievement',
            icon: 'School',
            color: '#10b981',
        },
        {
            id: 'events',
            label: 'Special Events',
            icon: 'Celebration',
            color: '#f59e0b',
        },
        {
            id: 'campus',
            label: 'Campus Life',
            icon: 'LocationCity',
            color: '#16a34a',
        },
    ],

    // Gallery Items Data
    galleryItems: [
        {
            id: 'championship-victory',
            title: 'State Championship Victory',
            description:
                'Our basketball team celebrates their incredible state championship win after an undefeated season.',
            category: 'sports' as const,
            image: '/pexels-cics-uma-ipn-238541486-12238968.jpg',
            date: 'March 2024',
            tags: ['Basketball', 'Championship', 'Victory'],
            featured: true,
        },
        {
            id: 'science-fair',
            title: 'Annual Science Fair Excellence',
            description:
                'Students showcase their innovative research projects at our prestigious annual science fair.',
            category: 'academics' as const,
            image: '/pexels-cottonbro-6208926.jpg',
            date: 'February 2024',
            tags: ['Science', 'Research', 'Innovation'],
            featured: true,
        },
        {
            id: 'theater-production',
            title: 'Spring Musical Production',
            description:
                "A magical evening of theater featuring our talented students in this year's spring musical.",
            category: 'arts' as const,
            image: '/raymond-yeung-uwhDZbX-sz8-unsplash.jpg',
            date: 'April 2024',
            tags: ['Theater', 'Music', 'Performance'],
            featured: true,
        },
        {
            id: 'graduation-ceremony',
            title: 'Graduation Celebration',
            description:
                'Celebrating our graduating seniors as they embark on their next chapter of academic excellence.',
            category: 'events' as const,
            image: '/pexels-kampus-8629106.jpg',
            date: 'June 2024',
            tags: ['Graduation', 'Achievement', 'Success'],
        },
        {
            id: 'library-study',
            title: 'Modern Learning Spaces',
            description:
                'Students collaborating in our state-of-the-art library with cutting-edge technology.',
            category: 'campus' as const,
            image: '/pexels-yaroslav-shuraev-6281132.jpg',
            date: 'January 2024',
            tags: ['Library', 'Study', 'Collaboration'],
        },
        {
            id: 'tech-innovation',
            title: 'Technology Lab Innovation',
            description:
                'Students working on advanced robotics and coding projects in our innovation lab.',
            category: 'academics' as const,
            image: '/pexels-dothanhyb-5530484.jpg',
            date: 'March 2024',
            tags: ['Technology', 'Robotics', 'Innovation'],
        },
        {
            id: 'athletic-training',
            title: 'Athletic Training Excellence',
            description:
                'Our dedicated athletes training in world-class facilities to achieve their personal best.',
            category: 'sports' as const,
            image: '/pexels-boomheadshot-31785121.jpg',
            date: 'February 2024',
            tags: ['Training', 'Fitness', 'Excellence'],
        },
        {
            id: 'campus-security',
            title: 'Safe Learning Environment',
            description:
                'Our comprehensive security measures ensure a safe and nurturing learning environment.',
            category: 'campus' as const,
            image: '/pexels-rdne-8500421.jpg',
            date: 'Ongoing',
            tags: ['Safety', 'Security', 'Environment'],
        },
        {
            id: 'leadership-conference',
            title: 'Student Leadership Summit',
            description:
                'Student leaders gathering to discuss initiatives and drive positive change in our school community.',
            category: 'events' as const,
            image: '/azzedine-rouichi-KDM09YR4_bY-unsplash.jpg',
            date: 'May 2024',
            tags: ['Leadership', 'Community', 'Initiative'],
        },
        {
            id: 'stem-competition',
            title: 'STEM Competition Victory',
            description:
                'Our STEM team celebrating their victory at the regional science and engineering competition.',
            category: 'academics' as const,
            image: '/patrick-amoy-6DfEbkqsTiA-unsplash.jpg',
            date: 'April 2024',
            tags: ['STEM', 'Competition', 'Engineering'],
        },
    ],

    // Gallery Statistics
    stats: {
        data: [
            { number: '500+', label: 'Memorable\nMoments' },
            { number: '12', label: 'Monthly\nEvents' },
            { number: '100%', label: 'Student\nEngagement' },
            { number: '50+', label: 'Awards &\nRecognitions' },
        ],
    },

    // Visual Configuration
    styling: {
        backgroundColor: '#f8fafc',
        titleGradient:
            'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #10b981 100%)',
        statsGradient: 'linear-gradient(135deg, #f59e0b, #10b981)',
        lightboxBackground: 'rgba(0, 0, 0, 0.9)',
    },

    // Lightbox Configuration
    lightbox: {
        navigation: {
            prevIcon: 'ArrowBackIos',
            nextIcon: 'ArrowForwardIos',
            closeIcon: 'Close',
        },
    },
};

// Type definitions

export type GallerySectionContent = typeof gallerySectionContent;
