// Contact Preview Content - Condensed version for landing page preview
export const contactPreviewContent = {
    // Section Header
    overline: 'Contactez Nous',
    title: 'Restez Connectés avec Nous',
    subtitle:
        'Prêt à commencer votre parcours éducatif ? Nous sommes là pour vous accompagner à chaque étape.',

    // Quick Contact Info (Top 4)
    quickContact: [
        {
            id: 'phone',
            title: 'Appelez-nous',
            value: '(237) 6 XX XX XX XX',
            description: 'Disponible pendant les heures de bureau',
            icon: 'Phone',
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

    // Primary Actions (Featured)
    primaryActions: [
        {
            id: 'portal',
            title: 'Accédez à votre tableau de bord',
            description:
                'Suivez les progrès scolaires de votre enfant, consultez les devoirs, suivez l’assiduité et restez en contact avec les enseignants.',
            icon: 'School',
            color: '#f59e0b',
            buttonText: 'Portail Parent',
            action: 'navigate-to-auth',
        },
        {
            id: 'tour',
            title: 'Planifiez votre Visite',
            description:
                "Découvrez nos installations de classe mondiale et rencontrez notre équipe dédiée d 'enseignants.",
            icon: 'TourOutlined',
            color: '#10b981',
            buttonText: 'Reservez dès maintenant',
            action: 'schedule-tour',
        },
    ],

    // CTA Configuration
    cta: {
        text: 'Contactez-nous',
        route: '/contact',
    },
};

export type ContactPreviewContent = typeof contactPreviewContent;
