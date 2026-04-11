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
            value: '(237) 6 XX XX XX XX',
            description: 'Disponible pendant les heures de bureau',
            icon: 'Phone', // Material-UI icon name
            color: '#f59e0b',
            action: 'tel:+15551234567',
        },
        {
            id: 'email',
            title: 'Envoyez-nous un Email',
            value: 'info@excellenceacademy.edu',
            description: 'Inquiries générales & support',
            icon: 'Email',
            color: '#16a34a',
            action: 'mailto:info@excellenceacademy.edu',
        },
        {
            id: 'location',
            title: 'Passez nous voir',
            value: 'Yaoundé, Cameroun',
            description: 'Learning City, LC 12345',
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
                color: '#f59e0b',
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
