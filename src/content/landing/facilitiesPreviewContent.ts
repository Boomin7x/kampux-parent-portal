// Facilities Preview Content - Condensed version for landing page preview
export const facilitiesPreviewContent = {
    // Section Header
    overline: 'Campus Facilities',
    title: 'World-Class Environment',
    subtitle:
        'Modern infrastructure designed to inspire learning and support student success.',

    // Key Facilities (Top 4)
    keyFacilities: [
        {
            id: 'science-labs',
            title: 'Science Laboratories',
            description:
                'State-of-the-art laboratories equipped with cutting-edge technology for hands-on scientific exploration.',
            icon: 'Science',
            color: '#10b981',
            capacity: '30 students per lab',
        },
        {
            id: 'library',
            title: 'Modern Library',
            description:
                'Comprehensive learning hub with extensive digital resources, collaborative spaces, and quiet study areas.',
            icon: 'LocalLibrary',
            color: '#8b5cf6',
            capacity: '150+ study spaces',
        },
        {
            id: 'technology-center',
            title: 'Technology Center',
            description:
                'Cutting-edge computer labs and innovation spaces supporting coding, design, and emerging technologies.',
            icon: 'Computer',
            color: '#6366f1',
            capacity: '40 workstations',
        },
        {
            id: 'athletic-complex',
            title: 'Athletic Complex',
            description:
                'Multi-purpose sports facilities designed to promote physical fitness, teamwork, and competitive excellence.',
            icon: 'FitnessCenter',
            color: '#ef4444',
            capacity: '500+ spectators',
        },
    ],

    // Infrastructure Stats
    stats: [
        { number: '15+', label: 'Specialized\nFacilities' },
        { number: '50,000', label: 'Square Feet\nCampus' },
        { number: '24/7', label: 'Campus\nSecurity' },
        { number: '100%', label: 'Technology\nIntegration' },
    ],

    // CTA Configuration
    cta: {
        text: 'Tour Our Campus',
        route: '/facilities',
    },
};

export type FacilitiesPreviewContent = typeof facilitiesPreviewContent;
