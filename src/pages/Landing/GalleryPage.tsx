import {
    School as AcademicIcon,
    WorkspacePremium as AlumniIcon,
    Close as CloseIcon,
    Event as EventIcon,
    FavoriteBorder as FavoriteBorderIcon,
    Favorite as FavoriteIcon,
    KeyboardArrowRight as NextIcon,
    PhotoLibrary as PhotoIcon,
    KeyboardArrowLeft as PrevIcon,
    Search as SearchIcon,
    SportsBasketball as SportsIcon,
    Groups as StudentIcon,
} from '@mui/icons-material';
import {
    Box,
    Card,
    CardMedia,
    Chip,
    Container,
    Dialog,
    DialogContent,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

// Types
interface Photo {
    id: string;
    src: string;
    alt: string;
    title: string;
    description: string;
    date: string;
    category: PhotoCategory;
    tags: string[];
    featured?: boolean;
}

type PhotoCategory =
    | 'academic'
    | 'athletics'
    | 'events'
    | 'campus'
    | 'student-activities'
    | 'alumni';

interface PhotoStats {
    totalPhotos: number;
    categories: number;
    events: number;
    years: number;
}

// Custom hook for lazy loading images with error handling
// const useLazyImage = (src: string, alt: string) => {
//     const [imageSrc, setImageSrc] = useState<string>('');
//     const [, setImageRef] = useState<HTMLElement | null>(null);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [hasError, setHasError] = useState(false);

//     const { isIntersecting } = useIntersectionObserver({
//         threshold: 0.1,
//         freezeOnceVisible: true,
//     });

//     useEffect(() => {
//         if (isIntersecting && !imageSrc && !hasError) {
//             const img = new Image();
//             img.onload = () => {
//                 setImageSrc(src);
//                 setIsLoaded(true);
//             };
//             img.onerror = () => {
//                 setHasError(true);
//             };
//             img.src = src;
//         }
//     }, [isIntersecting, src, imageSrc, hasError]);

//     const imgRef = useCallback((node: HTMLElement | null) => {
//         if (node) {
//             setImageRef(node);
//         }
//     }, []);

//     return {
//         imgRef,
//         imageSrc,
//         isLoaded,
//         hasError,
//         targetRef: setImageRef,
//     };
// };

// Category configuration
const categories = [
    { id: 'all', label: 'Toutes les photos', icon: PhotoIcon },
    { id: 'academic', label: 'Vie scolaire', icon: AcademicIcon },
    { id: 'athletics', label: 'Sports', icon: SportsIcon },
    { id: 'events', label: 'Événements scolaires', icon: EventIcon },
    { id: 'campus', label: 'Vie sur le campus', icon: StudentIcon },
    {
        id: 'student-activities',
        label: 'Activités des élèves',
        icon: StudentIcon,
    },
    { id: 'alumni', label: 'Anciens élèves & communauté', icon: AlumniIcon },
] as const;

// Mock data - In real app, this would come from API
const mockPhotos: Photo[] = [
    {
        id: '1',
        src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
        alt: 'Élèves en classe',
        title: 'Séance d’apprentissage interactive',
        description:
            'Des élèves participent à un apprentissage collaboratif pendant un cours de sciences',
        date: '2025-03-15',
        category: 'academic',
        tags: ['classe', 'sciences', 'collaboration'],
        featured: true,
    },
    {
        id: '2',
        src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        alt: 'Match de basketball',
        title: 'Finale de basketball',
        description:
            'Finale annuelle du championnat de basketball entre écoles',
        date: '2025-02-07',
        category: 'athletics',
        tags: ['basketball', 'championnat', 'sport'],
    },
    {
        id: '3',
        src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop',
        alt: 'Remise de diplômes',
        title: 'Cérémonie de fin d’année 2025',
        description: 'Célébration des réussites de nos élèves',
        date: '2025-06-10',
        category: 'events',
        tags: ['remise', 'cérémonie', 'réussite'],
    },
    {
        id: '4',
        src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop',
        alt: 'Bibliothèque scolaire',
        title: 'Bibliothèque moderne',
        description:
            'Des élèves utilisent les ressources de la bibliothèque pour étudier',
        date: '2025-01-10',
        category: 'campus',
        tags: ['bibliothèque', 'étude', 'installations'],
    },
    {
        id: '5',
        src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
        alt: 'Spectacle de théâtre',
        title: 'Spectacle de théâtre annuel',
        description: 'Des élèves participent à une production théâtrale',
        date: '2024-12-18',
        category: 'student-activities',
        tags: ['théâtre', 'spectacle', 'activité'],
    },
    {
        id: '6',
        src: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&h=600&fit=crop',
        alt: 'Rencontre des anciens élèves',
        title: 'Retrouvailles des anciens élèves 2025',
        description: 'Rencontre des anciens élèves lors de l’événement annuel',
        date: '2025-10-15',
        category: 'alumni',
        tags: ['anciens', 'rencontre', 'événement'],
    },
    {
        id: '7',
        src: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop',
        alt: 'Laboratoire de sciences',
        title: 'Laboratoire de chimie',
        description:
            'Des élèves réalisent des expériences dans un laboratoire moderne',
        date: '2025-02-05',
        category: 'academic',
        tags: ['chimie', 'laboratoire', 'expérience'],
    },
    {
        id: '8',
        src: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop',
        alt: 'Match de football',
        title: 'Tournoi de football interscolaire',
        description: 'Match intense lors d’un tournoi régional',
        date: '2025-02-09',
        category: 'athletics',
        tags: ['football', 'tournoi', 'compétition'],
    },
];

const photoStats: PhotoStats = {
    totalPhotos: +20,
    categories: +6,
    events: +10,
    years: +5,
};

export const GalleryPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const { isIntersecting: heroIntersecting, targetRef: heroRef } =
        useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });

    const { isIntersecting: filtersIntersecting, targetRef: filtersRef } =
        useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });

    const { isIntersecting: gridIntersecting, targetRef: gridRef } =
        useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });

    // Filter photos based on category and search
    const filteredPhotos = useMemo(() => {
        return mockPhotos.filter(photo => {
            const matchesCategory =
                selectedCategory === 'all' ||
                photo.category === selectedCategory;
            const matchesSearch =
                searchQuery === '' ||
                photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                photo.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                photo.tags.some(tag =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase())
                );

            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const handlePhotoClick = useCallback(
        (photo: Photo) => {
            setSelectedPhoto(photo);
            setCurrentPhotoIndex(
                filteredPhotos.findIndex(p => p.id === photo.id)
            );
            setLightboxOpen(true);
        },
        [filteredPhotos]
    );

    const handleNextPhoto = useCallback(() => {
        const nextIndex =
            currentPhotoIndex < filteredPhotos.length - 1
                ? currentPhotoIndex + 1
                : 0;
        setCurrentPhotoIndex(nextIndex);
        setSelectedPhoto(filteredPhotos[nextIndex]);
    }, [currentPhotoIndex, filteredPhotos]);

    const handlePrevPhoto = useCallback(() => {
        const prevIndex =
            currentPhotoIndex > 0
                ? currentPhotoIndex - 1
                : filteredPhotos.length - 1;
        setCurrentPhotoIndex(prevIndex);
        setSelectedPhoto(filteredPhotos[prevIndex]);
    }, [currentPhotoIndex, filteredPhotos]);

    const handleCloseLightbox = useCallback(() => {
        setLightboxOpen(false);
        setSelectedPhoto(null);
    }, []);

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!lightboxOpen) return;

            switch (event.key) {
                case 'Escape':
                    handleCloseLightbox();
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    if (filteredPhotos.length > 1) {
                        handlePrevPhoto();
                    }
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    if (filteredPhotos.length > 1) {
                        handleNextPhoto();
                    }
                    break;
                default:
                    break;
            }
        };

        if (lightboxOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // Prevent body scroll when lightbox is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [
        lightboxOpen,
        filteredPhotos.length,
        handleCloseLightbox,
        handlePrevPhoto,
        handleNextPhoto,
    ]);

    const toggleFavorite = useCallback((photoId: string) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(photoId)) {
                newFavorites.delete(photoId);
            } else {
                newFavorites.add(photoId);
            }
            return newFavorites;
        });
    }, []);

    // const handleCategorySelect = useCallback((categoryId: string) => {
    //     setSelectedCategory(categoryId);
    // }, []);

    // const handleSearchChange = useCallback(
    //     (event: React.ChangeEvent<HTMLInputElement>) => {
    //         setSearchQuery(event.target.value);
    //     },
    //     []
    // );

    const featuredPhoto = useMemo(
        () => mockPhotos.find(photo => photo.featured),
        []
    );

    return (
        <Box component="main" sx={{ backgroundColor: '#fefefe' }}>
            {/* Hero Section */}
            <Box
                ref={heroRef}
                component="section"
                sx={{
                    position: 'relative',
                    pt: { xs: 12, md: 14 },
                    pb: { xs: 8, md: 12 },
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: 'white',
                    overflow: 'hidden',
                    opacity: heroIntersecting ? 1 : 0,
                    transform: heroIntersecting
                        ? 'translateY(0)'
                        : 'translateY(30px)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                {/* Background Pattern */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                                   radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
                                   radial-gradient(circle at 40% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`,
                        zIndex: 1,
                    }}
                />

                <Container
                    maxWidth="lg"
                    sx={{ position: 'relative', zIndex: 2 }}
                >
                    <Grid container spacing={4} alignItems="center">
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '2rem', md: '3rem' },
                                    fontWeight: 700,
                                    mb: 2,
                                    lineHeight: 1.2,
                                }}
                            >
                                Galerie de photos
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    opacity: 0.9,
                                    mb: 4,
                                    fontSize: { xs: '1rem', md: '1.125rem' },
                                    lineHeight: 1.6,
                                }}
                            >
                                Capturer des moments, préserver des souvenirs et
                                célébrer notre communauté scolaire dynamique à
                                travers de magnifiques photographies.
                            </Typography>

                            {/* Statistics */}
                            <Grid container spacing={3} sx={{ mt: 2 }}>
                                <Grid size={{ xs: 6, sm: 3 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: {
                                                    xs: '1.5rem',
                                                    md: '2rem',
                                                },
                                            }}
                                        >
                                            {photoStats.totalPhotos}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                opacity: 0.8,
                                                fontSize: '0.8125rem',
                                            }}
                                        >
                                            Photos 
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 6, sm: 3 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: {
                                                    xs: '1.5rem',
                                                    md: '2rem',
                                                },
                                            }}
                                        >
                                            {photoStats.categories}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                opacity: 0.8,
                                                fontSize: '0.8125rem',
                                            }}
                                        >
                                            Catégories
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 6, sm: 3 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: {
                                                    xs: '1.5rem',
                                                    md: '2rem',
                                                },
                                            }}
                                        >
                                            {photoStats.events}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                opacity: 0.8,
                                                fontSize: '0.8125rem',
                                            }}
                                        >
                                            Événements couverts
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 6, sm: 3 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: {
                                                    xs: '1.5rem',
                                                    md: '2rem',
                                                },
                                            }}
                                        >
                                            {photoStats.years}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                opacity: 0.8,
                                                fontSize: '0.8125rem',
                                            }}
                                        >
                                            Années d’histoire
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Featured Photo Preview */}
                        {featuredPhoto && (
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Card
                                    sx={{
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        border: '2px solid rgba(255, 255, 255, 0.2)',
                                        cursor: 'pointer',
                                        transition:
                                            'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            border: '2px solid rgba(255, 255, 255, 0.4)',
                                        },
                                    }}
                                    onClick={() =>
                                        handlePhotoClick(featuredPhoto)
                                    }
                                >
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image={featuredPhoto.src}
                                        alt={featuredPhoto.alt}
                                    />
                                    <Box
                                        sx={{
                                            p: 2,
                                            backgroundColor: 'white',
                                            color: 'text.primary',
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ fontWeight: 600 }}
                                        >
                                            Featured: {featuredPhoto.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: '0.8125rem',
                                            }}
                                        >
                                            {featuredPhoto.description}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </Box>

            {/* Filters and Search */}
            <Box
                ref={filtersRef}
                component="section"
                sx={{
                    py: { xs: 6, md: 8 },
                    backgroundColor: '#f8fafc',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    opacity: filtersIntersecting ? 1 : 0,
                    transform: filtersIntersecting
                        ? 'translateY(0)'
                        : 'translateY(20px)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                }}
            >
                <Container maxWidth="lg">
                    {/* Search Bar */}
                    <Box
                        sx={{
                            mb: 4,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <TextField
                            placeholder="Search photos by title, description, or tags..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            sx={{
                                width: '100%',
                                maxWidth: 600,
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'white',
                                },
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color="action" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Box>

                    {/* Category Filters */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            justifyContent: 'center',
                        }}
                    >
                        {categories.map((category, index) => {
                            const IconComponent = category.icon;
                            const isSelected = selectedCategory === category.id;

                            return (
                                <Chip
                                    key={category.id}
                                    label={category.label}
                                    icon={<IconComponent fontSize="small" />}
                                    onClick={() =>
                                        setSelectedCategory(category.id)
                                    }
                                    color={isSelected ? 'primary' : 'default'}
                                    variant={isSelected ? 'filled' : 'outlined'}
                                    sx={{
                                        fontSize: '0.8125rem',
                                        fontWeight: 500,
                                        height: 36,
                                        transition:
                                            'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                        transitionDelay: `${index * 0.05}s`,
                                        opacity: filtersIntersecting ? 1 : 0,
                                        transform: filtersIntersecting
                                            ? 'translateY(0)'
                                            : 'translateY(10px)',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                />
                            );
                        })}
                    </Box>

                    {/* Results Count */}
                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: 'center',
                            mt: 3,
                            color: 'text.secondary',
                            fontSize: '0.8125rem',
                        }}
                    >
                        Montrez {filteredPhotos.length} photo
                        {filteredPhotos.length !== 1 ? 's' : ''}
                        {selectedCategory !== 'all' && (
                            <>
                                {' '}
                                in{' '}
                                {
                                    categories.find(
                                        c => c.id === selectedCategory
                                    )?.label
                                }
                            </>
                        )}
                        {searchQuery && <> matching "{searchQuery}"</>}
                    </Typography>
                </Container>
            </Box>

            {/* Photo Grid */}
            <Box
                ref={gridRef}
                component="section"
                sx={{
                    py: { xs: 8, md: 12 },
                    backgroundColor: '#fefefe',
                    opacity: gridIntersecting ? 1 : 0,
                    transform: gridIntersecting
                        ? 'translateY(0)'
                        : 'translateY(30px)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
                }}
            >
                <Container maxWidth="lg">
                    {filteredPhotos.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <PhotoIcon
                                sx={{
                                    fontSize: 64,
                                    color: 'text.disabled',
                                    mb: 2,
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{ mb: 1, color: 'text.secondary' }}
                            >
                               Aucune photo trouvée
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.disabled',
                                    fontSize: '0.8125rem',
                                }}
                            >
                                Essayez d’ajuster votre recherche
                            </Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={3}>
                            {filteredPhotos.map((photo, index) => (
                                <Grid
                                    size={{ xs: 12, sm: 6, md: 4 }}
                                    key={photo.id}
                                >
                                    <Card
                                        sx={{
                                            position: 'relative',
                                            overflow: 'hidden',
                                            borderRadius: 2,
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            cursor: 'pointer',
                                            transition:
                                                'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            transitionDelay: `${index * 0.05}s`,
                                            opacity: gridIntersecting ? 1 : 0,
                                            transform: gridIntersecting
                                                ? 'translateY(0)'
                                                : 'translateY(20px)',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                borderColor: 'primary.main',
                                                '& .photo-overlay': {
                                                    opacity: 1,
                                                },
                                                '& .photo-image': {
                                                    transform: 'scale(1.05)',
                                                },
                                            },
                                        }}
                                        onClick={() => handlePhotoClick(photo)}
                                    >
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="240"
                                                image={photo.src}
                                                alt={photo.alt}
                                                className="photo-image"
                                                sx={{
                                                    transition:
                                                        'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    objectFit: 'cover',
                                                }}
                                            />

                                            {/* Hover Overlay */}
                                            <Box
                                                className="photo-overlay"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    background:
                                                        'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8))',
                                                    opacity: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transition:
                                                        'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        color: 'white',
                                                        fontWeight: 600,
                                                        textAlign: 'center',
                                                        fontSize: '0.875rem',
                                                    }}
                                                >
                                                    Voir les photos
                                                </Typography>
                                            </Box>

                                            {/* Favorite Button */}
                                            <Fab
                                                size="small"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    right: 8,
                                                    backgroundColor: 'white',
                                                    width: 32,
                                                    height: 32,
                                                    minHeight: 32,
                                                    '&:hover': {
                                                        backgroundColor:
                                                            'grey.100',
                                                    },
                                                }}
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    toggleFavorite(photo.id);
                                                }}
                                            >
                                                {favorites.has(photo.id) ? (
                                                    <FavoriteIcon
                                                        sx={{
                                                            fontSize: 16,
                                                            color: 'error.main',
                                                        }}
                                                    />
                                                ) : (
                                                    <FavoriteBorderIcon
                                                        sx={{
                                                            fontSize: 16,
                                                            color: 'text.secondary',
                                                        }}
                                                    />
                                                )}
                                            </Fab>
                                        </Box>

                                        {/* Photo Info */}
                                        <Box sx={{ p: 2 }}>
                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    fontWeight: 600,
                                                    mb: 0.5,
                                                    fontSize: '0.875rem',
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {photo.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'text.secondary',
                                                    mb: 1,
                                                    fontSize: '0.8125rem',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {photo.description}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: 'primary.main',
                                                    fontWeight: 500,
                                                    fontSize: '0.75rem',
                                                }}
                                            >
                                                {new Date(
                                                    photo.date
                                                ).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </Typography>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>
            </Box>

            {/* Lightbox Modal */}
            <Dialog
                open={lightboxOpen}
                onClose={handleCloseLightbox}
                maxWidth={false}
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        margin: 0,
                        maxWidth: 'none',
                        maxHeight: 'none',
                        width: '100%',
                        height: '100%',
                        borderRadius: 0,
                    },
                }}
            >
                <DialogContent
                    sx={{
                        p: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        height: '100vh',
                    }}
                >
                    {selectedPhoto && (
                        <>
                            {/* Close Button */}
                            <IconButton
                                onClick={handleCloseLightbox}
                                sx={{
                                    position: 'absolute',
                                    top: 16,
                                    right: 16,
                                    color: 'white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    zIndex: 1300,
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    },
                                }}
                            >
                                <CloseIcon />
                            </IconButton>

                            {/* Navigation Buttons */}
                            {filteredPhotos.length > 1 && (
                                <>
                                    <IconButton
                                        onClick={handlePrevPhoto}
                                        sx={{
                                            position: 'absolute',
                                            left: 16,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: 'white',
                                            backgroundColor:
                                                'rgba(0, 0, 0, 0.5)',
                                            zIndex: 1300,
                                            '&:hover': {
                                                backgroundColor:
                                                    'rgba(0, 0, 0, 0.7)',
                                            },
                                        }}
                                    >
                                        <PrevIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={handleNextPhoto}
                                        sx={{
                                            position: 'absolute',
                                            right: 16,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: 'white',
                                            backgroundColor:
                                                'rgba(0, 0, 0, 0.5)',
                                            zIndex: 1300,
                                            '&:hover': {
                                                backgroundColor:
                                                    'rgba(0, 0, 0, 0.7)',
                                            },
                                        }}
                                    >
                                        <NextIcon />
                                    </IconButton>
                                </>
                            )}

                            {/* Main Image */}
                            <Box
                                sx={{
                                    maxWidth: 'calc(100% - 120px)',
                                    maxHeight: 'calc(100% - 120px)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <img
                                    src={selectedPhoto.src}
                                    alt={selectedPhoto.alt}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: 'calc(100vh - 200px)',
                                        objectFit: 'contain',
                                        borderRadius: 4,
                                    }}
                                />

                                {/* Photo Information */}
                                <Box
                                    sx={{
                                        mt: 3,
                                        textAlign: 'center',
                                        color: 'white',
                                        maxWidth: 600,
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 1,
                                            fontSize: {
                                                xs: '1.125rem',
                                                md: '1.25rem',
                                            },
                                        }}
                                    >
                                        {selectedPhoto.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            opacity: 0.9,
                                            fontSize: '0.875rem',
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {selectedPhoto.description}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            opacity: 0.7,
                                            fontSize: '0.8125rem',
                                        }}
                                    >
                                        {new Date(
                                            selectedPhoto.date
                                        ).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                        {' • '}
                                        {
                                            categories.find(
                                                c =>
                                                    c.id ===
                                                    selectedPhoto.category
                                            )?.label
                                        }
                                        {filteredPhotos.length > 1 && (
                                            <>
                                                {' • '}
                                                {currentPhotoIndex + 1} of{' '}
                                                {filteredPhotos.length}
                                            </>
                                        )}
                                    </Typography>
                                </Box>
                            </Box>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};
