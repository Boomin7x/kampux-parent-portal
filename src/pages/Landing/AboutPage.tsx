import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Chip,
    LinearProgress,
} from '@mui/material';
import {
    School,
    EmojiEvents,
    Groups,
    Psychology,
    Lightbulb,
    Diversity3,
    Star,
    TrendingUp,
} from '@mui/icons-material';
import { PageHeader } from '../../components/landing/shared/PageHeader';
import { ResponsiveImage } from '../../components/landing/shared/ResponsiveImage';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

/**
 * Interface for school values
 */
interface SchoolValue {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

/**
 * Interface for leadership team members
 */
interface LeadershipMember {
    id: string;
    name: string;
    position: string;
    bio: string;
    image: string;
    qualifications: string[];
    experience: string;
}

/**
 * Interface for school achievement statistics
 */
interface Achievement {
    id: string;
    label: string;
    value: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    progress?: number;
}

/**
 * Interface for milestone events in school history
 */
interface HistoryMilestone {
    id: string;
    year: string;
    title: string;
    description: string;
    image?: string;
    achievement?: string;
}

/**
 * AboutPage component - Comprehensive school information
 *
 * Features:
 * - Hero banner with school overview
 * - Mission and vision statements
 * - Core values with visual hierarchy
 * - Leadership team profiles
 * - School history timeline
 * - Achievement statistics and metrics
 * - Responsive design with animations
 * - TypeScript interfaces for type safety
 *
 * Architecture:
 * - Follows DESIGN_PATTERN.md for minimal typography
 * - Uses MUI Grid v2 syntax throughout
 * - Implements intersection observer for animations
 * - Responsive images with lazy loading
 * - Accessibility compliance with proper ARIA labels
 */
export const AboutPage: React.FC = () => {
    // School values data
    const schoolValues: SchoolValue[] = [
        {
            id: '1',
            title: "Etablissemnt d' Excellence",
            description:
                'S’efforcer d’atteindre les plus hauts standards en éducation et de stimuler la curiosité intellectuelle de chaque élève.',
            icon: <School />,
            color: '#6366f1',
        },
        {
            id: '2',
            title: 'Développement de la Caractère',
            description:
                'Bâtir de solides fondations morales et former des citoyens du monde responsables et compatissants.',
            icon: <Psychology />,
            color: '#8b5cf6',
        },
        {
            id: '3',
            title: 'Innovation & Créativité',
            description:
                'Encourager la pensée créative et adopter des approches innovantes pour l’apprentissage et la résolution de problèmes.',
            icon: <Lightbulb />,
            color: '#06b6d4',
        },
        {
            id: '4',
            title: 'Diversité & Inclusion',
            description:
                'Célébrer notre communauté diversifiée et veiller à ce que chaque élève se sente valorisé, respecté et soutenu.',
            icon: <Diversity3 />,
            color: '#10b981',
        },
    ];

    // Leadership team data
    const leadershipTeam: LeadershipMember[] = [
        {
            id: '1',
            name: 'Dr. Sarah Johnson',
            position: 'Principal & Directrice Générale',
            bio: 'À la tête d’Excellence Academy avec plus de 15 ans d’expérience en leadership éducatif, le Dr Johnson apporte une vision innovante et un engagement sans faille envers la réussite des élèves.',
            image: '/pexels-katerina-holmes-5905554.jpg',
            qualifications: [
                'Doctorat en leadership éducatif (Ed.D)',
                'Master en curriculum et pédagogie (M.Ed)',
                'Licence en enseignement primaire (B.A.)',
            ],
            experience: '+15 ans en leadership éducatif',
        },
        {
            id: '2',
            name: 'Prof. Michael Chen',
            position: 'Directeur Académique',
            bio: 'Supervisant nos programmes académiques complets, le Professeur Chen veille à l’excellence du curriculum et à l’innovation des méthodes d’enseignement à tous les niveaux scolaires.',
            image: '/patrick-amoy-6DfEbkqsTiA-unsplash.jpg',
            qualifications: [
                'Doctorat en éducation (Ph.D)',
                'Master en mathématiques (M.A.)',
                'Licence en informatique (B.S.)',
            ],
            experience: '+12 ans en développement du curriculum',
        },
        {
            id: '3',
            name: 'Dr. Emily Rodriguez',
            position: 'Directeur des affaires étudiantes',
            bio: 'Dévoué au bien-être et au développement des étudiants, le Dr Rodriguez dirige nos services complets de soutien aux étudiants ainsi que les programmes extrascolaires.',
            image: '/pexels-rdne-7845454.jpg',
            qualifications: [
                'Doctorat en psychologie (Ph.D)',
                'Master en conseil (M.A.)',
                'Licence en travail social (B.A.)',
            ],
            experience: '+10 ans en services aux étudiants',
        },
    ];

    // Achievement statistics
    const achievements: Achievement[] = [
        {
            id: '1',
            label: 'Taux de réussite des étudiants',
            value: '98%',
            description: 'des diplômés poursuivent leurs études dans des universités de premier plan',
            icon: <TrendingUp />,
            color: '#10b981',
            progress: 98,
        },
        {
            id: '2',
            label: 'Excellence pédagogique',
            value: '95%',
            description: 'des enseignants détiennent des diplômes avancés',
            icon: <Star />,
            color: '#f59e0b',
            progress: 95,
        },
        {
            id: '3',
            label: 'Engagement des étudiants',
            value: '92%',
            description: 'participent aux activités extrascolaires',
            icon: <Groups />,
            color: '#8b5cf6',
            progress: 92,
        },
        {
            id: '4',
            label: 'Prix et distinctions',
            value: '50+',
            description: 'Récompenses nationales et internationales pour l’excellence académique et les initiatives innovantes',
            icon: <EmojiEvents />,
            color: '#06b6d4',
        },
    ];

    // School history milestones
    const historyMilestones: HistoryMilestone[] = [
        {
            id: '1',
            year: '2010',
            title: 'Fondation',
            description:
                'Excellence Academy a été fondée dans le but d’offrir une éducation de classe mondiale dans un environnement bienveillant.',
            image: '/trnava-university-_9xRHrMOjeg-unsplash.jpg',
            achievement: 'Première promotion de 150 élèves',
        },
        {
            id: '2',
            year: '2015',
            title: 'Expansion et développement',
            description:
                'Extension majeure du campus comprenant des laboratoires scientifiques ultramodernes et des installations sportives modernes.',
            image: '/pexels-cics-uma-ipn-238541486-12238968.jpg',
            achievement: "La population d'élèves a augmenté de +500",
        },
        {
            id: '3',
            year: '2020',
            title: 'Innovation Digitale',
            description:
                'A initié une plateforme d’apprentissage numérique complète, garantissant une éducation fluide lors de défis mondiaux.',
            image: '/pexels-max-fischer-5212317.jpg',
            achievement: 'Préparation numérique à 100 % atteinte',
        },
        {
            id: '4',
            year: '2024',
            title: 'Reconnaissance de l’excellence',
            description:
                'Attribué le statut de « École d’Excellence » et reconnu comme un établissement éducatif de premier plan dans la région.',
            image: '/pexels-rdne-7092339.jpg',
            achievement: 'École classée parmi les 5 % meilleures au niveau national',
        },
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#fefefe',
            }}
        >
            {/* Page Header with Hero Banner */}
            <PageHeader
                title="A propos de Nous"
                subtitle="Découvrez notre mission, nos valeurs et notre engagement envers l’excellence éducative."
                backgroundImage="/pexels-charlotte-may-5965698.jpg"
                backgroundImageSrcSet={{
                    small: '/pexels-charlotte-may-5965698.jpg',
                    medium: '/pexels-charlotte-may-5965698.jpg',
                    large: '/pexels-charlotte-may-5965698.jpg',
                }}
                textColor="light"
                showOverlay={true}
                minHeight="400px"
            />

