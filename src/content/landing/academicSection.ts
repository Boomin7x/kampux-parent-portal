// Academic Section Content
export const academicSectionContent = {
    // Section Header
    overline: 'Programmes Académiques',

    // Main Headlines
    title: {
        primary: "L ' Excellence",
        secondary: 'A', // This gets gradient styling
        tertiary: 'Tous les Niveaux',
    },

    // Subtitle
    subtitle:
        'Des programmes complets conçus pour défier, inspirer et préparer les élèves à un succès durable.',

    // Academic Programs Data
    programs: [
        {
            id: 'elementary',
            title: 'Primaire',
            level: 'Petite Section-CM2',
            description:
                'Bâtir de solides bases grâce à un apprentissage pratique, à la créativité et au développement du caractère dans notre environnement primaire bienveillant.',
            icon: 'School', // Material-UI icon name
            color: '#6366f1',
            backgroundImage: '/pexels-rdne-8500421.jpg',
            features: [
                'Classes réduites',
                'Apprentissage STEAM',
                'Character BuiApprentissage STEAM',
                'Arts créatifs',
            ],
            stats: [
                { label: 'Taille de Classe', value: '12:4' },
                { label: 'Programmes', value: '+5' },
            ],
        },
        {
            id: 'high',
            title: 'Collège',
            level: '6ème-3ème',
            description:
                "Préparation complète pour l'education supérieure avec des cours AP, une orientation universitaire et des opportunités d'application du monde réel.",
            icon: 'School',
            color: '#ec4899',
            backgroundImage: '/joydeep-sensarma-utyOEK4GwDM-unsplash.jpg',
            features: [
                'Cours AP',
                'Préparation universitaire',
                'Orientations Professionnelles',
                'Stages',
            ],
            stats: [
                { label: 'Préparation universitaire', value: '100%' },
                { label: 'Bourses d’études', value: '250 000 FCFA' },
            ],
        },
        {
            id: 'stem',
            title: 'Innovation STEM',
            level: 'Tous niveaux',
            description:
                'Programmes de pointe en sciences, technologie, ingénierie et mathématiques, avec des laboratoires ultramodernes et des opportunités de recherche.
            icon: 'Science',
            color: '#10b981',
            backgroundImage: '/azzedine-rouichi-KDM09YR4_bY-unsplash.jpg',
            features: [
                'Laboratoires de Recherche',
                'Robotique',
                'Programmation',
                'Innovation'
            ],
            stats: [
                { label: 'Competitions', value: '+10' },
                { label: 'Prix', value: '+5' },
            ],
        },
        {
            id: 'arts',
            title: 'Expression Créative',
            level: 'Tous niveaux',
            description:
                'Programme complet en arts favorisant la créativité à travers les arts visuels, la musique, le théâtre et les médias numériques dans des espaces dédiés.',
            icon: 'Palette',
            color: '#f59e0b',
            backgroundImage: '/pexels-mary-taylor-5896578.jpg',
            features: [
                'Arts Visuels',
                'Musique',
                'Théâtre',
                'Médias Numériques'
            ],
            stats: [
                { label: 'Expositions', value: '+2' },
                { label: 'Représentations', value: '+6' },
            ],
        },
        {
            id: 'athletics',
            title: 'Excellence Athlétique',
            level: 'Tous niveaux',
            description:
                'Programme complet d’athlétisme favorisant la forme physique, le travail d’équipe et l’excellence compétitive, avec un encadrement et des installations de niveau championnat.
            icon: 'Sports',
            color: '#ef4444',
            backgroundImage: '/pexels-rdne-8500421.jpg',
            features: [
                'Sports d’équipe',
                'Fitness',
                'Championnats',
                'Gymnastyque',
            ],
            stats: [
                { label: 'Sports', value: '+10' },
                { label: 'Championnats', value: '+10' },
            ],
        },
    ],

    // Swiper Configuration
    swiperConfig: {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 1000,
        loop: true,
    },
};

export type AcademicSectionContent = typeof academicSectionContent;
