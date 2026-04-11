import React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
} from '@mui/material';
import {
    School as LabIcon,
    SportsFootball as SportsIcon,
    Computer as TechIcon,
    Security as SecurityIcon,
    Tour as TourIcon,
    CalendarToday,
    CheckCircle,
} from '@mui/icons-material';

import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

// Facility category interface
interface FacilityCategory {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    image: string;
    features: string[];
    stats: { label: string; value: string }[];
}

// Données des catégories d’installations
const facilityCategories: FacilityCategory[] = [
    {
        id: 'academic',
        title: 'Installations pédagogiques',
        description:
            'Salles de classe modernes et espaces d’apprentissage conçus pour stimuler la curiosité, la créativité et la réussite scolaire.',
        icon: <LabIcon />,
        color: '#f59e0b',
        image: '/pexels-cottonbro-6208926.jpg',
        features: [
            'Salles de classe adaptées aux élèves',
            'Laboratoires scientifiques interactifs',
            'Espaces de lecture et de recherche',
            'Ateliers créatifs et technologiques',
        ],
        stats: [
            { label: 'Salles de classe', value: '45+' },
            { label: 'Postes de travail', value: '120+' },
        ],
    },
    {
        id: 'athletic',
        title: 'Complexe sportif',
        description:
            'Installations sportives complètes pour l’éducation physique, les sports collectifs, et les activités récréatives.',
        icon: <SportsIcon />,
        color: '#ef4444',
        image: '/pexels-boomheadshot-31785121.jpg',
        features: [
            'Gymnase et terrains de sport',
            'Centre de fitness',
            'Terrains extérieurs et aires de jeux',
            'Salles d’entraînement et activités encadrées',
        ],
        stats: [
            { label: 'Programmes sportifs', value: '+10' },
            { label: 'Équipements disponibles', value: '+15' },
        ],
    },
    {
        id: 'technology',
        title: 'Centre technologique',
        description:
            'Espaces informatiques et laboratoires numériques équipés pour favoriser l’apprentissage interactif et les projets créatifs.',
        icon: <TechIcon />,
        color: '#16a34a',
        image: '/pexels-dothanhyb-5530484.jpg',
        features: [
            'Atelier d’impression 3D',
            'Équipements VR/AR pour découvrir la technologie',
            'Salle de programmation et de robotique',
            'Studio multimédia et audiovisuel',
        ],
        stats: [
            { label: 'Postes informatiques', value: '+25' },
            { label: 'Logiciels disponibles', value: '+5' },
        ],
    },
    {
        id: 'support',
        title: 'Services de soutien',
        description:
            'Installations et services essentiels pour le bien-être des élèves, la sécurité et la vie quotidienne à l’école.',
        icon: <SecurityIcon />,
        color: '#10b981',
        image: '/pexels-rdne-8500421.jpg',
        features: [
            'Cantine avec repas équilibrés',
            'Service de garderie et accueil périscolaire',
            'Transport scolaire (bus)',
            'Activités périscolaires variées',
        ],
        stats: [
            { label: 'Personnel de soutien', value: '+5' },
            { label: 'Repas servis quotidiennement', value: '+2' },
        ],
    },
];