            {/* Main Content */}
            <Box component="main">
                {/* Mission & Vision Section */}
                <MissionVisionSection />

                {/* Core Values Section */}
                <ValuesSection values={schoolValues} />

                {/* Leadership Team Section */}
                <LeadershipSection team={leadershipTeam} />

                {/* Achievement Statistics */}
                <AchievementsSection achievements={achievements} />

                {/* School History Timeline */}
                <HistorySection milestones={historyMilestones} />
            </Box>
        </Box>
    );
};

/**
 * Mission and Vision section component
 */
const MissionVisionSection: React.FC = () => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="mission-vision"
            sx={{
                py: { xs: 4, md: 6 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={2}>
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
                                    color: '#6366f1',
                                }}
                            >
                                Notre Mission
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '0.875rem',
                                    lineHeight: 1.4,
                                    color: 'text.primary',
                                    mb: 1.5,
                                }}
                            >
                                Offrir une éducation exceptionnelle qui favorise
                                la curiosité intellectuelle, le développement du
                                caractère et la citoyenneté mondiale. Nous
                                donnons aux élèves les moyens de devenir des
                                leaders confiants, créatifs et compatissants,
                                capables d’avoir un impact positif sur le monde.
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: 'text.secondary',
                                    fontStyle: 'italic',
                                }}
                            >
                                "L’excellence n’est pas une destination, c’est
                                un voyage de croissance et d’apprentissage
                                continus.
                            </Typography>
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
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                    mb: 1,
                                    color: '#8b5cf6',
                                }}
                            >
                                Notre Vision
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '0.875rem',
                                    lineHeight: 1.4,
                                    color: 'text.primary',
                                    mb: 1.5,
                                }}
                            >
                                Être reconnu comme le principal établissement
                                éducatif qui inspire l’innovation, célèbre la
                                diversité et forme les leaders de demain. Nous
                                envisageons une communauté d’apprentissage où
                                chaque élève s’épanouit sur les plans
                                académique, social et émotionnel.
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: 'text.secondary',
                                    fontStyle: 'italic',
                                }}
                            >
                                "Formant les leaders de demain par une éducation
                                exceptionnelle de aujourd’hui."
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

