import {
    AccessTime,
    Brush,
    CalendarToday,
    CheckCircle,
    Groups,
    LocationOn,
    MenuBook,
    Person,
    Schedule,
    SportsBasketball,
    VolunteerActivism,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useMemo, useState } from 'react';
import { PageHeader } from '../../components/landing/shared/PageHeader';
import { ResponsiveImage } from '../../components/landing/shared/ResponsiveImage';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

/**
 * Interface for activity categories
 */
interface ActivityCategory {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
    count: number;
    description: string;
}

/**
 * Interface for student activities
 */
interface StudentActivity {
    id: string;
    name: string;
    category: string;
    description: string;
    image?: string;
    meetingSchedule: string;
    memberCount: number;
    highlights: string[];
    achievements?: string[];
}

/**
 * Interface for student testimonials
 */
interface StudentTestimonial {
    id: string;
    name: string;
    grade: string;
    quote: string;
    activity: string;
    image?: string;
}

/**
 * Interface for campus events
 */
interface CampusEvent {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    category: string;
    description?: string;
}

/**
 * Interface for student life statistics
 */
interface StudentLifeStatistic {
    id: string;
    label: string;
    value: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

export const StudentLifePage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState(0);

    // Student Life Statistics
    const studentLifeStats: StudentLifeStatistic[] = [
        {
            id: '1',
            label: 'Clubs et Associations',
            value: '50+',
            description: 'groupes d’intérêts variés',
            icon: <Groups />,
            color: '#f59e0b',
        },
        {
            id: '2',
            label: 'Équipes Sportives',
            value: '12',
            description: 'équipes compétitives',
            icon: <SportsBasketball />,
            color: '#10b981',
        },
        {
            id: '3',
            label: 'Programmes Artistiques',
            value: '8',
            description: 'opportunités d’expression créative',
            icon: <Brush />,
            color: '#f59e0b',
        },
        {
            id: '4',
            label: 'Heures de Service/An',
            value: '5000+',
            description: 'impact sur la communauté',
            icon: <VolunteerActivism />,
            color: '#ef4444',
        },
    ];

    // Activity Categories
    const activityCategories: ActivityCategory[] = [
        {
            id: '1',
            name: 'Sports & Athlétisme',
            icon: <SportsBasketball />,
            color: '#10b981',
            count: 15,
            description:
                'Équipes sportives compétitives et programmes récréatifs',
        },
        {
            id: '2',
            name: 'Arts & Culture',
            icon: <Brush />,
            color: '#f59e0b',
            count: 12,
            description:
                'Expression créative à travers les arts visuels, la musique et le théâtre',
        },
        {
            id: '3',
            name: 'Clubs Académiques',
            icon: <MenuBook />,
            color: '#f59e0b',
            count: 18,
            description:
                'Groupes centrés sur les matières et équipes académiques compétitives',
        },
        {
            id: '4',
            name: 'Service Communautaire',
            icon: <VolunteerActivism />,
            color: '#ef4444',
            count: 8,
            description:
                'Opportunités de bénévolat et initiatives à impact social',
        },
    ];