// Données détaillées des installations
const detailedFacilities = [
    {
        id: 'library',
        title: 'Bibliothèque moderne',
        description:
            'Un centre de lecture complet avec des livres, ressources numériques et espaces calmes ou collaboratifs pour tous les niveaux scolaires.',
        image: '/pexels-yaroslav-shuraev-6281132.jpg',
        features: [
            'Centre de ressources numériques avec +15 bases de données',
            'Espaces de travail individuels et en groupe',
            'Studio multimédia pour projets créatifs',
            'Soutien à la recherche et tutorat',
        ],
        stats: {
            capacity: '+10 places de lecture',
            hours: 'Ouverte 14h/jour',
        },
    },
    {
        id: 'cafeteria',
        title: 'Cantine scolaire',
        description:
            'Repas frais et équilibrés préparés chaque jour avec des ingrédients locaux. Menus adaptés aux besoins alimentaires de tous les élèves.',
        image: '/pexels-kampus-8629106.jpg',
        features: [
            'Ingrédients frais provenant de producteurs locaux',
            'Options adaptées aux allergies et régimes spéciaux',
            'Menus variés avec cuisine internationale',
            'Emballages durables et réduction des déchets',
        ],
        stats: {
            capacity: '+50 places assises',
            meals: '3 repas complets + collations par jour',
        },
    },
    {
        id: 'innovation-lab',
        title: 'Laboratoire d’innovation',
        description:
            'Un espace créatif où les élèves explorent la technologie, le design et le prototypage à travers des projets pratiques.',
        image: '/pexels-dothanhyb-5530484.jpg',
        features: [
            'Imprimantes 3D et découpe laser',
            'Postes d’électronique et de robotique',
            'Ateliers de menuiserie et fabrication',
            'Espaces collaboratifs pour projets de groupe',
        ],
        stats: {
            capacity: '+30 postes de projet',
            equipment: '+10 outils professionnels',
        },
    },
];

