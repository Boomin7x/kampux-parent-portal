// Hero Section Content
export const heroSectionContent = {
    overline: 'Excellence Academy • Est. 1985',

    title: {
        primary: 'Structurez',
        secondary: 'Demain',
    },

    subtitle:
        'Là où l’excellence académique rencontre le développement du caractère, pour former les leaders de demain.',

    buttons: {
        primary: {
            text: 'Accès au portail parent',
            action: 'naviguer-au-portal',
        },
        secondary: {
            text: 'Découvrir plus',
            action: 'scrollez-vers-à propos',
        },
    },

    stats: [
        { number: '95%', label: 'Taux de Succès' },
        { number: '1:8', label: 'Elèves à Enseignants' },
        { number: '15+', label: 'Programmes & Activités' },
        { number: '10+', label: 'Années d Existance' },
    ],

    backgroundImage: '/porter-raab-Ucr4Yp-t364-unsplash.jpg',

    scrollIndicator: {
        text: 'Scrollez pour explorer',
        targetSection: 'A propos',
    },
};

export type IHeroSectionContent = typeof heroSectionContent;