    // Student Activities Data
    const studentActivities: StudentActivity[] = [
        // Sports & Athletics
        {
            id: '1',
            name: 'Basketball',
            category: 'Sports & Athlétisme',
            description:
                'Équipes compétitives avec encadrement professionnel et plusieurs championnats de ligue.',
            image: '/pexels-max-fischer-5212317.jpg',
            meetingSchedule: 'Lun-Ven, 15h30-17h30',
            memberCount: 28,
            highlights: [
                'Champions de Ligue 2023',
                'Qualifications Tournoi d’État',
                'Leaders de Division',
            ],
            achievements: ['Champions Régionaux', 'Prix Fair-Play'],
        },
        {
            id: '2',
            name: 'Club de Football',
            category: 'Sports & Athlétisme',
            description:
                'Programmes de football compétitif et récréatif ouverts à tous les niveaux.',
            image: '/pexels-cottonbro-6208926.jpg',
            meetingSchedule: 'Lun, Mer, Ven 15h30-17h00',
            memberCount: 32,
            highlights: [
                'Tous niveaux acceptés',
                'Tournois inter-écoles',
                'Orientation fitness',
            ],
        },
        {
            id: '3',
            name: 'Athlétisme',
            category: 'Sports & Athlétisme',
            description:
                'Courses de fond, sprints et épreuves de terrain avec compétitions individuelles et par équipe.',
            meetingSchedule: 'Tous les jours 15h30-17h30',
            memberCount: 25,
            highlights: [
                'Excellence individuelle',
                'Esprit d’équipe',
                'Qualifiés aux État',
            ],
        },

        // Arts & Culture
        {
            id: '4',
            name: 'Club de Théâtre',
            category: 'Arts & Culture',
            description:
                'Productions théâtrales annuelles, ateliers d’improvisation et opportunités de performance toute l’année.',
            image: '/pexels-cottonbro-6208928.jpg',
            meetingSchedule: 'Mar & Jeu, 15h00-17h00',
            memberCount: 35,
            highlights: [
                'Comédie musicale de printemps',
                'Pièce de théâtre d’automne',
                'Soirées d’impro',
            ],
            achievements: [
                'Excellence Régionale en Théâtre',
                'Meilleure Production Étudiante 2023',
            ],
        },
        {
            id: '5',
            name: 'Atelier d’Art',
            category: 'Arts & Culture',
            description:
                'Exploration de divers médias artistiques, peinture, sculpture et art numérique.',
            image: '/pexels-cottonbro-7395304.jpg',
            meetingSchedule: 'Studio ouvert : tous les jours 15h00-18h00',
            memberCount: 30,
            highlights: [
                'Multiples supports',
                'Expositions étudiantes',
                'Développement de portfolio',
            ],
        },
        {
            id: '6',
            name: 'Orchestre & Ensemble Musical',
            category: 'Arts & Culture',
            description:
                'Concerts, compétitions et enseignement musical pour tous les niveaux.',
            meetingSchedule: 'Tous les jours 7h30-8h30 & 15h00-16h30',
            memberCount: 42,
            highlights: [
                'Concerts',
                'Compétitions musicales',
                'Opportunités solos',
            ],
        },

        // Clubs Académiques
        {
            id: '7',
            name: 'Équipe de Débat',
            category: 'Clubs Académiques',
            description:
                'Compétitions régionales et nationales, développement de la pensée critique et de l’expression orale.',
            meetingSchedule: 'Mer & Ven, 15h30-17h00',
            memberCount: 22,
            highlights: [
                'Compétitions',
                'Expression publique',
                'Pensée critique',
            ],
            achievements: ['Champions de Débat État', 'Qualifiés Nationaux'],
        },
        {
            id: '8',
            name: 'Club Environnemental',
            category: 'Service Communautaire',
            description:
                'Initiatives de durabilité, campagnes de sensibilisation environnementale et projets de conservation.',
            meetingSchedule: 'Mardi, 15h30-16h30',
            memberCount: 27,
            highlights: [
                'Projets durables',
                'Sensibilisation environnementale',
                'Efforts de conservation',
            ],
        },
        {
            id: '9',
            name: 'Tutorat entre Pairs',
            category: 'Service Communautaire',
            description:
                'Les élèves aident leurs camarades à réussir académiquement à travers l’apprentissage entre pairs.',
            meetingSchedule: 'Horaires flexibles',
            memberCount: 38,
            highlights: [
                'Soutien académique',
                'Compétences en leadership',
                'Mentorat',
            ],
        },
    ];

