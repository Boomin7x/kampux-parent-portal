// Contact Section Content
export const contactSectionContent = {
    // Section Header
    overline: 'Nos Contacts',

    // Main Headlines
    title: {
        primary: 'Restez',
        secondary: 'Connectés avec Nous', // This gets gradient styling
    },

    // Subtitle
    subtitle:
        'Prêt à commencer votre parcours éducatif ? Nous sommes là pour vous accompagner à chaque étape.',

    // Contact Information
    contactInfo: [
        {
            id: 'phone',
            title: 'Appelez-nous',
            value: '(237) 6 77 42 12 52',
            description: 'Disponible pendant les heures de bureau',
            icon: 'Phone', // Material-UI icon name
            color: '#6366f1',
            action: 'tel:+15551234567',
        },
        {
            id: 'email',
            title: 'Envoyez-nous un Email',
            value: 'gsbleskamites@gmail.com,
            description: 'Inquiries générales & support',
            icon: 'Email',
            color: '#8b5cf6',
            action: 'mailto:info@excellenceacademy.edu',
        },
        {
            id: 'location',
            title: 'Passez nous voir',
            value: 'Yaoundé, Cameroun',
            description: 'SOA, lieu-dit  EBOGO',
            icon: 'LocationOn',
            color: '#10b981',
        },
        {
            id: 'hours',
            title: 'Horaires de Bureau',
            value: 'Lundi - Vendredi',
            description: '8h00  - 16h00 ',
            icon: 'Schedule',
            color: '#f59e0b',
        },
    ],

    // Action Items
    actions: {
        title: 'Agissez dès Maintenant',
        items: [
            {
                id: 'portal',
                category: 'Portail Parent',
                title: 'Accédez à votre tableau de bord',
                description:
                    'Suivez les progrès scolaires de votre enfant, consultez les devoirs, suivez l’assiduité et restez en contact avec les enseignants.',
                icon: 'School',
                color: '#6366f1',
                buttonText: 'Connectez-vous maintenant',
                action: 'navigate-to-auth',
            },
            {
                id: 'tour',
                category: 'Visite de l’Établissement',
                title: 'Planifiez votre Visite',
                description:
                    "Découvrez nos installations de classe mondiale et rencontrez notre équipe dédiée d'enseignants.",
                icon: 'TourOutlined',
                color: '#10b981',
                buttonText: 'Reservez dès maintenant',
                action: 'schedule-tour',
            },
        ],
    },

    // Background and Media
    backgroundImage: '/azzedine-rouichi-KDM09YR4_bY-unsplash.jpg',
    backgroundColor: '#1a1a1a',
};

export type ContactSectionContent = typeof contactSectionContent;
