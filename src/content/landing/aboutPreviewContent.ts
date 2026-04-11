// About Preview Content - Condensed version for landing page preview
export const aboutPreviewContent = {
    // Section Header
    overline: 'A propos de Nous',
    title: 'Structurez votre Excellence',
    subtitle:
        'Donner aux élèves les moyens de réussir grâce à une éducation innovante et un mentorat dévoué.',

    // Mission Statement (Brief)
    mission:
        'L’Académie d’Excellence est dédiée à la fourniture d’une expérience éducative globale, exigeante et soutenante. Nous favorisons la pensée critique, la créativité et le développement de la caractère tout en maintenant les normes académiques les plus élevées.',

    // Core Values (Top 3)
    coreValues: [
        {
            id: 'academic-excellence',
            title: 'Academique',
            description:
                'Un enseignement rigoureux et innovant qui encourage chaque élève à donner le meilleur de lui-même.',
            icon: 'School',
            color: '#f59e0b',
        },
        {
            id: 'character-development',
            title: 'Développement du Caractère',
            description:
                'Développer l’intégrité, le leadership et la capacité à prendre des décisions éthiques, des compétences qui vont bien au-delà de la classe.',
            icon: 'EmojiPeople',
            color: '#16a34a',
        },
        {
            id: 'community',
            title: 'Collaboration et soutien communautaires',
            description:
                'Favoriser un environnement collaboratif où élèves, familles et enseignants travaillent ensemble.',
            icon: 'Groups',
            color: '#10b981',
        },
    ],

    // Quick Stats
    stats: [
        { number: '2005', label: 'Etablie' },
        { number: '200+', label: 'Elèves' },
        { number: '20+', label: 'Enseignants' },
        { number: '95%', label: 'Taux de Succès' },
    ],

    // CTA Configuration
    cta: {
        text: 'En savoir plus sur nous',
        route: '/about',
    },
};

export type AboutPreviewContent = typeof aboutPreviewContent;