    // Student Testimonials
    const studentTestimonials: StudentTestimonial[] = [
        {
            id: '1',
            name: 'Sarah Chen',
            grade: '11e année',
            quote: "Faire partie du club de théâtre m'a aidée à gagner en confiance et à découvrir ma passion pour raconter des histoires. La communauté ici est vraiment incroyable !",
            activity: 'Présidente du club de théâtre',
            image: '/pexels-mary-taylor-5896578.jpg',
        },
        {
            id: '2',
            name: 'Marcus Johnson',
            grade: '12e année',
            quote: "L'équipe de robotique m'a enseigné des compétences en résolution de problèmes qui vont bien au-delà de l'ingénierie. Nous ne construisons pas seulement des robots, nous construisons notre avenir.",
            activity: "Capitaine de l'équipe de robotique",
        },
        {
            id: '3',
            name: 'Emily Rodriguez',
            grade: '10e année',
            quote: "Grâce au service communautaire, j'ai appris que de petites actions peuvent avoir un grand impact. Nos projets environnementaux ont un véritable effet.",
            activity: 'Vice-présidente du club environnemental',
        },
    ];

    // Campus Events
    const upcomingEvents: CampusEvent[] = [
        {
            id: '1',
            title: 'Spectacle musical',
            date: '2025-12-15',
            time: '13h00',
            location: 'Auditorium principal',
            category: 'Arts',
            description:
                'Spectacle musical annuel mettant en vedette nos talentueux élèves du club de théâtre',
        },
        {
            id: '2',
            title: 'Foire scientifique',
            date: '2026-02-10',
            time: '9h00 - 15h00',
            location: 'Gymnase',
            category: 'Académique',
            description:
                'Projets de recherche des élèves et innovations scientifiques exposés',
        },
        {
            id: '3',
            title: 'Match de championnat de basketball',
            date: '2026-02-07',
            time: '8h00',
            location: 'Terrains locaux',
            category: 'Sports',
            description:
                'L’équipe de basketball varsity en compétition pour le championnat régional',
        },
        {
            id: '4',
            title: 'Vernissage de l’exposition artistique',
            date: '2026-02-08',
            time: '11h30',
            location: 'Galerie d’art',
            category: 'Arts',
            description:
                'Présentation des œuvres d’art des élèves de tous les niveaux',
        },
        {
            id: '5',
            title: 'Journée de service communautaire',
            date: '2026-05-15',
            time: '9h00 - 12h00',
            location: 'Divers lieux',
            category: 'Service',
            description:
                'Projets de bénévolat à l’échelle de l’école dans la communauté locale',
        },
    ];

    // Filter activities by selected category
    const filteredActivities = useMemo(() => {
        if (selectedCategory === 0) return studentActivities;
        const categoryName = activityCategories[selectedCategory - 1]?.name;
        return studentActivities.filter(
            activity => activity.category === categoryName
        );
    }, [selectedCategory]);

    const handleCategoryChange = (
        _: React.SyntheticEvent,
        newValue: number
    ) => {
        setSelectedCategory(newValue);
    };

    return (
        <Box sx={{ backgroundColor: '#fefefe', minHeight: '100vh' }}>
            {/* Page Header with Hero Banner */}
            <PageHeader
                title="La Vie sur le Campus"
                subtitle="Une communauté dynamique où les étudiants découvrent leurs passions, nouent des amitiés et créent des souvenirs durables grâce à des activités variées et des expériences enrichissantes"
                backgroundImage="/pexels-mary-taylor-5896578.jpg"
                backgroundImageSrcSet={{
                    small: '/pexels-mary-taylor-5896578.jpg',
                    medium: '/pexels-mary-taylor-5896578.jpg',
                    large: '/pexels-mary-taylor-5896578.jpg',
                }}
                textColor="light"
                showOverlay={true}
                minHeight="400px"
            />

            {/* Main Content */}
            <Box component="main">
                {/* Student Life Statistics */}
                <StudentLifeStatsSection statistics={studentLifeStats} />

                {/* Activity Categories with Tabs */}
                <ActivityCategoriesSection
                    categories={activityCategories}
                    activities={filteredActivities}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                />

                {/* Student Testimonials */}
                <StudentTestimonialsSection
                    testimonials={studentTestimonials}
                />

                {/* Events Calendar */}
                <EventsCalendarSection events={upcomingEvents} />

                {/* Daily Schedule */}
                <DailyScheduleSection />
            </Box>
        </Box>
    );
};

