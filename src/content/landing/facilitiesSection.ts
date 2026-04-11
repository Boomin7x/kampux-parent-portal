// Facilities Section Content
export const facilitiesSectionContent = {
    // Section Header
    overline: 'Campus Facilities',

    // Main Headlines
    title: {
        primary: 'World-Class',
        secondary: 'Environment', // This gets gradient styling
    },

    // Subtitle
    subtitle:
        'Modern infrastructure designed to inspire learning and support student success.',

    // Featured Facilities Data
    featuredFacilities: [
        {
            id: 'science-labs',
            title: 'Science Laboratories',
            description:
                'State-of-the-art laboratories equipped with cutting-edge technology for hands-on scientific exploration and research.',
            icon: 'Science', // Material-UI icon name
            color: '#10b981',
            capacity: '30 students per lab',
            image: '/pexels-cottonbro-6208926.jpg',
            features: [
                'Advanced Chemistry Lab',
                'Biology Research Center',
                'Physics Laboratory',
                'Digital Equipment',
            ],
            stats: [
                { label: 'Lab Stations', value: '120+' },
                { label: 'Research Projects', value: '45+' },
            ],
        },
        {
            id: 'library',
            title: 'Modern Library',
            description:
                'Comprehensive learning hub with extensive digital resources, collaborative spaces, and quiet study areas.',
            icon: 'LocalLibrary',
            color: '#16a34a',
            capacity: '150+ study spaces',
            image: '/pexels-yaroslav-shuraev-6281132.jpg',
            features: [
                'Digital Resources',
                'Private Study Rooms',
                'Collaborative Spaces',
                'Research Support',
            ],
            stats: [
                { label: 'Books & Resources', value: '25,000+' },
                { label: 'Digital Databases', value: '50+' },
            ],
        },
        {
            id: 'technology-center',
            title: 'Technology Center',
            description:
                'Cutting-edge computer labs and innovation spaces supporting coding, design, and emerging technologies.',
            icon: 'Computer',
            color: '#f59e0b',
            capacity: '40 workstations',
            image: '/pexels-dothanhyb-5530484.jpg',
            features: [
                'High-Performance Computers',
                'Software Development Labs',
                '3D Printing',
                'VR/AR Equipment',
            ],
            stats: [
                { label: 'Workstations', value: '120+' },
                { label: 'Software Licenses', value: '200+' },
            ],
        },
        {
            id: 'athletic-complex',
            title: 'Athletic Complex',
            description:
                'Multi-purpose sports facilities designed to promote physical fitness, teamwork, and competitive excellence.',
            icon: 'FitnessCenter',
            color: '#ef4444',
            capacity: '500+ spectators',
            image: '/pexels-boomheadshot-31785121.jpg',
            features: [
                'Full Basketball Courts',
                'Fitness Center',
                'Training Facilities',
                'Locker Rooms',
            ],
            stats: [
                { label: 'Sports Offered', value: '18+' },
                { label: 'Training Equipment', value: '150+' },
            ],
        },
        {
            id: 'dining-hall',
            title: 'Dining Hall',
            description:
                'Nutritious dining program featuring fresh, locally-sourced meals in a welcoming environment.',
            icon: 'Restaurant',
            color: '#f59e0b',
            capacity: '400+ seats',
            image: '/pexels-kampus-8629106.jpg',
            features: [
                'Fresh Daily Meals',
                'Healthy Options',
                'Allergy-Friendly Menu',
                'Local Sourcing',
            ],
            stats: [
                { label: 'Daily Meals', value: '1,200+' },
                { label: 'Menu Varieties', value: '50+' },
            ],
        },
        {
            id: 'campus-security',
            title: 'Campus Security',
            description:
                'Comprehensive safety and security systems ensuring a secure, nurturing learning environment.',
            icon: 'Security',
            color: '#dc2626',
            image: '/pexels-rdne-8500421.jpg',
            features: [
                '24/7 Monitoring',
                'Secure Access Control',
                'Emergency Response',
                'Safety Training',
            ],
            stats: [
                { label: 'Security Personnel', value: '12+' },
                { label: 'Camera Coverage', value: '100%' },
            ],
        },
    ],

    // Infrastructure Excellence Statistics
    stats: {
        title: 'Infrastructure Excellence',
        data: [
            {
                number: '15+',
                label: 'Specialized\nFacilities',
                description: 'Learning spaces',
            },
            {
                number: '50,000',
                label: 'Square Feet\nCampus',
                description: 'Modern infrastructure',
            },
            {
                number: '24/7',
                label: 'Campus\nSecurity',
                description: 'Safe environment',
            },
            {
                number: '100%',
                label: 'Technology\nIntegration',
                description: 'Digital learning',
            },
        ],
    },

    // Campus Tour CTA
    campusTour: {
        title: 'Experience Our Campus',
        description:
            'Schedule a personalized tour to see our world-class facilities and experience the Excellence Academy difference firsthand.',
        buttonText: 'Schedule Campus Tour',
        action: 'schedule-tour',
    },

    // Visual Configuration
    styling: {
        backgroundColor: '#f8fafc',
        titleGradient: 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)',
        statsColor: '#10b981',
        aspectRatio: '4/3', // For facility images
    },
};

export type FacilitiesSectionContent = typeof facilitiesSectionContent;
