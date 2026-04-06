// Academic Section Content
export const academicSectionContent = {
    // Section Header
    overline: 'Programmes Académiques',

    // Main Headlines
    title: {
        primary: 'L \' Excellence',
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
            title: 'College',
            level: '6ème-Terminale',
            description:
                "Préparation complète pour l'education supérieure avec des cours AP, une orientation universitaire et des opportunités d'application du monde réel.",
            icon: 'School',
            color: '#ec4899',
            backgroundImage: '/joydeep-sensarma-utyOEK4GwDM-unsplash.jpg',
            features: [
                'AP Courses',
                'College Prep',
                'Career Guidance',
                'Internships',
            ],
            stats: [
                { label: 'College Accept', value: '100%' },
                { label: 'Scholarships', value: '$2.4M' },
            ],
        },
        {
            id: 'stem',
            title: 'STEM Innovation',
            level: 'All Grades',
            description:
                'Cutting-edge Science, Technology, Engineering, and Mathematics programs with state-of-the-art labs and research opportunities.',
            icon: 'Science',
            color: '#10b981',
            backgroundImage: '/azzedine-rouichi-KDM09YR4_bY-unsplash.jpg',
            features: ['Research Labs', 'Robotics', 'Coding', 'Innovation'],
            stats: [
                { label: 'Competitions', value: '12+' },
                { label: 'Awards', value: '45+' },
            ],
        },
        {
            id: 'arts',
            title: 'Creative Expression',
            level: 'All Grades',
            description:
                'Comprehensive arts education fostering creativity through visual arts, music, theater, and digital media in dedicated studio spaces.',
            icon: 'Palette',
            color: '#f59e0b',
            backgroundImage: '/pexels-mary-taylor-5896578.jpg',
            features: ['Visual Arts', 'Music', 'Theater', 'Digital Media'],
            stats: [
                { label: 'Exhibitions', value: '6+' },
                { label: 'Performances', value: '20+' },
            ],
        },
        {
            id: 'athletics',
            title: 'Athletic Excellence',
            level: 'All Grades',
            description:
                'Comprehensive athletics promoting fitness, teamwork, and competitive excellence with championship-level coaching and facilities.',
            icon: 'Sports',
            color: '#ef4444',
            backgroundImage: '/pexels-rdne-8500421.jpg',
            features: [
                'Team Sports',
                'Fitness',
                'Championships',
                'Scholarships',
            ],
            stats: [
                { label: 'Sports', value: '18+' },
                { label: 'Championships', value: '32+' },
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