export const FacilitiesPage: React.FC = () => {
    const { isIntersecting: heroIntersecting, targetRef: heroRef } =
        useIntersectionObserver({
            threshold: 0.1,
            freezeOnceVisible: true,
        });

    const { isIntersecting: categoriesIntersecting, targetRef: categoriesRef } =
        useIntersectionObserver({
            threshold: 0.1,
            freezeOnceVisible: true,
        });

    const { isIntersecting: detailsIntersecting, targetRef: detailsRef } =
        useIntersectionObserver({
            threshold: 0.1,
            freezeOnceVisible: true,
        });

    return (
        <Box component="main" sx={{ backgroundColor: '#fefefe' }}>
            {/* Hero Section */}
            <Box
                id="facilities-hero"
                component="section"
                ref={heroRef}
                sx={{
                    position: 'relative',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    pt: { xs: 12, md: 14 },
                    pb: { xs: 8, md: 12 },
                    background:
                        'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    overflow: 'hidden',
                }}
            >
                {/* Background Pattern */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '50%',
                        height: '100%',
                        backgroundImage:
                            'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
                        zIndex: 1,
                    }}
                />

                <Container
                    maxWidth="lg"
                    sx={{ position: 'relative', zIndex: 2 }}
                >
                    <Grid
                        container
                        spacing={{ xs: 4, md: 8 }}
                        alignItems="center"
                    >
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    opacity: heroIntersecting ? 1 : 0,
                                    transform: heroIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(50px)',
                                    transition:
                                        'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: '0.2s',
                                }}
                            >
                                <Typography
                                    variant="overline"
                                    sx={{
                                        color: '#f59e0b',
                                        fontSize: {
                                            xs: '0.8rem',
                                            md: '0.9rem',
                                        },
                                        fontWeight: 600,
                                        letterSpacing: '0.2em',
                                        mb: 3,
                                        display: 'block',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Équipements scolaires de haut niveau
                                </Typography>

                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: {
                                            xs: '2.5rem',
                                            sm: '3rem',
                                            md: '3.5rem',
                                            lg: '4rem',
                                        },
                                        fontWeight: 700,
                                        lineHeight: 1.1,
                                        letterSpacing: '-0.02em',
                                        mb: 4,
                                        color: '#1a1a1a',
                                    }}
                                >
                                    Facilités &{' '}
                                    <Box
                                        component="span"
                                        sx={{
                                            background:
                                                'linear-gradient(135deg, #f59e0b, #16a34a)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        Ressources
                                    </Box>
                                </Typography>

                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontSize: {
                                            xs: '1.125rem',
                                            md: '1.375rem',
                                        },
                                        fontWeight: 400,
                                        lineHeight: 1.5,
                                        color: 'rgba(0, 0, 0, 0.7)',
                                        mb: 6,
                                        maxWidth: '500px',
                                    }}
                                >
                                    Explorez notre campus moderne qui stimule la
                                    curiosité, favorise l’innovation et
                                    accompagne chaque élève vers la réussite.
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: {
                                            xs: 'column',
                                            sm: 'row',
                                        },
                                        gap: 3,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        size="large"
                                        endIcon={<TourIcon />}
                                        sx={{
                                            background:
                                                'linear-gradient(135deg, #f59e0b, #16a34a)',
                                            borderRadius: 1,
                                            py: 1.5,
                                            px: 4,
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            textTransform: 'none',
                                            boxShadow:
                                                '0 4px 20px rgba(99, 102, 241, 0.3)',
                                            '&:hover': {
                                                background:
                                                    'linear-gradient(135deg, #5b5fef, #7c5def)',
                                                transform: 'translateY(-2px)',
                                                boxShadow:
                                                    '0 8px 30px rgba(99, 102, 241, 0.4)',
                                            },
                                        }}
                                    >
                                        Visitez le campus virtuellement
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        endIcon={<CalendarToday />}
                                        sx={{
                                            borderColor: '#f59e0b',
                                            color: '#f59e0b',
                                            borderRadius: 1,
                                            py: 1.5,
                                            px: 4,
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            textTransform: 'none',
                                            '&:hover': {
                                                borderColor: '#5b5fef',
                                                backgroundColor:
                                                    'rgba(99, 102, 241, 0.05)',
                                                transform: 'translateY(-2px)',
                                            },
                                        }}
                                    >
                                        Prendre rendez-vous
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    opacity: heroIntersecting ? 1 : 0,
                                    transform: heroIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(50px)',
                                    transition:
                                        'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: '0.5s',
                                }}
                            >
                                <Box
                                    sx={{
                                        aspectRatio: '4/3',
                                        borderRadius: 2,
                                        backgroundImage:
                                            'url("/pexels-cottonbro-6208926.jpg")',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background:
                                                'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)',
                                            borderRadius: 2,
                                        },
                                    }}
                                />

                                {/* Floating Stats */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 20,
                                        right: 20,
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: 2,
                                        p: 3,
                                        minWidth: '150px',
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontSize: '2rem',
                                            fontWeight: 700,
                                            color: '#f59e0b',
                                            mb: 1,
                                            lineHeight: 1,
                                        }}
                                    >
                                        +10
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '0.8125rem',
                                            fontWeight: 500,
                                            color: 'rgba(0, 0, 0, 0.8)',
                                        }}
                                    >
                                        Équipements spécialisés
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 20,
                                        left: 20,
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: 2,
                                        p: 3,
                                        minWidth: '150px',
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontSize: '2rem',
                                            fontWeight: 700,
                                            color: '#16a34a',
                                            mb: 1,
                                            lineHeight: 1,
                                        }}
                                    >
                                        +5K
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '0.8125rem',
                                            fontWeight: 500,
                                            color: 'rgba(0, 0, 0, 0.8)',
                                        }}
                                    >
                                        Superficie du campus
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Facility Categories Section */}
            <Box
                id="facility-categories"
                component="section"
                ref={categoriesRef}
                sx={{
                    py: { xs: 12, md: 20 },
                    backgroundColor: '#fefefe',
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            textAlign: 'center',
                            mb: { xs: 8, md: 12 },
                            opacity: categoriesIntersecting ? 1 : 0,
                            transform: categoriesIntersecting
                                ? 'translateY(0)'
                                : 'translateY(50px)',
                            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '0.2s',
                        }}
                    >
                        <Typography
                            variant="overline"
                            sx={{
                                color: '#16a34a',
                                fontSize: { xs: '0.8rem', md: '0.9rem' },
                                fontWeight: 600,
                                letterSpacing: '0.2em',
                                mb: 3,
                                display: 'block',
                                textTransform: 'uppercase',
                            }}
                        >
                            Découvrez nos Facilités
                        </Typography>

                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: {
                                    xs: '2rem',
                                    sm: '2.5rem',
                                    md: '3rem',
                                },
                                fontWeight: 700,
                                lineHeight: 1.2,
                                mb: 4,
                                color: '#1a1a1a',
                            }}
                        >
                            {' '}
                            <Box
                                component="span"
                                sx={{
                                    background:
                                        'linear-gradient(135deg, #f59e0b, #16a34a)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Infrastructure
                            </Box>
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: { xs: '0.875rem', md: '1rem' },
                                color: 'text.secondary',
                                maxWidth: '600px',
                                mx: 'auto',
                                lineHeight: 1.6,
                            }}
                        >
                            Découvrez notre large gamme d’installations conçues
                            pour offrir le meilleur environnement
                            d’apprentissage à chaque élève tout au long de son
                            parcours scolaire.
                        </Typography>
                    </Box>

                    <Grid container spacing={{ xs: 3, md: 4 }}>
                        {facilityCategories.map((category, index) => (
                            <Grid size={{ xs: 12, md: 6 }} key={category.id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        borderRadius: 2,
                                        boxShadow:
                                            '0 4px 20px rgba(0, 0, 0, 0.08)',
                                        transition:
                                            'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        opacity: categoriesIntersecting ? 1 : 0,
                                        transform: categoriesIntersecting
                                            ? 'translateY(0)'
                                            : 'translateY(50px)',
                                        transitionDelay: `${0.5 + index * 0.1}s`,
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow:
                                                '0 12px 40px rgba(0, 0, 0, 0.15)',
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            aspectRatio: '16/9',
                                            backgroundImage: `url("${category.image}")`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            position: 'relative',
                                            '&::after': {
                                                content: '""',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: `linear-gradient(135deg, ${category.color}20 0%, transparent 50%)`,
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 20,
                                                right: 20,
                                                width: 50,
                                                height: 50,
                                                borderRadius: '50%',
                                                background: category.color,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 2,
                                                '& svg': {
                                                    fontSize: '1.5rem',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            {category.icon}
                                        </Box>
                                    </Box>

                                    <CardContent sx={{ p: 4 }}>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontSize: '1.375rem',
                                                fontWeight: 600,
                                                mb: 2,
                                                color: '#1a1a1a',
                                            }}
                                        >
                                            {category.title}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: '0.875rem',
                                                lineHeight: 1.6,
                                                color: 'text.secondary',
                                                mb: 3,
                                            }}
                                        >
                                            {category.description}
                                        </Typography>

                                        <Box sx={{ mb: 3 }}>
                                            {category.features.map(
                                                (feature, idx) => (
                                                    <Box
                                                        key={idx}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: 1,
                                                            mb: 0.75,
                                                        }}
                                                    >
                                                        <CheckCircle
                                                            sx={{
                                                                fontSize:
                                                                    '1rem',
                                                                color: category.color,
                                                            }}
                                                        />
                                                        <Typography
                                                            sx={{
                                                                fontSize:
                                                                    '0.8125rem',
                                                                color: 'rgba(0, 0, 0, 0.8)',
                                                            }}
                                                        >
                                                            {feature}
                                                        </Typography>
                                                    </Box>
                                                )
                                            )}
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: 3,
                                                pt: 2,
                                                borderTop:
                                                    '1px solid rgba(0, 0, 0, 0.1)',
                                            }}
                                        >
                                            {category.stats.map((stat, idx) => (
                                                <Box key={idx}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '1.25rem',
                                                            fontWeight: 700,
                                                            color: category.color,
                                                            mb: 0.5,
                                                            lineHeight: 1,
                                                        }}
                                                    >
                                                        {stat.value}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.75rem',
                                                            fontWeight: 500,
                                                            color: 'rgba(0, 0, 0, 0.6)',
                                                            textTransform:
                                                                'uppercase',
                                                            letterSpacing:
                                                                '0.05em',
                                                        }}
                                                    >
                                                        {stat.label}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Detailed Facilities Section */}
            <Box
                id="facility-details"
                component="section"
                ref={detailsRef}
                sx={{
                    py: { xs: 12, md: 20 },
                    backgroundColor: '#f8fafc',
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            textAlign: 'center',
                            mb: { xs: 8, md: 12 },
                            opacity: detailsIntersecting ? 1 : 0,
                            transform: detailsIntersecting
                                ? 'translateY(0)'
                                : 'translateY(50px)',
                            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '0.2s',
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: {
                                    xs: '2rem',
                                    sm: '2.5rem',
                                    md: '3rem',
                                },
                                fontWeight: 700,
                                lineHeight: 1.2,
                                mb: 4,
                                color: '#1a1a1a',
                            }}
                        >
                            Mise en avant{' '}
                            <Box
                                component="span"
                                sx={{
                                    background:
                                        'linear-gradient(135deg, #f59e0b, #16a34a)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                de nos Facilités
                            </Box>
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                        }}
                    >
                        {detailedFacilities.map((facility, index) => (
                            <Grid
                                container
                                spacing={{ xs: 4, md: 8 }}
                                key={facility.id}
                                sx={{
                                    alignItems: 'center',
                                    opacity: detailsIntersecting ? 1 : 0,
                                    transform: detailsIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(50px)',
                                    transition:
                                        'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${0.5 + index * 0.2}s`,
                                }}
                                direction={
                                    index % 2 === 0 ? 'row' : 'row-reverse'
                                }
                            >
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box
                                        sx={{
                                            aspectRatio: '4/3',
                                            borderRadius: 2,
                                            backgroundImage: `url("${facility.image}")`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box sx={{ py: 2 }}>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontSize: '1.75rem',
                                                fontWeight: 600,
                                                mb: 3,
                                                color: '#1a1a1a',
                                            }}
                                        >
                                            {facility.title}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: '0.875rem',
                                                lineHeight: 1.6,
                                                color: 'text.secondary',
                                                mb: 4,
                                            }}
                                        >
                                            {facility.description}
                                        </Typography>

                                        <Box sx={{ mb: 4 }}>
                                            {facility.features.map(
                                                (feature, idx) => (
                                                    <Box
                                                        key={idx}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'flex-start',
                                                            gap: 1.5,
                                                            mb: 1.5,
                                                        }}
                                                    >
                                                        <CheckCircle
                                                            sx={{
                                                                fontSize:
                                                                    '1.125rem',
                                                                color: '#10b981',
                                                                mt: 0.125,
                                                            }}
                                                        />
                                                        <Typography
                                                            sx={{
                                                                fontSize:
                                                                    '0.875rem',
                                                                lineHeight: 1.5,
                                                                color: 'rgba(0, 0, 0, 0.8)',
                                                            }}
                                                        >
                                                            {feature}
                                                        </Typography>
                                                    </Box>
                                                )
                                            )}
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: {
                                                    xs: 'column',
                                                    sm: 'row',
                                                },
                                                gap: 3,
                                                pt: 3,
                                                borderTop:
                                                    '1px solid rgba(0, 0, 0, 0.1)',
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                        color: '#f59e0b',
                                                        textTransform:
                                                            'uppercase',
                                                        letterSpacing: '0.05em',
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    Capacité
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        fontWeight: 500,
                                                        color: 'rgba(0, 0, 0, 0.8)',
                                                    }}
                                                >
                                                    {facility.stats.capacity}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                        color: '#16a34a',
                                                        textTransform:
                                                            'uppercase',
                                                        letterSpacing: '0.05em',
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    Disponibilité
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        fontWeight: 500,
                                                        color: 'rgba(0, 0, 0, 0.8)',
                                                    }}
                                                >
                                                    {facility.stats.hours ||
                                                        facility.stats.meals ||
                                                        facility.stats
                                                            .equipment}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Virtual Tour Section */}
            {/* <Box
                id="virtual-tour"
                component="section"
                ref={tourRef}
                sx={{
                    py: { xs: 12, md: 20 },
                    backgroundColor: '#fefefe',
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={{ xs: 4, md: 8 }}
                        alignItems="center"
                    >
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    opacity: tourIntersecting ? 1 : 0,
                                    transform: tourIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(50px)',
                                    transition:
                                        'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: '0.2s',
                                }}
                            >
                                <Typography
                                    variant="overline"
                                    sx={{
                                        color: '#f59e0b',
                                        fontSize: {
                                            xs: '0.8rem',
                                            md: '0.9rem',
                                        },
                                        fontWeight: 600,
                                        letterSpacing: '0.2em',
                                        mb: 3,
                                        display: 'block',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Experience Our Campus
                                </Typography>

                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: {
                                            xs: '2rem',
                                            sm: '2.5rem',
                                            md: '3rem',
                                        },
                                        fontWeight: 700,
                                        lineHeight: 1.2,
                                        mb: 4,
                                        color: '#1a1a1a',
                                    }}
                                >
                                    Virtual{' '}
                                    <Box
                                        component="span"
                                        sx={{
                                            background:
                                                'linear-gradient(135deg, #f59e0b, #16a34a)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        Campus Tour
                                    </Box>
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: '0.875rem',
                                        lineHeight: 1.6,
                                        color: 'text.secondary',
                                        mb: 6,
                                    }}
                                >
                                    Take an immersive 360° tour of our campus
                                    from the comfort of your home. Explore our
                                    classrooms, laboratories, library, athletic
                                    facilities, and more through our interactive
                                    virtual experience.
                                </Typography>

                                <Button
                                    variant="contained"
                                    size="large"
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        background:
                                            'linear-gradient(135deg, #f59e0b, #16a34a)',
                                        borderRadius: 1,
                                        py: 1.5,
                                        px: 4,
                                        fontWeight: 600,
                                        fontSize: '0.875rem',
                                        textTransform: 'none',
                                        boxShadow:
                                            '0 4px 20px rgba(99, 102, 241, 0.3)',
                                        '&:hover': {
                                            background:
                                                'linear-gradient(135deg, #5b5fef, #7c5def)',
                                            transform: 'translateY(-2px)',
                                            boxShadow:
                                                '0 8px 30px rgba(99, 102, 241, 0.4)',
                                        },
                                    }}
                                >
                                    Start Virtual Tour
                                </Button>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    opacity: tourIntersecting ? 1 : 0,
                                    transform: tourIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(50px)',
                                    transition:
                                        'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: '0.5s',
                                }}
                            >
                                <Card
                                    sx={{
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        boxShadow:
                                            '0 20px 60px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            aspectRatio: '16/10',
                                            backgroundImage:
                                                'url("/pexels-yaroslav-shuraev-6281132.jpg")',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            position: 'relative',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            '&::after': {
                                                content: '""',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background:
                                                    'rgba(0, 0, 0, 0.3)',
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                zIndex: 2,
                                                width: 80,
                                                height: 80,
                                                borderRadius: '50%',
                                                background:
                                                    'rgba(255, 255, 255, 0.9)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.1)',
                                                    background: 'white',
                                                },
                                            }}
                                        >
                                            <TourIcon
                                                sx={{
                                                    fontSize: '2rem',
                                                    color: '#f59e0b',
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Card>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box> */}

            {/* Facility Booking Section */}
            {/* <Box
                id="facility-booking"
                component="section"
                ref={bookingRef}
                sx={{
                    py: { xs: 12, md: 20 },
                    backgroundColor: '#f8fafc',
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            textAlign: 'center',
                            opacity: bookingIntersecting ? 1 : 0,
                            transform: bookingIntersecting
                                ? 'translateY(0)'
                                : 'translateY(50px)',
                            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '0.2s',
                        }}
                    >
                        <Typography
                            variant="overline"
                            sx={{
                                color: '#16a34a',
                                fontSize: { xs: '0.8rem', md: '0.9rem' },
                                fontWeight: 600,
                                letterSpacing: '0.2em',
                                mb: 3,
                                display: 'block',
                                textTransform: 'uppercase',
                            }}
                        >
                            Book Our Facilities
                        </Typography>

                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: {
                                    xs: '2rem',
                                    sm: '2.5rem',
                                    md: '3rem',
                                },
                                fontWeight: 700,
                                lineHeight: 1.2,
                                mb: 4,
                                color: '#1a1a1a',
                            }}
                        >
                            Facility{' '}
                            <Box
                                component="span"
                                sx={{
                                    background:
                                        'linear-gradient(135deg, #f59e0b, #16a34a)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Reservations
                            </Box>
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: { xs: '0.875rem', md: '1rem' },
                                color: 'text.secondary',
                                maxWidth: '600px',
                                mx: 'auto',
                                lineHeight: 1.6,
                                mb: 8,
                            }}
                        >
                            Need to reserve a facility for events, meetings, or
                            special occasions? Our online booking system makes
                            it easy to check availability and secure your space.
                        </Typography>

                        <Grid
                            container
                            spacing={{ xs: 3, md: 4 }}
                            sx={{ mb: 8 }}
                        >
                            {[
                                {
                                    icon: <BookingIcon />,
                                    title: 'Easy Booking',
                                    description:
                                        'Simple online reservation system',
                                },
                                {
                                    icon: <CalendarToday />,
                                    title: 'Real-time Availability',
                                    description: 'Check availability instantly',
                                },
                                {
                                    icon: <CheckCircle />,
                                    title: 'Instant Confirmation',
                                    description:
                                        'Get immediate booking confirmation',
                                },
                            ].map((feature, index) => (
                                <Grid size={{ xs: 12, md: 4 }} key={index}>
                                    <Card
                                        sx={{
                                            p: 4,
                                            textAlign: 'center',
                                            borderRadius: 2,
                                            boxShadow:
                                                '0 4px 20px rgba(0, 0, 0, 0.08)',
                                            opacity: bookingIntersecting
                                                ? 1
                                                : 0,
                                            transform: bookingIntersecting
                                                ? 'translateY(0)'
                                                : 'translateY(50px)',
                                            transition:
                                                'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                            transitionDelay: `${0.5 + index * 0.1}s`,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: '50%',
                                                background:
                                                    'linear-gradient(135deg, #f59e0b, #16a34a)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mx: 'auto',
                                                mb: 3,
                                                '& svg': {
                                                    fontSize: '1.5rem',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            {feature.icon}
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: '1.125rem',
                                                fontWeight: 600,
                                                mb: 2,
                                                color: '#1a1a1a',
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '0.875rem',
                                                color: 'text.secondary',
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            {feature.description}
                                        </Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<BookingIcon />}
                            sx={{
                                background:
                                    'linear-gradient(135deg, #f59e0b, #16a34a)',
                                borderRadius: 1,
                                py: 1.5,
                                px: 4,
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                textTransform: 'none',
                                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
                                opacity: bookingIntersecting ? 1 : 0,
                                transform: bookingIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(30px)',
                                transition:
                                    'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: '0.8s',
                                '&:hover': {
                                    background:
                                        'linear-gradient(135deg, #5b5fef, #7c5def)',
                                    transform: 'translateY(-2px)',
                                    boxShadow:
                                        '0 8px 30px rgba(99, 102, 241, 0.4)',
                                },
                            }}
                        >
                            Reserve Facilities
                        </Button>
                    </Box>
                </Container>
            </Box> */}

            {/* Contact Section */}
            {/* <Box
                id="facilities-contact"
                component="section"
                ref={contactRef}
                sx={{
                    py: { xs: 12, md: 20 },
                    backgroundColor: '#fefefe',
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={{ xs: 4, md: 8 }}
                        alignItems="center"
                    >
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Box
                                sx={{
                                    opacity: contactIntersecting ? 1 : 0,
                                    transform: contactIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(50px)',
                                    transition:
                                        'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: '0.2s',
                                }}
                            >
                                <Typography
                                    variant="overline"
                                    sx={{
                                        color: '#10b981',
                                        fontSize: {
                                            xs: '0.8rem',
                                            md: '0.9rem',
                                        },
                                        fontWeight: 600,
                                        letterSpacing: '0.2em',
                                        mb: 3,
                                        display: 'block',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Have Questions?
                                </Typography>

                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: {
                                            xs: '2rem',
                                            sm: '2.5rem',
                                            md: '3rem',
                                        },
                                        fontWeight: 700,
                                        lineHeight: 1.2,
                                        mb: 4,
                                        color: '#1a1a1a',
                                    }}
                                >
                                    Contact Our{' '}
                                    <Box
                                        component="span"
                                        sx={{
                                            background:
                                                'linear-gradient(135deg, #10b981, #059669)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        Facilities Team
                                    </Box>
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: '0.875rem',
                                        lineHeight: 1.6,
                                        color: 'text.secondary',
                                        mb: 6,
                                        maxWidth: '500px',
                                    }}
                                >
                                    Our facilities management team is here to
                                    help with any questions about our campus
                                    infrastructure, booking procedures, or
                                    accessibility services.
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: {
                                            xs: 'column',
                                            sm: 'row',
                                        },
                                        gap: 3,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        size="large"
                                        endIcon={<ContactIcon />}
                                        sx={{
                                            background:
                                                'linear-gradient(135deg, #10b981, #059669)',
                                            borderRadius: 1,
                                            py: 1.5,
                                            px: 4,
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            textTransform: 'none',
                                            boxShadow:
                                                '0 4px 20px rgba(16, 185, 129, 0.3)',
                                            '&:hover': {
                                                background:
                                                    'linear-gradient(135deg, #059669, #047857)',
                                                transform: 'translateY(-2px)',
                                                boxShadow:
                                                    '0 8px 30px rgba(16, 185, 129, 0.4)',
                                            },
                                        }}
                                    >
                                        Contact Facilities
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        endIcon={<ArrowForward />}
                                        sx={{
                                            borderColor: '#10b981',
                                            color: '#10b981',
                                            borderRadius: 1,
                                            py: 1.5,
                                            px: 4,
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            textTransform: 'none',
                                            '&:hover': {
                                                borderColor: '#059669',
                                                backgroundColor:
                                                    'rgba(16, 185, 129, 0.05)',
                                                transform: 'translateY(-2px)',
                                            },
                                        }}
                                    >
                                        Request Information
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card
                                sx={{
                                    p: 4,
                                    borderRadius: 2,
                                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                                    opacity: contactIntersecting ? 1 : 0,
                                    transform: contactIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(50px)',
                                    transition:
                                        'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: '0.5s',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 600,
                                        mb: 3,
                                        color: '#1a1a1a',
                                    }}
                                >
                                    Quick Contact
                                </Typography>

                                <Box sx={{ mb: 3 }}>
                                    <Typography
                                        sx={{
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            color: '#10b981',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            mb: 1,
                                        }}
                                    >
                                        Phone
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '0.875rem',
                                            color: 'rgba(0, 0, 0, 0.8)',
                                            mb: 2,
                                        }}
                                    >
                                        (555) 123-4567
                                    </Typography>
                                </Box>

                                <Box sx={{ mb: 3 }}>
                                    <Typography
                                        sx={{
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            color: '#10b981',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            mb: 1,
                                        }}
                                    >
                                        Email
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '0.875rem',
                                            color: 'rgba(0, 0, 0, 0.8)',
                                            mb: 2,
                                        }}
                                    >
                                        facilities@excellenceacademy.edu
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            color: '#10b981',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            mb: 1,
                                        }}
                                    >
                                        Office Hours
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '0.875rem',
                                            color: 'rgba(0, 0, 0, 0.8)',
                                        }}
                                    >
                                        Monday - Friday: 8:00 AM - 5:00 PM
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box> */}
        </Box>
    );
};