/**
 * Student Life Statistics section component
 */
interface StudentLifeStatsSectionProps {
    statistics: StudentLifeStatistic[];
}

const StudentLifeStatsSection: React.FC<StudentLifeStatsSectionProps> = ({
    statistics,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="student-life-stats"
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
                                'linear-gradient(135deg, #f59e0b, #16a34a)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Vie d'élèves en un coup d’œi
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
                        Explorez les nombreuses opportunités qui font la
                        richesse de notre vie scolaire
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {statistics.map((stat, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.id}>
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
                                        backgroundColor: stat.color,
                                        mx: 'auto',
                                        mb: 1.5,
                                    }}
                                >
                                    {stat.icon}
                                </Avatar>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 700,
                                        color: stat.color,
                                        mb: 0.5,
                                    }}
                                >
                                    {stat.value}
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
                                    {stat.label}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: '0.8125rem',
                                        color: 'text.secondary',
                                    }}
                                >
                                    {stat.description}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

/**
 * Activity Categories section component
 */
interface ActivityCategoriesSectionProps {
    categories: ActivityCategory[];
    activities: StudentActivity[];
    selectedCategory: number;
    onCategoryChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const ActivityCategoriesSection: React.FC<ActivityCategoriesSectionProps> = ({
    categories,
    activities,
    selectedCategory,
    onCategoryChange,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="activities"
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
                                'linear-gradient(135deg, #f59e0b, #16a34a)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Activités & Programmes
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
                        Parcourez nos activités variées et trouvez ce qui vous
                        passionne
                    </Typography>
                </Box>

                {/* Category Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs
                        value={selectedCategory}
                        onChange={onCategoryChange}
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
                        <Tab label="All Activities" />
                        {categories.map(category => (
                            <Tab key={category.id} label={category.name} />
                        ))}
                    </Tabs>
                </Box>

                {/* Activity Grid */}
                <Grid container spacing={2}>
                    {activities.map((activity, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={activity.id}>
                            <Card
                                sx={{
                                    height: '100%',
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
                                    transitionDelay: `${index * 0.1}s`,
                                    '&:hover': {
                                        boxShadow:
                                            '0 8px 25px rgba(99, 102, 241, 0.15)',
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                {activity.image && (
                                    <ResponsiveImage
                                        src={activity.image}
                                        alt={activity.name}
                                        aspectRatio={16 / 9}
                                        borderRadius={0}
                                        objectFit="cover"
                                    />
                                )}
                                <CardContent sx={{ p: 2 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            mb: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                color: 'text.primary',
                                            }}
                                        >
                                            {activity.name}
                                        </Typography>
                                        <Chip
                                            label={activity.category}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                fontSize: '0.75rem',
                                                height: '20px',
                                            }}
                                        />
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'text.secondary',
                                            lineHeight: 1.4,
                                            mb: 1.5,
                                        }}
                                    >
                                        {activity.description}
                                    </Typography>
                                    <Box sx={{ mb: 1.5 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                                mb: 0.5,
                                            }}
                                        >
                                            <Schedule
                                                sx={{
                                                    fontSize: 14,
                                                    color: 'text.secondary',
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                {activity.meetingSchedule}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                            }}
                                        >
                                            <Person
                                                sx={{
                                                    fontSize: 14,
                                                    color: 'text.secondary',
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                {activity.memberCount} members
                                            </Typography>
                                        </Box>
                                    </Box>
                                    {activity.highlights &&
                                        activity.highlights.length > 0 && (
                                            <Box>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        fontWeight: 500,
                                                        mb: 0.5,
                                                        display: 'block',
                                                    }}
                                                >
                                                    Faits marquants:
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    {activity.highlights
                                                        .slice(0, 3)
                                                        .map(
                                                            (
                                                                highlight,
                                                                hIndex
                                                            ) => (
                                                                <Chip
                                                                    key={hIndex}
                                                                    label={
                                                                        highlight
                                                                    }
                                                                    variant="filled"
                                                                    size="small"
                                                                    sx={{
                                                                        fontSize:
                                                                            '0.75rem',
                                                                        height: '18px',
                                                                        backgroundColor:
                                                                            'primary.50',
                                                                        color: 'primary.main',
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                </Box>
                                            </Box>
                                        )}
                                    <Box sx={{ mt: 1.5, textAlign: 'center' }}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                fontSize: '0.75rem',
                                                textTransform: 'none',
                                                borderRadius: 1,
                                                px: 2,
                                            }}
                                        >
                                            En Savoir Plus
                                        </Button>
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
 * Student Testimonials section component
 */
interface StudentTestimonialsSectionProps {
    testimonials: StudentTestimonial[];
}

const StudentTestimonialsSection: React.FC<StudentTestimonialsSectionProps> = ({
    testimonials,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="testimonials"
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
                                'linear-gradient(135deg, #f59e0b, #16a34a)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Témoignages d’élèves
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
                        Découvrez les expériences et le parcours de nos élèves
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {testimonials.map((testimonial, index) => (
                        <Grid size={{ xs: 12, md: 4 }} key={testimonial.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 2,
                                    p: 2,
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(30px)',
                                    transition:
                                        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${index * 0.2}s`,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2,
                                    }}
                                >
                                    {testimonial.image ? (
                                        <Avatar
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                mr: 1,
                                            }}
                                        >
                                            <ResponsiveImage
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                aspectRatio={1}
                                                borderRadius={0}
                                                objectFit="cover"
                                            />
                                        </Avatar>
                                    ) : (
                                        <Avatar
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                mr: 1,
                                                backgroundColor: 'primary.main',
                                            }}
                                        >
                                            {testimonial.name.charAt(0)}
                                        </Avatar>
                                    )}
                                    <Box>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                color: 'text.primary',
                                            }}
                                        >
                                            {testimonial.name}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {testimonial.grade} •{' '}
                                            {testimonial.activity}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ position: 'relative' }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'text.secondary',
                                            lineHeight: 1.5,
                                            fontStyle: 'italic',
                                            pl: 2,
                                            borderLeft: '3px solid',
                                            borderColor: 'primary.main',
                                        }}
                                    >
                                        "{testimonial.quote}"
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

/**
 * Events Calendar section component
 */
interface EventsCalendarSectionProps {
    events: CampusEvent[];
}

const EventsCalendarSection: React.FC<EventsCalendarSectionProps> = ({
    events,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            component="section"
            id="events"
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
                                'linear-gradient(135deg, #f59e0b, #16a34a)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        À ne pas manquer
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
                        Ne ratez pas nos prochains événements et activités
                        captivants
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {events.map((event, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 2,
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
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        mb: 1,
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            color: 'text.primary',
                                        }}
                                    >
                                        {event.title}
                                    </Typography>
                                    <Chip
                                        label={event.category}
                                        size="small"
                                        variant="filled"
                                        sx={{
                                            fontSize: '0.75rem',
                                            height: '18px',
                                            backgroundColor: 'primary.50',
                                            color: 'primary.main',
                                        }}
                                    />
                                </Box>
                                <Box sx={{ mb: 1 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            mb: 0.5,
                                        }}
                                    >
                                        <CalendarToday
                                            sx={{
                                                fontSize: 14,
                                                color: 'text.secondary',
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {new Date(
                                                event.date
                                            ).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            mb: 0.5,
                                        }}
                                    >
                                        <AccessTime
                                            sx={{
                                                fontSize: 14,
                                                color: 'text.secondary',
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {event.time}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                        }}
                                    >
                                        <LocationOn
                                            sx={{
                                                fontSize: 14,
                                                color: 'text.secondary',
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {event.location}
                                        </Typography>
                                    </Box>
                                </Box>
                                {event.description && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: 'text.secondary',
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {event.description}
                                    </Typography>
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
 * Daily Schedule section component
 */
const DailyScheduleSection: React.FC = () => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const scheduleItems = [
        {
            time: '7h45 - 8h00',
            activity: 'Rassemblement du matin',
            description:
                'Annonces quotidiennes et rencontre de la communauté scolaire',
        },
        {
            time: '8h00 - 11h30',
            activity: 'Cours du matin',
            description: 'Cours académiques principaux et cours spécialisés',
        },
        {
            time: '11h30 - 12h15',
            activity: 'Pause déjeuner',
            description:
                'Repas à la cafétéria et moment de convivialité avec les camarades',
        },
        {
            time: '12h15 - 15h00',
            activity: 'Cours de l’après-midi',
            description: 'Poursuite des apprentissages et activités pratiques',
        },
    ];

    return (
        <Box
            ref={targetRef}
            component="section"
            id="schedule"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
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
                                        'linear-gradient(135deg, #f59e0b, #16a34a)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Emploi du temps quotidien
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontSize: '1rem',
                                    color: 'text.secondary',
                                    mb: 3,
                                }}
                            >
                                Une journée structurée qui équilibre études et
                                développement personnel
                            </Typography>
                            <Paper
                                sx={{
                                    p: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    borderRadius: 2,
                                }}
                            >
                                <List sx={{ py: 0 }}>
                                    {scheduleItems.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            sx={{
                                                py: 1.5,
                                                px: 0,
                                                borderBottom:
                                                    index <
                                                    scheduleItems.length - 1
                                                        ? '1px solid'
                                                        : 'none',
                                                borderColor: 'divider',
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 40 }}>
                                                <Avatar
                                                    sx={{
                                                        width: 20,
                                                        height: 20,
                                                        backgroundColor:
                                                            'primary.main',
                                                    }}
                                                >
                                                    <CheckCircle
                                                        sx={{ fontSize: 14 }}
                                                    />
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: 2,
                                                            mb: 0.5,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontSize:
                                                                    '0.75rem',
                                                                fontWeight: 600,
                                                                color: 'primary.main',
                                                                minWidth:
                                                                    '120px',
                                                            }}
                                                        >
                                                            {item.time}
                                                        </Typography>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{
                                                                fontSize:
                                                                    '0.875rem',
                                                                fontWeight: 600,
                                                                color: 'text.primary',
                                                            }}
                                                        >
                                                            {item.activity}
                                                        </Typography>
                                                    </Box>
                                                }
                                                secondary={
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize:
                                                                '0.8125rem',
                                                            color: 'text.secondary',
                                                            lineHeight: 1.4,
                                                        }}
                                                    >
                                                        {item.description}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
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
                                variant="h3"
                                sx={{
                                    fontSize: '1.25rem',
                                    fontWeight: 600,
                                    mb: 2,
                                    color: 'text.primary',
                                }}
                            >
                                Vivez l’expérience !
                            </Typography>
                            <Paper
                                sx={{
                                    p: 2,
                                    background:
                                        'linear-gradient(135deg, #f59e0b, #16a34a)',
                                    color: 'white',
                                    borderRadius: 2,
                                    textAlign: 'center',
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '0.875rem',
                                        mb: 2,
                                        opacity: 0.9,
                                    }}
                                >
                                    Explorez vos intérêts et créez de nouvelles
                                    amitiés ! Parcourez nos activités et trouvez
                                    votre activité idéale.
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: 'white',
                                        color: 'primary.main',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        '&:hover': {
                                            backgroundColor: '#f8fafc',
                                        },
                                    }}
                                >
                                    Parcourir les activités
                                </Button>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
