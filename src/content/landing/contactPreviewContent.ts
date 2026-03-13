// Contact Preview Content - Condensed version for landing page preview
export const contactPreviewContent = {
    // Section Header
    overline: 'Contact Excellence Academy',
    title: 'Connect With Us',
    subtitle:
        "Ready to begin your educational journey? We're here to guide you every step of the way.",

    // Quick Contact Info (Top 4)
    quickContact: [
        {
            id: 'phone',
            title: 'Call Us',
            value: '(555) 123-4567',
            description: 'Available during office hours',
            icon: 'Phone',
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

    // Primary Actions (Featured)
    primaryActions: [
        {
            id: 'portal',
            title: 'Access Your Dashboard',
            description:
                "Monitor your child's academic progress, view assignments, and stay connected.",
            icon: 'School',
            color: '#6366f1',
            buttonText: 'Parent Portal',
            action: 'navigate-to-auth',
        },
        {
            id: 'tour',
            title: 'Schedule Your Visit',
            description:
                'Experience our world-class facilities and meet our dedicated team.',
            icon: 'TourOutlined',
            color: '#10b981',
            buttonText: 'Book Tour',
            action: 'schedule-tour',
        },
    ],

    // CTA Configuration
    cta: {
        text: 'Get in Touch',
        route: '/contact',
    },
};

export type ContactPreviewContent = typeof contactPreviewContent;
