import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Chip,
    Tab,
    Tabs,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    Science,
    MenuBook,
    Calculate,
    Language,
    Palette,
    FitnessCenter,
    School,
    TrendingUp,
    Groups,
    EmojiEvents,
    CheckCircle,
} from '@mui/icons-material';
import { ResponsiveImage } from '../../components/landing/shared/ResponsiveImage';
import { PageHeader } from '../../components/landing/shared/PageHeader';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

/**
 * Interface for academic programs
 */
interface AcademicProgram {
    id: string;
    name: string;
    level: string;
    description: string;
    subjects: string[];
    highlights: string[];
    image: string;
}

/**
 * Interface for curriculum subjects
 */
interface Subject {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    features: string[];
}

/**
 * Interface for performance metrics
 */
interface PerformanceMetric {
    id: string;
    label: string;
    value: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    progress?: number;
}

/**
 * Interface for grade level showcases
 */
interface GradeLevel {
    id: string;
    level: string;
    title: string;
    description: string;
    keySubjects: string[];
    specialPrograms: string[];
    image: string;
}

/**
 * AcademicsPage component - Comprehensive academic information
 */
export const AcademicsPage: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    // Academic programs data
    const academicPrograms: AcademicProgram[] = [
        {
            id: '1',
            name: 'Maternelle & Primaire',
            level: 'Maternelle-CM2',
            description:
                'Poser des bases solides en lecture, écriture, numération et pensée critique grâce à des expériences d’apprentissage pratiques et engageantes.',
            subjects: [
                'Mathématiques',
                'Arts du langage',
                'Sciences',
                'Études sociales',
                'Arts',
            ],
            highlights: [
                'Apprentissage par le jeu',
                'Intégration STEAM',
                'Développement du caractère',
                'Soutien multilingue',
            ],
            image: '/pexels-cottonbro-7395304.jpg',
        },
        {
            id: '2',
            name: 'Excellence au Lycée',
            level: 'F1-Sixième Supérieure',
            description:
                'Préparer les élèves à réussir à l’université et tout au long de la vie grâce à un enseignement rigoureux et à des opportunités diversifiées.',
            subjects: [
                'Cours AP',
                'Sciences Avancées',
                'Calcul',
                'Langues étrangères',
                'Beaux-Arts',
                'Informatique',
            ],
            highlights: [
                'Cours créditables pour l’université',
                'Projets de recherche',
                'Programmes de stages',
                'Partenariats universitaires',
            ],
            image: '/pexels-max-fischer-5212317.jpg',
        },
    ];

    // Core subjects data
    const coreSubjects: Subject[] = [
        {
            id: '1',
            name: 'Éducation STEM',
            description:
                'Programme complet en Sciences, Technologie, Ingénierie et Mathématiques avec laboratoires pratiques et applications concrètes.',
            icon: <Science />,
            color: '#10b981',
            features: [
                'Laboratoires à la pointe',
                'Programmation et robotique',
                'Méthode scientifique',
                'Projets d’innovation',
            ],
        },
        {
            id: '2',
            name: 'Arts du Langage',
            description:
                'Développement de compétences en communication à travers la littérature, l’écriture, l’oral et l’analyse critique dans plusieurs genres.',
            icon: <MenuBook />,
            color: '#6366f1',
            features: [
                'Écriture créative',
                'Prise de parole en public',
                'Analyse littéraire',
                'Éducation aux médias',
            ],
        },
        {
            id: '3',
            name: 'Mathématiques',
            description:
                'Développer la maîtrise des mathématiques, des concepts de base au calcul avancé, avec un accent sur la résolution de problèmes et le raisonnement logique.',
            icon: <Calculate />,
            color: '#8b5cf6',
            features: [
                'Apprentissage par problèmes',
                'Modélisation mathématique',
                'Intégration des technologies',
                'Équipes de compétition',
            ],
        },
        {
            id: '4',
            name: 'Langues Étrangères',
            description:
                'Programmes immersifs favorisant la citoyenneté mondiale et la compréhension culturelle à travers des expériences authentiques.',
            icon: <Language />,
            color: '#06b6d4',
            features: [
                'Enseignants natifs',
                'Échanges culturels',
                'Programmes d’immersion',
                'Partenariats internationaux',
            ],
        },
        {
            id: '5',
            name: 'Arts Créatifs',
            description:
                'Programme complet en arts incluant arts visuels, musique, théâtre et médias numériques pour stimuler la créativité et l’expression personnelle.',
            icon: <Palette />,
            color: '#f59e0b',
            features: [
                'Studios professionnels',
                'Opportunités de performance',
                'Outils d’art numérique',
                'Résidences d’artistes',
            ],
        },
        {
            id: '6',
            name: 'Éducation Physique',
            description:
                'Promotion de la forme physique, du travail en équipe et d’un mode de vie sain à travers des sports et programmes de bien-être diversifiés.',
            icon: <FitnessCenter />,
            color: '#ef4444',
            features: [
                'Programmes sportifs variés',
                'Entraînement physique',
                'Éducation au bien-être',
                'Équipes de compétition',
            ],
        },
    ];

    // Performance metrics
    const performanceMetrics: PerformanceMetric[] = [
        {
            id: '1',
            label: 'Ratio Élèves-Enseignant',
            value: '8:1',
            description:
                'assurant une attention et un accompagnement personnalisés',
            icon: <Groups />,
            color: '#10b981',
        },
        {
            id: '2',
            label: 'Taux d’Admission à l’Université',
            value: '98%',
            description:
                'des diplômés acceptés dans les meilleures universités',
            icon: <School />,
            color: '#6366f1',
            progress: 98,
        },
        {
            id: '3',
            label: 'Excellence aux Examens AP',
            value: '4.2',
            description: 'score moyen aux examens AP (échelle de 5 points)',
            icon: <TrendingUp />,
            color: '#8b5cf6',
            progress: 84,
        },
        {
            id: '4',
            label: 'Prix Académiques',
            value: '+5',
            description: 'réalisations des élèves cette année',
            icon: <EmojiEvents />,
            color: '#f59e0b',
        },
    ];

    // Grade level showcases
    const gradeLevels: GradeLevel[] = [
        {
            id: '1',
            level: 'Maternelle & Primaire',
            title: 'Années Fondamentales (6)',
            description:
                'Éveiller les jeunes esprits grâce à un apprentissage basé sur la découverte, développant des compétences essentielles tout en préservant le plaisir d’apprendre.',
            keySubjects: [
                'Lecture et Écriture',
                'Numération',
                'Exploration Scientifique',
                'Compétences Sociales',
            ],
            specialPrograms: [
                'Laboratoire STEAM',
                'Studio d’Art',
                'Programme de Musique',
                'Aventures à la Bibliothèque',
            ],
            image: '/pexels-cottonbro-6208928.jpg',
        },
        {
            id: '2',
            level: 'Collège',
            title: 'Années d’Excellence (4)',
            description:
                'Préparation des élèves pour le succès universitaire à travers un enseignement rigoureux, des opportunités de leadership et des expériences du monde réel.',
            keySubjects: [
                'Cours AP',
                'Sciences Avancées',
                'Calcul et Statistiques',
                'Méthodes de Recherche',
            ],
            specialPrograms: [
                "Tableau d'honneur",
                'Stages',
                'Partenariats Universitaires',
                'Académie de Leadership',
            ],
            image: '/trnava-university-_9xRHrMOjeg-unsplash.jpg',
        },
    ];

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#fefefe',
            }}
        >
            {/* Page Header with Hero Banner */}
            <PageHeader
                title="GBS Les Karmites"
                subtitle="Programmes éducatifs complets conçus pour inspirer l’apprentissage et favoriser la réussite académique"
                backgroundImage="/pexels-matazumultimedia-32951018.jpg"
                backgroundImageSrcSet={{
                    small: '/pexels-matazumultimedia-32951018.jpg',
                    medium: '/pexels-matazumultimedia-32951018.jpg',
                    large: '/pexels-matazumultimedia-32951018.jpg',
                }}
                textColor="light"
                showOverlay={true}
                minHeight="500px"
            />

            {/* Main Content */}
            <Box component="main">
                {/* Educational Philosophy Section */}
                <EducationalPhilosophySection />

                {/* Academic Programs Section */}
                <ProgramsSection programs={academicPrograms} />

                {/* Core Subjects Curriculum */}
                <CurriculumSection subjects={coreSubjects} />

                {/* Performance Dashboard */}
                <PerformanceSection metrics={performanceMetrics} />

                {/* Grade Level Showcases */}
                <GradeLevelsSection
                    levels={gradeLevels}
                    selectedTab={selectedTab}
                    onTabChange={handleTabChange}
                />
            </Box>
        </Box>
    );
};

