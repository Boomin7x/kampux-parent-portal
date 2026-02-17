// Contact Section Content
export const contactSectionContent = {
    // Section Header
    overline: 'Contact Excellence Academy',

    // Main Headlines
    title: {
        primary: 'Connect',
        secondary: 'With Us', // This gets gradient styling
    },

    // Subtitle
    subtitle:
        "Ready to begin your educational journey? We're here to guide you every step of the way.",

    // Contact Information
    contactInfo: [
        {
            id: 'phone',
            title: 'Call Us',
            value: '(555) 123-4567',
            description: 'Available during office hours',
            icon: 'Phone', // Material-UI icon name
            color: '#6366f1',
            action: 'tel:+15551234567',
        },
        {
            id: 'email',
            title: 'Email Us',
            value: 'info@excellenceacademy.edu',
            description: 'General inquiries & support',
            icon: 'Email',
            color: '#8b5cf6',
            action: 'mailto:info@excellenceacademy.edu',
        },
        {
            id: 'location',
            title: 'Visit Us',
            value: '123 Education Boulevard',
            description: 'Learning City, LC 12345',
            icon: 'LocationOn',
            color: '#10b981',
        },
        {
            id: 'hours',
            title: 'Office Hours',
            value: 'Monday - Friday',
            description: '8:00 AM - 4:00 PM',
            icon: 'Schedule',
            color: '#f59e0b',
        },
    ],

    // Action Items
    actions: {
        title: 'Take Action',
        items: [
            {
                id: 'portal',
                category: 'Parent Portal',
                title: 'Access Your Dashboard',
                description:
                    "Monitor your child's academic progress, view assignments, track attendance, and stay connected with educators.",
                icon: 'School',
                color: '#6366f1',
                buttonText: 'Sign In Now',
                action: 'navigate-to-auth',
            },
            {
                id: 'tour',
                category: 'Campus Tour',
                title: 'Schedule Your Visit',
                description:
                    'Experience our world-class facilities and meet our dedicated team of educators.',
                icon: 'TourOutlined',
                color: '#10b981',
                buttonText: 'Book Now',
                action: 'schedule-tour',
            },
        ],
    },

    // Background and Media
    backgroundImage: '/azzedine-rouichi-KDM09YR4_bY-unsplash.jpg',
    backgroundColor: '#1a1a1a',
};

export type ContactSectionContent = typeof contactSectionContent;
