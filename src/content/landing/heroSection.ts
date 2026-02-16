// Hero Section Content
export const heroSectionContent = {
    overline: 'Excellence Academy • Est. 1985',

    title: {
        primary: 'Shape',
        secondary: 'Tomorrow',
    },

    subtitle:
        "Where academic excellence meets character development, creating leaders for tomorrow's world.",

    buttons: {
        primary: {
            text: 'Access Parent Portal',
            action: 'navigate-to-auth',
        },
        secondary: {
            text: 'Discover More',
            action: 'scroll-to-about',
        },
    },

    stats: [
        { number: '98%', label: 'University Acceptance' },
        { number: '1:8', label: 'Student to Teacher' },
        { number: '45+', label: 'Programs & Activities' },
        { number: '25+', label: 'Years of Excellence' },
    ],

    backgroundImage: '/porter-raab-Ucr4Yp-t364-unsplash.jpg',

    scrollIndicator: {
        text: 'Scroll to explore',
        targetSection: 'about',
    },
};

export type IHeroSectionContent = typeof heroSectionContent;
