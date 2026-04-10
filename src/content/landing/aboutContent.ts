import type { AboutContent } from '../../pages/Landing/_models/AboutContent.types';

/**
 * Comprehensive content for the About page
 * Includes mission, vision, core values, leadership team, history timeline, and achievements
 */

export const aboutContent: AboutContent = {
    mission:
        'GBS Les Kamites, nous nous engageons à former des apprenants curieux, confiants et bienveillants, prêts à s’épanouir dans un monde en constante évolution. Grâce à des méthodes d’enseignement innovantes, des expériences d’apprentissage personnalisées et une communauté solidaire, nous donnons aux élèves les moyens de découvrir leurs forces et leurs passions uniques.Notre mission est de former des esprits critiques, des résolveurs de problèmes créatifs et des citoyens du monde responsables, capables d’apporter des contributions significatives à la société. Nous croyons que chaque élève mérite une éducation qui respecte son individualité tout en le préparant à l’excellence académique et à une réussite durable.En favorisant une culture de respect, d’intégrité et de collaboration, nous créons un environnement où les élèves peuvent explorer, grandir et atteindre leur plein potentiel.',

    vision: 'Notre vision est d’être une institution éducative de référence, reconnue pour transformer des vies grâce à l’excellence de son enseignement, au développement du caractère et à l’innovation. Nous aspirons à créer une communauté d’apprentissage où chaque élève est inspiré à poursuivre ses rêves avec confiance et détermination. Nous nous efforçons de préparer nos élèves à devenir des leaders éclairés, des penseurs critiques et des citoyens engagés qui contribueront positivement à un monde en évolution rapide. En intégrant les dernières avancées pédagogiques et technologiques, nous visons à offrir une éducation qui non seulement répond aux besoins d’aujourd’hui, mais anticipe également les défis de demain. Notre engagement envers l’excellence, la diversité et l’inclusion nous guide dans notre mission de façonner l’avenir de l’éducation.',

    coreValues: [
        {
            id: 'excellence',
            title: "Etablissement d' Excellence",
            description:
                'Nous maintenons les normes les plus élevées en matière d’enseignement et d’apprentissage, en encourageant les élèves à dépasser leurs limites perçues et à atteindre la réussite académique..',
            icon: 'EmojiEvents',
        },
        {
            id: 'integrity',
            title: 'Integrité',
            description:
                'Nous favorisons l’honnêteté, le comportement éthique et le caractère moral fort dans tous les aspects de la vie scolaire, préparant les élèves à prendre des décisions fondées sur des principes.',
            icon: 'Verified',
        },
        {
            id: 'innovation',
            title: 'Innovation',
            description:
                'Nous valorisons la pensée créative et encourageons les élèves à explorer de nouvelles idées, technologies et approches pour résoudre les problèmes.',
            icon: 'Lightbulb',
        },
        {
            id: 'community',
            title: 'Communauté',
            description:
                'Nous construisons des relations solides entre les élèves, les familles et le personnel, créant un environnement de soutien où chacun se sent valorisé et connecté.',
            icon: 'People',
        },
        {
            id: 'diversity',
            title: 'Diversité et inclusion',
            description:
                'Nous célébrons les contextes divers, les perspectives et les expériences, en veillant à ce que chaque élève se sente bienvenu et capable de contribuer.',
            icon: 'PublicOutlined',
        },
        {
            id: 'growth',
            title: 'Développement Continu',
            description:
                'Nous promouvons l’apprentissage tout au long de la vie et le développement personnel, encourageant les élèves et le personnel à s’améliorer continuellement et à s’adapter.',
            icon: 'TrendingUp',
        },
        {
            id: 'responsibility',
            title: 'Responsabilité Sociale',
            description:
                'Nous inspirons les élèves à devenir des citoyens actifs et engagés qui contribuent positivement à leurs communautés et à la société mondiale.',
            icon: 'VolunteerActivism',
        },
        {
            id: 'wellness',
            title: 'Bien-être global',
            description:
                'Nous privilégions le bien-être physique, émotionnel et mental de nos élèves, en offrant des ressources et un accompagnement pour un développement équilibré.',
            icon: 'FavoriteBorder',
        },
    ],

    leadership: [
        {
            id: 'principal',
            name: 'Dr. Margaret Chen',
            role: 'Principal',
            bio: 'Le Dr Margaret Chen apporte plus de 25 ans d’expérience en leadership éducatif à GBS Les Kamites. Titulaire d’un doctorat en administration de l’éducation de l’Université de Stanford et d’un master en développement de curriculum, elle a consacré sa carrière à transformer les modèles éducatifs traditionnels. Avant de rejoindre Kampux, le Dr Chen a été surintendante adjointe pour le curriculum et l’enseignement dans un grand district métropolitain, où elle a mis en œuvre des programmes STEM innovants ayant augmenté la réussite des élèves de 35 %. Sa vision d’un apprentissage centré sur l’élève et son engagement envers l’équité éducative lui ont valu de nombreuses distinctions, dont le prix du Directeur National Distingué.',
            photoUrl: '/images/leadership/margaret-chen.jpg',
            email: 'm.chen@kampux.edu',
            qualifications: [
                'Doctorat en administration de l’éducation (Ed.D.), Université de Stanford',
                'Master en développement de curriculum (M.A.), Université Columbia',
                'Prix du Directeur National Distingué',
            ],
        },
        {
            id: 'academic-director',
            name: 'Dr. James Richardson',
            role: 'Directeur académique',
            bio: 'Le Dr James Richardson supervise l’ensemble des programmes académiques de GBS Les Kamites, en veillant à la rigueur des curricula et à l’innovation des méthodes pédagogiques. Titulaire d’un doctorat en psychologie de l’éducation de l’Université Harvard et fort de 20 ans d’expérience en conception de programmes, il a été un pionnier de l’apprentissage par projets, engageant les élèves dans la résolution de problèmes concrets.Avant de rejoindre Kampux, le Dr Richardson a occupé le poste de doyen des études dans une prestigieuse école indépendante, où il a dirigé le développement de programmes interdisciplinaires intégrant la technologie dans toutes les matières. Ses recherches sur l’engagement des élèves et la pédagogie différenciée ont été publiées dans des revues éducatives de référence.',
            photoUrl: '/images/leadership/james-richardson.jpg',
            email: 'j.richardson@kampux.edu',
            qualifications: [
                'Ph.D. in Educational Psychology, Harvard University',
                'M.Ed. in Curriculum and Instruction, UCLA',
                'Published researcher in educational innovation',
            ],
        },
        {
            id: 'student-life-director',
            name: 'Maria Santos',
            role: 'Director of Student Life',
            bio: "Maria Santos is passionate about creating a vibrant, inclusive community where every student feels valued and supported. With a master's degree in School Counseling and 15 years of experience in student affairs, she oversees all co-curricular activities, clubs, and student wellness programs. Maria has developed comprehensive support systems that address students' social-emotional needs while fostering leadership development. Her innovative peer mentoring program has been recognized as a model for building strong school communities. Maria's commitment to student voice and agency ensures that our school culture reflects the values and needs of our diverse student body.",
            photoUrl: '/images/leadership/maria-santos.jpg',
            email: 'm.santos@kampux.edu',
            qualifications: [
                'Doctorat en psychologie de l’éducation (Ph.D.), Université Harvard',
                'Licensed Professional Counselor',
                'Certified in Restorative Justice Practices',
            ],
        },
        {
            id: 'operations-director',
            name: 'Robert Kim',
            role: 'Director of Operations',
            bio: "Robert Kim brings strategic vision and operational excellence to Kampux Academy's administrative functions. With an MBA in Organizational Management and 18 years of experience in educational operations, he ensures that our facilities, technology infrastructure, and business operations support our academic mission. Robert previously managed operations for a multi-campus educational organization, implementing sustainable practices that reduced costs by 20% while improving service quality. His expertise in strategic planning and resource management enables Kampux to invest in cutting-edge educational resources while maintaining financial stability.",
            photoUrl: '/images/leadership/robert-kim.jpg',
            email: 'r.kim@kampux.edu',
            qualifications: [
                'MBA in Organizational Management, Northwestern University',
                'Master en curriculum et pédagogie (M.Ed.), UCLA',
                'Chercheur publié en innovation éducative',
            ],
        },
        {
            id: 'admissions-director',
            name: 'Dr. Emily Patel',
            role: 'Directrice des admissions et des inscriptions',
            bio: 'Le Dr Emily Patel dirige notre processus d’admission avec pour objectif d’identifier les élèves qui s’épanouiront dans l’environnement d’apprentissage dynamique de lss Kamites. Titulaire d’un doctorat en administration de l’enseignement supérieur et forte de 12 ans d’expérience en gestion des inscriptions, elle a développé des pratiques d’admission holistiques qui vont au-delà des résultats aux tests pour valoriser les talents et le potentiel de chaque élève.Son approche met l’accent sur l’adéquation entre les besoins des élèves et les offres de l’établissement, ce qui se traduit par un taux élevé de rétention et de satisfaction. Le Dr Patel travaille en étroite collaboration avec les familles tout au long du processus d’admission, garantissant une expérience accueillante et transparente..',
            photoUrl: '/images/leadership/emily-patel.jpg',
            email: 'e.patel@kampux.edu',
            qualifications: [
                'Doctorat en administration de l’enseignement supérieur (Ed.D.), USC',
                'Master en affaires étudiantes (M.A.), NYU',
                'Membre de l’Association nationale de conseil en admission universitaire (NACAC)',
            ],
        },
        {
            id: 'technology-director',
            name: 'David Okonkwo',
            role: 'Directeur de la technologie éducative',
            bio: 'David Okonkwo dirige l’intégration des technologies dans l’enseignement et l’apprentissage à Kampux Academy. Titulaire d’un master en technologie éducative et fort de 14 ans d’expérience en tant qu’enseignant et spécialiste en technologie, il fait le lien entre pédagogie et innovation.David a mis en place des plateformes d’apprentissage numérique complètes, des programmes de codage et des espaces de création (maker spaces) qui préparent les élèves aux exigences du XXIᵉ siècle. Ses programmes de formation professionnelle aident les enseignants à exploiter la technologie pour renforcer l’engagement des élèves et personnaliser l’enseignement. Sa vision garantit que la technologie reste un outil au service d’un apprentissage approfondi, sans remplacer les interactions humaines essentielles.',
            photoUrl: '/images/leadership/david-okonkwo.jpg',
            email: 'd.okonkwo@kampux.edu',
            qualifications: [
                'Master en technologie éducative (M.Ed.), MIT',
                'Bachelor en sciences informatiques (B.S.), Georgia Tech',
                'Educator certifié par Google niveau 2',
            ],
        },
    ],

    history: [
        {
            year: '2019',
            title: 'Cycle Primaire et Maternel',
            description:
                "L'école a commencé ses activités quelques années avant le secondaire, affichant déjà des résultats complets (100% de réussite) dès la session 2020.",
        },
        {
            year: '2021',
            title: 'Cycle Secondaire (Collège)',
            description:
                'Le collège a été officiellement lancé pour l'année scolaire 2021-2022, répondant à la demande des parents pour assurer la continuité des élèves du primaire. Les premières promotions du collège ont maintenu un taux de réussite de 100%, renforçant la réputation d’excellence de l’école.',
        },
        {
            year: '2024',
            title: 'Innovation dans l’apprentissage numérique',
            description:
                'Lorsque la pandémie mondiale a remis en question les modèles éducatifs traditionnels, Kampux a assuré une transition fluide vers un environnement d’apprentissage hybride. Nos investissements dans l’infrastructure technologique et la formation des enseignants ont garanti la continuité de l’éducation et démontré notre capacité d’adaptation et notre résilience.',
        },
        {
            year: '2026',
            title: 'Initiative de campus durable',
            description:
                'GBS Les Karmites a réalisé une importante rénovation du campus en intégrant des panneaux solaires, des systèmes de récupération des eaux de pluie et des bâtiments certifiés LEED. Notre programme de durabilité inclut désormais des projets environnementaux pratiques, préparant les élèves à relever les défis climatiques de leur génération.',
        },
    ],

    achievements: [
        {
            id: 'college-acceptance',
            label: 'Admission universitaire',
            value: '100%',
            description:
                'Taux d’admission en université de 4 ans maintenu à 100 % pendant 6 années consécutives.',
            icon: 'School',
        },
        {
            id: 'student-teacher',
            label: 'Ratio élèves-enseignants',
            value: '8:1',
            description: 'Assurer une attention personnalisée pour chaque élève.',
            icon: 'Groups',
        },
        {
            id: 'satisfaction',
            label: 'Satisfaction des parents',
            value: '98%',
            description:
                'Les parents évaluent leur expérience comme excellente ou remarquable.',
            icon: 'ThumbUp',
        },
    ],
};
