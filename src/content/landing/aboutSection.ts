// About Section Content
export const aboutSectionContent = {
    // Section Header
    overline: 'About Excellence Academy',

    // Main Headlines
    title: {
        primary: 'Shaping',
        secondary: 'Excellence', // This gets gradient styling
    },

    // Subtitle
    subtitle:
        'Empowering students through innovative education and dedicated mentorship.',

    // Main Story Content
    story: {
        title: 'Our Story',
        content:
            'Excellence Academy is dedicated to providing a comprehensive, challenging, and supportive educational experience. We foster critical thinking, creativity, and character development while maintaining the highest academic standards.',
    },

    // Values/Driving Forces
    values: {
        title: 'What Drives Us',
        list: [
            'Academic Excellence & Innovation',
            'Character Development & Integrity',
            'Community Collaboration & Support',
            'Individual Growth & Achievement',
        ],
    },

    // Media Assets
    images: [
        {
            src: '/pexels-rdne-8500421.jpg',
            alt: 'Students in classroom learning',
            type: 'large', // Takes full width
        },
        {
            src: '/shraga-kopstein-eUa90rsmjIs-unsplash.jpg',
            alt: 'School building exterior',
            type: 'small', // Grid item
        },
        {
            src: '/joydeep-sensarma-utyOEK4GwDM-unsplash.jpg',
            alt: 'Students collaborating',
            type: 'small', // Grid item
        },
    ],

    // Quote/Testimonial
    quote: {
        text: "Excellence is not a skill, it's an attitude that shapes every moment of learning.",
        attribution: 'School Philosophy',
        year: 'Established 1985',
    },
};

export type AboutSectionContent = typeof aboutSectionContent;