/**
 * Educational Philosophy section component
 */
const EducationalPhilosophySection: React.FC = () => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="philosophy"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="md" sx={{ mx: 'auto' }}>
                <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(-30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                    mb: 1,
                                    background:
                                        'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Notre Philosophie Éducative
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '0.875rem',
                                    lineHeight: 1.4,
                                    color: 'text.primary',
                                    mb: 2,
                                }}
                            >
                                Nous croyons que chaque élève est unique et
                                capable d’exceller. Notre approche allie un
                                enseignement académique rigoureux à un
                                accompagnement personnalisé, favorisant la
                                pensée critique, la créativité et le
                                développement du caractère dans un environnement
                                bienveillant.
                            </Typography>
                            <List sx={{ mb: 3 }}>
                                {[
                                    'Student-centered learning approaches',
                                    'Inquiry-based curriculum design',
                                    'Technology-enhanced instruction',
                                    'Real-world application focus',
                                    'Collaborative learning communities',
                                ].map((item, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{ py: 0.5, px: 0 }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 32 }}>
                                            <CheckCircle
                                                sx={{
                                                    fontSize: 20,
                                                    color: 'primary.main',
                                                }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item}
                                            primaryTypographyProps={{
                                                variant: 'body2',
                                                color: 'text.secondary',
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateX(0)'
                                    : 'translateX(30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                            }}
                        >
                            <ResponsiveImage
                                src="/pexels-mary-taylor-5896578.jpg"
                                alt="Students engaged in classroom learning"
                                aspectRatio={4 / 4}
                                borderRadius={2}
                                objectFit="cover"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

/**
 * Academic Programs section component
 */
interface ProgramsSectionProps {
    programs: AcademicProgram[];
}

const ProgramsSection: React.FC<ProgramsSectionProps> = ({ programs }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="programs"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#f8fafc',
            }}
        >
            <Container maxWidth="md" sx={{ mx: 'auto' }}>
                <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 3 } }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            mb: 1,
                            background:
                                'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Programmes Académiques
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: 'text.secondary',
                            maxWidth: '900px',
                            mx: 'auto',
                        }}
                    >
                        Parcours éducatifs complets conçus pour chaque étape de
                        l’apprentissage
                    </Typography>
                </Box>

                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    sx={{ maxWidth: 1000 }}
                >
                    {programs.map((program, index) => (
                        <Grid
                            size={{ xs: 20, md: 6 }}
                            key={program.id}
                            sx={{ display: 'inline-flex' }}
                        >
                            <Card
                                sx={{
                                    width: 'auto',
                                    height: 'auto',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(30px)',
                                    transition:
                                        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${index * 0.2}s`,
                                    '&:hover': {
                                        boxShadow:
                                            '0 8px 25px rgba(99, 102, 241, 0.15)',
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                            >
                                <ResponsiveImage
                                    src={program.image}
                                    alt={program.name}
                                    aspectRatio={12 / 10}
                                    borderRadius={0}
                                    objectFit="cover"
                                />
                                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: {
                                                xs: 'column',
                                                sm: 'row',
                                            },
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: 2,
                                            mb: 1.5,
                                        }}
                                    >
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontSize: '1.125rem',
                                                fontWeight: 600,
                                                color: 'text.primary',
                                            }}
                                        >
                                            {program.name}
                                        </Typography>
                                        <Chip
                                            label={program.level}
                                            size="small"
                                            sx={{
                                                backgroundColor: 'primary.100',
                                                color: 'primary.main',
                                                fontWeight: 500,
                                            }}
                                        />
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: '0.75rem',
                                            color: 'text.secondary',
                                            fontWeight: 500,
                                            mb: 1.5,
                                            display: 'block',
                                        }}
                                    >
                                        {program.description}
                                    </Typography>
                                    <Box sx={{ mb: 1.5 }}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'text.secondary',
                                                fontWeight: 500,
                                                mb: 1,
                                                display: 'block',
                                            }}
                                        >
                                            Matières Clés:
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                justifyContent: 'center',
                                                gap: 2.5,
                                            }}
                                        >
                                            {program.subjects
                                                .slice(0, 3)
                                                .map((subject, subIndex) => (
                                                    <Chip
                                                        key={subIndex}
                                                        label={subject}
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            fontSize: '0.75rem',
                                                        }}
                                                    />
                                                ))}
                                            {program.subjects.length > 3 && (
                                                <Chip
                                                    label={`+${program.subjects.length - 3} more`}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ fontSize: '0.75rem' }}
                                                />
                                            )}
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'text.secondary',
                                                fontWeight: 500,
                                                mb: 1,
                                                display: 'block',
                                            }}
                                        >
                                            Program Highlights:
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 0.5,
                                                alignItems: 'center',
                                            }}
                                        >
                                            {program.highlights
                                                .slice(0, 2)
                                                .map((highlight, hIndex) => (
                                                    <Box
                                                        key={hIndex}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: 1,
                                                            px: 1.5,
                                                            py: 0.5,
                                                            backgroundColor:
                                                                'success.50',
                                                            borderRadius: 1,
                                                            width: 'fit-content',
                                                        }}
                                                    >
                                                        <CheckCircle
                                                            sx={{
                                                                fontSize: 14,
                                                                color: 'success.main',
                                                            }}
                                                        />
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {highlight}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

/**
 * Curriculum section component
 */
interface CurriculumSectionProps {
    subjects: Subject[];
}

const CurriculumSection: React.FC<CurriculumSectionProps> = ({ subjects }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="curriculum"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 600,
                            mb: 2,
                            background:
                                'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Programme d’études complet
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Des matières interdisciplinaires conçues pour former des
                        esprits critiques et polyvalents
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {subjects.map((subject, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={subject.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 2,
                                    transition: 'all 0.3s ease',
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(30px)',
                                    transitionDelay: `${index * 0.1}s`,
                                    '&:hover': {
                                        boxShadow:
                                            '0 8px 25px rgba(99, 102, 241, 0.15)',
                                        transform: 'translateY(-4px)',
                                        borderColor: subject.color,
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                    <Avatar
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            backgroundColor: subject.color,
                                            mx: 'auto',
                                            mb: 2,
                                        }}
                                    >
                                        {subject.icon}
                                    </Avatar>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 1.5,
                                            color: 'text.primary',
                                        }}
                                    >
                                        {subject.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            lineHeight: 1.6,
                                            mb: 2,
                                        }}
                                    >
                                        {subject.description}
                                    </Typography>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'text.secondary',
                                                fontWeight: 500,
                                                mb: 1,
                                                display: 'block',
                                            }}
                                        >
                                            Fonctions Clés:
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: 0.5,
                                            }}
                                        >
                                            {subject.features.map(
                                                (feature, fIndex) => (
                                                    <Box
                                                        key={fIndex}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: 1,
                                                            px: 1.5,
                                                            py: 0.5,
                                                            backgroundColor:
                                                                'grey.100',
                                                            borderRadius: 1,
                                                            width: 'fit-content',
                                                        }}
                                                    >
                                                        <CheckCircle
                                                            sx={{
                                                                fontSize: 14,
                                                                color: subject.color,
                                                            }}
                                                        />
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {feature}
                                                        </Typography>
                                                    </Box>
                                                )
                                            )}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

/**
 * Performance section component
 */
interface PerformanceSectionProps {
    metrics: PerformanceMetric[];
}

const PerformanceSection: React.FC<PerformanceSectionProps> = ({ metrics }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="performance"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#f8fafc',
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 600,
                            mb: 2,
                            background:
                                'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Performance Académique
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Résultats mesurables démontrant notre engagement envers
                        l’excellence éducative
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {metrics.map((metric, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={metric.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    textAlign: 'center',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 2,
                                    p: 3,
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(30px)',
                                    transition:
                                        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${index * 0.1}s`,
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        backgroundColor: metric.color,
                                        mx: 'auto',
                                        mb: 2,
                                    }}
                                >
                                    {metric.icon}
                                </Avatar>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        color: metric.color,
                                        mb: 1,
                                    }}
                                >
                                    {metric.value}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        mb: 1,
                                    }}
                                >
                                    {metric.label}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        mb: metric.progress ? 2 : 0,
                                    }}
                                >
                                    {metric.description}
                                </Typography>
                                {metric.progress && (
                                    <LinearProgress
                                        variant="determinate"
                                        value={metric.progress}
                                        sx={{
                                            height: 6,
                                            borderRadius: 3,
                                            backgroundColor: 'grey.200',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: metric.color,
                                                borderRadius: 3,
                                            },
                                        }}
                                    />
                                )}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