/**
 * Values section component
 */
interface ValuesSectionProps {
    values: SchoolValue[];
}

const ValuesSection: React.FC<ValuesSectionProps> = ({ values }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="values"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#f8fafc',
            }}
        >
            <Container maxWidth="lg">
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
                        Nos Valeurs Fondamentales
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Les principes fondamentaux qui guident notre philosophie
                        éducative et façonnent notre communauté.
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {values.map((value, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={value.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    textAlign: 'center',
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
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 2 }}>
                                    <Avatar
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            backgroundColor: value.color,
                                            mx: 'auto',
                                            mb: 1.5,
                                        }}
                                    >
                                        {value.icon}
                                    </Avatar>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontSize: '1.125rem',
                                            fontWeight: 600,
                                            mb: 1,
                                            color: 'text.primary',
                                        }}
                                    >
                                        {value.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'text.secondary',
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {value.description}
                                    </Typography>
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
 * Leadership section component
 */
interface LeadershipSectionProps {
    team: LeadershipMember[];
}

const LeadershipSection: React.FC<LeadershipSectionProps> = ({ team }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="leadership"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
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
                        Équipe de direction
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Rencontrez les professionnels dévoués qui pilotent notre
                        mission éducative.
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {team.map((member, index) => (
                        <Grid size={{ xs: 12, md: 4 }} key={member.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    // border: '1px solid',
                                    border: '0px',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    p: 0,
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(30px)',
                                    transition:
                                        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${index * 0.2}s`,
                                }}
                            >
                                <ResponsiveImage
                                    src={member.image}
                                    alt={member.name}
                                    aspectRatio={4 / 3}
                                    borderRadius={0}
                                    objectFit="cover"
                                />
                                <CardContent sx={{ p: 2 }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            mb: 0.5,
                                            color: 'text.primary',
                                        }}
                                    >
                                        {member.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'primary.main',
                                            fontWeight: 500,
                                            mb: 1,
                                        }}
                                    >
                                        {member.position}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'text.secondary',
                                            lineHeight: 1.4,
                                            mb: 1,
                                        }}
                                    >
                                        {member.bio}
                                    </Typography>
                                    <Box sx={{ mb: 1 }}>
                                        {member.qualifications.map(
                                            (qual, qualIndex) => (
                                                <Chip
                                                    key={qualIndex}
                                                    label={qual}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        mr: 0.5,
                                                        mb: 0.5,
                                                        fontSize: '0.75rem',
                                                        height: '18px',
                                                    }}
                                                />
                                            )
                                        )}
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: '0.75rem',
                                            color: 'text.secondary',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {member.experience}
                                    </Typography>
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
 * Achievements section component
 */
interface AchievementsSectionProps {
    achievements: Achievement[];
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({
    achievements,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="achievements"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#f8fafc',
            }}
        >
            <Container maxWidth="lg">
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
                        Nos Accomplissements
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Une excellence mesurable dans tous les aspects de notre
                        mission éducative.
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {achievements.map((achievement, index) => (
                        <Grid
                            size={{ xs: 12, sm: 6, md: 3 }}
                            key={achievement.id}
                        >
                            <Card
                                sx={{
                                    height: '100%',
                                    textAlign: 'center',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 1,
                                    p: 2,
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
                                        width: 24,
                                        height: 24,
                                        backgroundColor: achievement.color,
                                        mx: 'auto',
                                        mb: 1.5,
                                    }}
                                >
                                    {achievement.icon}
                                </Avatar>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 700,
                                        color: achievement.color,
                                        mb: 0.5,
                                    }}
                                >
                                    {achievement.value}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        mb: 0.5,
                                    }}
                                >
                                    {achievement.label}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: '0.8125rem',
                                        color: 'text.secondary',
                                        mb: achievement.progress ? 1.5 : 0,
                                    }}
                                >
                                    {achievement.description}
                                </Typography>
                                {achievement.progress && (
                                    <LinearProgress
                                        variant="determinate"
                                        value={achievement.progress}
                                        sx={{
                                            height: 4,
                                            borderRadius: 2,
                                            backgroundColor: 'grey.200',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor:
                                                    achievement.color,
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
 * History section component
 */
interface HistorySectionProps {
    milestones: HistoryMilestone[];
}

const HistorySection: React.FC<HistorySectionProps> = ({ milestones }) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="history"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
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
                        Notre Parcours
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: 'text.secondary',
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Les étapes clés de notre engagement envers l’excellence
                        éducative.
                    </Typography>
                </Box>

                <Box sx={{ position: 'relative' }}>
                    {/* Timeline line */}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: { xs: '24px', md: '50%' },
                            top: 0,
                            bottom: 0,
                            width: '2px',
                            backgroundColor: 'primary.main',
                            transform: { md: 'translateX(-50%)' },
                        }}
                    />

                    {milestones.map((milestone, index) => (
                        <Box
                            key={milestone.id}
                            sx={{
                                position: 'relative',
                                mb: 4,
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: `${index * 0.2}s`,
                            }}
                        >
                            <Grid container spacing={4} alignItems="center">
                                {/* Timeline year marker */}
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <Box
                                        sx={{
                                            textAlign: {
                                                xs: 'left',
                                                md:
                                                    index % 2 === 0
                                                        ? 'right'
                                                        : 'left',
                                            },
                                            pl: { xs: 6, md: 0 },
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 700,
                                                color: 'primary.main',
                                                mb: 1,
                                            }}
                                        >
                                            {milestone.year}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1,
                                            }}
                                        >
                                            {milestone.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                lineHeight: 1.6,
                                                mb: 1,
                                            }}
                                        >
                                            {milestone.description}
                                        </Typography>
                                        {milestone.achievement && (
                                            <Chip
                                                label={milestone.achievement}
                                                variant="filled"
                                                size="small"
                                                sx={{
                                                    backgroundColor:
                                                        'primary.100',
                                                    color: 'primary.main',
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Grid>

                                {/* Timeline center marker */}
                                <Grid size={{ xs: 0, md: 2 }}>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            display: { xs: 'none', md: 'flex' },
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                backgroundColor: 'primary.main',
                                                border: '3px solid white',
                                                boxShadow:
                                                    '0 0 0 3px rgba(99, 102, 241, 0.2)',
                                            }}
                                        />
                                    </Box>
                                </Grid>

                                {/* Timeline image */}
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <Box
                                        sx={{
                                            order: {
                                                md: index % 2 === 0 ? -1 : 1,
                                            },
                                            pl: { xs: 6, md: 0 },
                                        }}
                                    >
                                        {milestone.image && (
                                            <ResponsiveImage
                                                src={milestone.image}
                                                alt={`${milestone.title} - ${milestone.year}`}
                                                aspectRatio={16 / 9}
                                                borderRadius={2}
                                                objectFit="cover"
                                            />
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>

                            {/* Mobile timeline marker */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    left: '18px',
                                    top: '8px',
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: 'primary.main',
                                    border: '3px solid white',
                                    boxShadow:
                                        '0 0 0 3px rgba(99, 102, 241, 0.2)',
                                    display: { xs: 'block', md: 'none' },
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};
