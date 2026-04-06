// About Section Content
export const aboutSectionContent = {
    // Section Header
    overline: 'A propos de Nous',

    // Main Headlines
    title: {
        primary: 'Structurez',
        secondary: "D' Excellence", // This gets gradient styling
    },

    // Subtitle
    subtitle:
        'Autonomiser les élèves grâce à une éducation innovante et un accompagnement personnalisé.',

    // Main Story Content
    story: {
        title: 'Notre Histoire',
        content:
            "L'Académie d'Excellence est dédiée à la fourniture d'une expérience éducative globale, exigeante et soutenante. Nous favorisons la pensée critique, la créativité et le développement de la caractère tout en maintenant les normes académiques les plus élevées.",
    },

    // Values/Driving Forces
    values: {
        title: 'Nos moteurs d’action',
        list: [
            'Excellence Academique & Innovation',
            'Développement & Integrité',
            'Collaboration et soutien communautaires',
            'Croissance et réussite individuelle',
        ],
    },

    // Media Assets
    images: [
        {
            src: '/pexels-rdne-8500421.jpg',
            alt: 'Apprentissage des élèves en classe',
            type: 'large', // Takes full width
        },
        {
            src: '/shraga-kopstein-eUa90rsmjIs-unsplash.jpg',
            alt: 'Exterieur du bâtiment scolaire',
            type: 'small', // Grid item
        },
        {
            src: '/joydeep-sensarma-utyOEK4GwDM-unsplash.jpg',
            alt: 'Élèves en collaboration',
            type: 'small', // Grid item
        },
    ],

    // Quote/Testimonial
    quote: {
        text: 'L’excellence n’est pas une compétence, c’est une attitude qui façonne chaque instant d’apprentissage.',
        attribution: 'Philosophie de l’école',
        year: 'Etablie en 2005',
    },
};

export type AboutSectionContent = typeof aboutSectionContent;