/**
 * Grade Levels section component
 */
interface GradeLevelsSectionProps {
    levels: GradeLevel[];
    selectedTab: number;
    onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const GradeLevelsSection: React.FC<GradeLevelsSectionProps> = ({
    levels,
    selectedTab,
    onTabChange,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const selectedLevel = levels[selectedTab];

    return (
        <Box
            ref={targetRef}
            component="section"
            id="grade-levels"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 600,
                            mb: 2,
                            background:
                                'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Vitrines par niveau
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Découvrez ce qui rend chaque étape de l’apprentissage
                        unique dans notre académie
                    </Typography>
                </Box>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                    <Tabs
                        value={selectedTab}
                        onChange={onTabChange}
                        aria-label="grade level tabs"
                        variant="fullWidth"
                        sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                            },
                            '& .Mui-selected': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        {levels.map((level, index) => (
                            <Tab
                                key={level.id}
                                label={level.level}
                                id={`grade-tab-${index}`}
                                aria-controls={`grade-tabpanel-${index}`}
                            />
                        ))}
                    </Tabs>
                </Box>

                {selectedLevel && (
                    <Box
                        sx={{
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateY(0)'
                                : 'translateY(20px)',
                            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 3, md: 4 }}
                            alignItems="center"
                        >
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 2,
                                            color: 'primary.main',
                                        }}
                                    >
                                        {selectedLevel.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontSize: '1rem',
                                            lineHeight: 1.7,
                                            color: 'text.primary',
                                            mb: 3,
                                        }}
                                    >
                                        {selectedLevel.description}
                                    </Typography>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1,
                                                color: 'text.primary',
                                            }}
                                        >
                                            Matières Clés
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: 0.5,
                                                mb: 2,
                                            }}
                                        >
                                            {selectedLevel.keySubjects.map(
                                                (subject, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={subject}
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            fontSize: '0.75rem',
                                                        }}
                                                    />
                                                )
                                            )}
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1,
                                                color: 'text.primary',
                                            }}
                                        >
                                            Programmes spéciaux
                                        </Typography>
                                        <List sx={{ py: 0 }}>
                                            {selectedLevel.specialPrograms.map(
                                                (program, index) => (
                                                    <ListItem
                                                        key={index}
                                                        sx={{ py: 0.5, px: 0 }}
                                                    >
                                                        <ListItemIcon
                                                            sx={{
                                                                minWidth: 32,
                                                            }}
                                                        >
                                                            <CheckCircle
                                                                sx={{
                                                                    fontSize: 18,
                                                                    color: 'success.main',
                                                                }}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={program}
                                                            primaryTypographyProps={{
                                                                variant:
                                                                    'body2',
                                                                color: 'text.secondary',
                                                            }}
                                                        />
                                                    </ListItem>
                                                )
                                            )}
                                        </List>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <ResponsiveImage
                                    src={selectedLevel.image}
                                    alt={`${selectedLevel.level} students`}
                                    aspectRatio={4 / 3}
                                    borderRadius={2}
                                    objectFit="cover"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Container>
        </Box>
    );
};
