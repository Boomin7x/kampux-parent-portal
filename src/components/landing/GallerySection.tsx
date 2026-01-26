import {
    School as AcademicsIcon,
    Palette as ArtsIcon,
    LocationCity as CampusIcon,
    Close as CloseIcon,
    Celebration as EventsIcon,
    FilterList as FilterIcon,
    Collections as GalleryIcon,
    ArrowForwardIos as NextIcon,
    ArrowBackIos as PrevIcon,
    Sports as SportsIcon,
} from '@mui/icons-material';
import {
    Backdrop,
    Box,
    Button,
    Chip,
    IconButton,
    Modal,
    Typography,
    alpha,
    useTheme,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

// Gallery item interface
interface GalleryItem {
    id: string;
    title: string;
    description: string;
    category: 'sports' | 'arts' | 'academics' | 'events' | 'campus';
    image: string;
    date: string;
    tags: string[];
    featured?: boolean;
}

// Category configuration
const categories = [
    {
        id: 'all',
        label: 'All Moments',
        icon: <GalleryIcon />,
        color: '#6366f1',
    },
    {
        id: 'sports',
        label: 'Athletic Excellence',
        icon: <SportsIcon />,
        color: '#ef4444',
    },
    {
        id: 'arts',
        label: 'Creative Arts',
        icon: <ArtsIcon />,
        color: '#ec4899',
    },
    {
        id: 'academics',
        label: 'Academic Achievement',
        icon: <AcademicsIcon />,
        color: '#10b981',
    },
    {
        id: 'events',
        label: 'Special Events',
        icon: <EventsIcon />,
        color: '#f59e0b',
    },
    {
        id: 'campus',
        label: 'Campus Life',
        icon: <CampusIcon />,
        color: '#8b5cf6',
    },
];

// Gallery Section props
interface GallerySectionProps {
    className?: string;
}

// Sample gallery data
const galleryItems: GalleryItem[] = [
    {
        id: 'championship-victory',
        title: 'State Championship Victory',
        description:
            'Our basketball team celebrates their incredible state championship win after an undefeated season.',
        category: 'sports',
        image: '/pexels-cics-uma-ipn-238541486-12238968.jpg',
        date: 'March 2024',
        tags: ['Basketball', 'Championship', 'Victory'],
        featured: true,
    },
    {
        id: 'science-fair',
        title: 'Annual Science Fair Excellence',
        description:
            'Students showcase their innovative research projects at our prestigious annual science fair.',
        category: 'academics',
        image: '/pexels-cottonbro-6208926.jpg',
        date: 'February 2024',
        tags: ['Science', 'Research', 'Innovation'],
        featured: true,
    },
    {
        id: 'theater-production',
        title: 'Spring Musical Production',
        description:
            "A magical evening of theater featuring our talented students in this year's spring musical.",
        category: 'arts',
        image: '/raymond-yeung-uwhDZbX-sz8-unsplash.jpg',
        date: 'April 2024',
        tags: ['Theater', 'Music', 'Performance'],
        featured: true,
    },
    {
        id: 'graduation-ceremony',
        title: 'Graduation Celebration',
        description:
            'Celebrating our graduating seniors as they embark on their next chapter of academic excellence.',
        category: 'events',
        image: '/pexels-kampus-8629106.jpg',
        date: 'June 2024',
        tags: ['Graduation', 'Achievement', 'Success'],
    },
    {
        id: 'library-study',
        title: 'Modern Learning Spaces',
        description:
            'Students collaborating in our state-of-the-art library with cutting-edge technology.',
        category: 'campus',
        image: '/pexels-yaroslav-shuraev-6281132.jpg',
        date: 'January 2024',
        tags: ['Library', 'Study', 'Collaboration'],
    },
    {
        id: 'tech-innovation',
        title: 'Technology Lab Innovation',
        description:
            'Students working on advanced robotics and coding projects in our innovation lab.',
        category: 'academics',
        image: '/pexels-dothanhyb-5530484.jpg',
        date: 'March 2024',
        tags: ['Technology', 'Robotics', 'Innovation'],
    },
    {
        id: 'athletic-training',
        title: 'Athletic Training Excellence',
        description:
            'Our dedicated athletes training in world-class facilities to achieve their personal best.',
        category: 'sports',
        image: '/pexels-boomheadshot-31785121.jpg',
        date: 'February 2024',
        tags: ['Training', 'Fitness', 'Excellence'],
    },
    {
        id: 'campus-security',
        title: 'Safe Learning Environment',
        description:
            'Our comprehensive security measures ensure a safe and nurturing learning environment.',
        category: 'campus',
        image: '/pexels-rdne-8500421.jpg',
        date: 'Ongoing',
        tags: ['Safety', 'Security', 'Environment'],
    },
    {
        id: 'leadership-conference',
        title: 'Student Leadership Summit',
        description:
            'Student leaders gathering to discuss initiatives and drive positive change in our school community.',
        category: 'events',
        image: '/azzedine-rouichi-KDM09YR4_bY-unsplash.jpg',
        date: 'May 2024',
        tags: ['Leadership', 'Community', 'Initiative'],
    },
    {
        id: 'stem-competition',
        title: 'STEM Competition Victory',
        description:
            'Our STEM team celebrating their victory at the regional science and engineering competition.',
        category: 'academics',
        image: '/patrick-amoy-6DfEbkqsTiA-unsplash.jpg',
        date: 'April 2024',
        tags: ['STEM', 'Competition', 'Engineering'],
    },
];

// Main Gallery Section component
export const GallerySection: React.FC<GallerySectionProps> = ({
    className = '',
}) => {
    const theme = useTheme();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(
        null
    );

    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    // Filter items based on selected category
    const filteredItems = useMemo(() => {
        if (selectedCategory === 'all') {
            return galleryItems;
        }
        return galleryItems.filter(item => item.category === selectedCategory);
    }, [selectedCategory]);

    // Featured items for the top section
    const featuredItems = galleryItems.filter(item => item.featured);

    const handleImageClick = (item: GalleryItem) => {
        setSelectedImage(item);
        setLightboxOpen(true);
    };

    const handleCloseLightbox = () => {
        setLightboxOpen(false);
        setSelectedImage(null);
    };

    const handlePrevImage = () => {
        const currentIndex = filteredItems.findIndex(
            item => item.id === selectedImage?.id
        );
        const prevIndex =
            currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
        setSelectedImage(filteredItems[prevIndex]);
    };

    const handleNextImage = () => {
        const currentIndex = filteredItems.findIndex(
            item => item.id === selectedImage?.id
        );
        const nextIndex =
            currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
        setSelectedImage(filteredItems[nextIndex]);
    };

    return (
        <Box
            id="gallery"
            component="section"
            className={className}
            ref={targetRef}
            sx={{
                position: 'relative',
                py: { xs: 12, md: 20 },
                backgroundColor: '#f8fafc',
                overflow: 'hidden',
            }}
        >
            {/* Main Content Container */}
            <Box
                sx={{
                    width: '95%',
                    maxWidth: '1600px',
                    mx: 'auto',
                    px: { xs: 3, md: 6, lg: 8 },
                }}
            >
                {/* Section Header */}
                <Box
                    sx={{
                        mb: { xs: 8, md: 12 },
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(50px)',
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.2s',
                    }}
                >
                    {/* Overline */}
                    <Typography
                        variant="overline"
                        sx={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontSize: { xs: '0.8rem', md: '0.9rem' },
                            fontWeight: 500,
                            letterSpacing: '0.2em',
                            mb: { xs: 3, md: 4 },
                            display: 'block',
                            textTransform: 'uppercase',
                        }}
                    >
                        Gallery
                    </Typography>

                    {/* Main Headline */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: {
                                xs: '3rem',
                                sm: '4rem',
                                md: '5rem',
                                lg: '6rem',
                                xl: '7rem',
                            },
                            fontWeight: 700,
                            lineHeight: { xs: 0.9, md: 0.85 },
                            letterSpacing: '-0.03em',
                            mb: { xs: 4, md: 6 },
                            color: '#1a1a1a',
                            maxWidth: { xs: '100%', lg: '80%' },
                        }}
                    >
                        Moments of
                        <br />
                        <Box
                            component="span"
                            sx={{
                                background:
                                    'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #10b981 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 300,
                            }}
                        >
                            Excellence
                        </Box>
                    </Typography>

                    {/* Large Subtitle */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: {
                                xs: '1.25rem',
                                md: '1.75rem',
                                lg: '2rem',
                            },
                            fontWeight: 400,
                            lineHeight: 1.3,
                            color: 'rgba(0, 0, 0, 0.7)',
                            maxWidth: { xs: '100%', lg: '70%' },
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateY(0)'
                                : 'translateY(30px)',
                            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '0.5s',
                        }}
                    >
                        Capturing the vibrant spirit of our school community
                        through unforgettable moments and achievements.
                    </Typography>
                </Box>

                {/* Featured Highlights */}
                <Box
                    sx={{
                        mb: { xs: 8, md: 12 },
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(50px)',
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.8s',
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            fontWeight: 700,
                            color: '#1a1a1a',
                            mb: 6,
                            textAlign: 'center',
                        }}
                    >
                        Featured Highlights
                    </Typography>

                    {/* Featured Grid */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                md: 'repeat(3, 1fr)',
                            },
                            gap: { xs: 4, md: 6 },
                        }}
                    >
                        {featuredItems.map((item, index) => (
                            <Box
                                key={item.id}
                                onClick={() => handleImageClick(item)}
                                sx={{
                                    position: 'relative',
                                    aspectRatio: '4/3',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(50px)',
                                    transition:
                                        'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${1 + index * 0.2}s`,
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        '& .overlay': {
                                            opacity: 1,
                                            transform: 'translateY(0)',
                                        },
                                        '& img': {
                                            transform: 'scale(1.05)',
                                        },
                                    },
                                }}
                            >
                                {/* Background Image */}
                                <Box
                                    component="img"
                                    src={item.image}
                                    alt={item.title}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.6s ease',
                                    }}
                                />

                                {/* Gradient Overlay */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: '60%',
                                        background:
                                            'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                                    }}
                                />

                                {/* Content Overlay */}
                                <Box
                                    className="overlay"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        p: 4,
                                        color: 'white',
                                        opacity: 0.9,
                                        transform: 'translateY(20px)',
                                        transition:
                                            'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            color: '#10b981',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em',
                                            mb: 1,
                                        }}
                                    >
                                        {item.date} • Featured
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontSize: {
                                                xs: '1.25rem',
                                                md: '1.5rem',
                                            },
                                            fontWeight: 700,
                                            mb: 2,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '0.875rem',
                                            lineHeight: 1.5,
                                            opacity: 0.9,
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                </Box>

                                {/* Category Badge */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 20,
                                        right: 20,
                                        background: `rgba(255, 255, 255, 0.15)`,
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: 2,
                                        px: 2,
                                        py: 1,
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            color: 'white',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                        }}
                                    >
                                        {
                                            categories
                                                .find(
                                                    cat =>
                                                        cat.id === item.category
                                                )
                                                ?.label.split(' ')[0]
                                        }
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Category Filter */}
                <Box
                    sx={{
                        mb: { xs: 8, md: 10 },
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(30px)',
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '1.6s',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 4,
                        }}
                    >
                        <FilterIcon
                            sx={{
                                color: 'rgba(0, 0, 0, 0.6)',
                                mr: 2,
                                fontSize: '1.25rem',
                            }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '1.125rem',
                                fontWeight: 600,
                                color: 'rgba(0, 0, 0, 0.8)',
                            }}
                        >
                            Explore by Category
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        {categories.map((category, index) => (
                            <Button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                startIcon={category.icon}
                                sx={{
                                    px: 3,
                                    py: 1.5,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    background:
                                        selectedCategory === category.id
                                            ? `linear-gradient(135deg, ${category.color}, ${alpha(category.color, 0.8)})`
                                            : 'rgba(255, 255, 255, 0.8)',
                                    color:
                                        selectedCategory === category.id
                                            ? 'white'
                                            : 'rgba(0, 0, 0, 0.7)',
                                    border:
                                        selectedCategory === category.id
                                            ? 'none'
                                            : '1px solid rgba(0, 0, 0, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    transition:
                                        'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: isIntersecting
                                        ? 'scale(1)'
                                        : 'scale(0.8)',
                                    transitionDelay: `${1.8 + index * 0.1}s`,
                                    '&:hover': {
                                        background:
                                            selectedCategory === category.id
                                                ? `linear-gradient(135deg, ${category.color}, ${alpha(category.color, 0.9)})`
                                                : alpha(category.color, 0.1),
                                        color:
                                            selectedCategory === category.id
                                                ? 'white'
                                                : category.color,
                                        transform: 'scale(1.05)',
                                        borderColor: category.color,
                                    },
                                    '& .MuiButton-startIcon': {
                                        color: 'inherit',
                                    },
                                }}
                            >
                                {category.label}
                            </Button>
                        ))}
                    </Box>
                </Box>

                {/* Gallery Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                            lg: 'repeat(4, 1fr)',
                        },
                        gridAutoRows: '180px',
                        gap: { xs: 1, md: 2, lg: 3 },
                        mb: { xs: 8, md: 12 },
                    }}
                >
                    {filteredItems.map((item, index) => {
                        const categoryConfig = categories.find(
                            cat => cat.id === item.category
                        );
                        return (
                            <Box
                                key={item.id}
                                onClick={() => handleImageClick(item)}
                                sx={{
                                    position: 'relative',
                                    // Only a few special images get to span more than 1 col/row
                                    gridColumn: {
                                        lg:
                                            index === 0 || index === 5
                                                ? 'span 2'
                                                : 'span 1',
                                    },
                                    gridRow: {
                                        lg: index === 0 ? 'span 2' : 'span 1',
                                    },
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'translateY(0)'
                                        : 'translateY(50px)',
                                    transition:
                                        'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${2.2 + (index % 8) * 0.1}s`,
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: theme.shadows[12],
                                        '& .image-container img': {
                                            transform: 'scale(1.1)',
                                        },
                                        '& .info-overlay': {
                                            opacity: 1,
                                            transform: 'translateY(0)',
                                        },
                                    },
                                }}
                            >
                                {/* Image Container */}
                                <Box
                                    className="image-container"
                                    sx={{
                                        width: '100%',
                                        height: '100%', // Fill the grid area
                                        overflow: 'hidden',
                                        position: 'relative',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={item.image}
                                        alt={item.title}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.6s ease',
                                        }}
                                    />

                                    {/* Category Icon */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 12,
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            background:
                                                categoryConfig?.color ||
                                                '#6366f1',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            '& svg': {
                                                fontSize: '1rem',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        {categoryConfig?.icon}
                                    </Box>
                                </Box>

                                {/* Info Panel */}
                                <Box
                                    sx={{
                                        p: 3,
                                        height: '25%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            color:
                                                categoryConfig?.color ||
                                                '#6366f1',
                                            mb: 0.5,
                                        }}
                                    >
                                        {item.date}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            color: '#1a1a1a',
                                            lineHeight: 1.3,
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </Box>

                                {/* Hover Overlay */}
                                <Box
                                    className="info-overlay"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background:
                                            'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
                                        color: 'white',
                                        p: 3,
                                        opacity: 0,
                                        transform: 'translateY(20px)',
                                        transition:
                                            'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
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
                                        {item.date}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: '1rem',
                                            fontWeight: 700,
                                            mb: 2,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '0.8125rem',
                                            lineHeight: 1.4,
                                            opacity: 0.9,
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                    <Box
                                        sx={{
                                            mt: 2,
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 1,
                                        }}
                                    >
                                        {item.tags.slice(0, 2).map(tag => (
                                            <Chip
                                                key={tag}
                                                label={tag}
                                                size="small"
                                                sx={{
                                                    fontSize: '0.6875rem',
                                                    height: 20,
                                                    backgroundColor: alpha(
                                                        categoryConfig?.color ||
                                                            '#6366f1',
                                                        0.2
                                                    ),
                                                    color: 'white',
                                                    border: `1px solid ${alpha(categoryConfig?.color || '#6366f1', 0.3)}`,
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>

                {/* Gallery Stats */}
                <Box
                    sx={{
                        textAlign: 'center',
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(50px)',
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '3s',
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: 'repeat(2, 1fr)',
                                md: 'repeat(4, 1fr)',
                            },
                            gap: { xs: 4, md: 6 },
                            maxWidth: '800px',
                            mx: 'auto',
                        }}
                    >
                        {[
                            { number: '500+', label: 'Memorable\nMoments' },
                            { number: '12', label: 'Monthly\nEvents' },
                            { number: '100%', label: 'Student\nEngagement' },
                            { number: '50+', label: 'Awards &\nRecognitions' },
                        ].map((stat, index) => (
                            <Box
                                key={index}
                                sx={{
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'scale(1)'
                                        : 'scale(0.8)',
                                    transition:
                                        'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${3.2 + index * 0.1}s`,
                                }}
                            >
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: '2rem', md: '2.5rem' },
                                        fontWeight: 700,
                                        background:
                                            'linear-gradient(135deg, #6366f1, #10b981)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: 1,
                                        lineHeight: 1,
                                    }}
                                >
                                    {stat.number}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: '0.875rem',
                                            md: '1rem',
                                        },
                                        fontWeight: 600,
                                        color: '#1a1a1a',
                                        lineHeight: 1.3,
                                        whiteSpace: 'pre-line',
                                    }}
                                >
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Lightbox Modal */}
            <Modal
                open={lightboxOpen}
                onClose={handleCloseLightbox}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    sx: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
                }}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        outline: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        animation: 'fadeIn 0.5s ease',
                        '@keyframes fadeIn': {
                            from: { opacity: 0, transform: 'scale(0.8)' },
                            to: { opacity: 1, transform: 'scale(1)' },
                        },
                    }}
                >
                    {selectedImage && (
                        <>
                            {/* Close Button */}
                            <IconButton
                                onClick={handleCloseLightbox}
                                sx={{
                                    position: 'absolute',
                                    top: -50,
                                    right: 0,
                                    color: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    zIndex: 1000,
                                    '&:hover': {
                                        backgroundColor:
                                            'rgba(255, 255, 255, 0.2)',
                                    },
                                }}
                            >
                                <CloseIcon />
                            </IconButton>

                            {/* Navigation Buttons */}
                            <IconButton
                                onClick={handlePrevImage}
                                sx={{
                                    position: 'absolute',
                                    left: -60,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    zIndex: 1000,
                                    '&:hover': {
                                        backgroundColor:
                                            'rgba(255, 255, 255, 0.2)',
                                    },
                                }}
                            >
                                <PrevIcon />
                            </IconButton>

                            <IconButton
                                onClick={handleNextImage}
                                sx={{
                                    position: 'absolute',
                                    right: -60,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    zIndex: 1000,
                                    '&:hover': {
                                        backgroundColor:
                                            'rgba(255, 255, 255, 0.2)',
                                    },
                                }}
                            >
                                <NextIcon />
                            </IconButton>

                            {/* Image */}
                            <Box
                                component="img"
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                sx={{
                                    maxWidth: '100%',
                                    maxHeight: '70vh',
                                    objectFit: 'contain',
                                    borderRadius: 2,
                                    mb: 3,
                                }}
                            />

                            {/* Image Info */}
                            <Box
                                sx={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: 2,
                                    p: 4,
                                    color: 'white',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    maxWidth: '600px',
                                    mx: 'auto',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            color: '#10b981',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                        }}
                                    >
                                        {selectedImage.date}
                                    </Typography>
                                    <Box sx={{ mx: 2, opacity: 0.5 }}>•</Box>
                                    <Typography
                                        sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            color: categories.find(
                                                cat =>
                                                    cat.id ===
                                                    selectedImage.category
                                            )?.color,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                        }}
                                    >
                                        {
                                            categories.find(
                                                cat =>
                                                    cat.id ===
                                                    selectedImage.category
                                            )?.label
                                        }
                                    </Typography>
                                </Box>

                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: { xs: '1.5rem', md: '2rem' },
                                        fontWeight: 700,
                                        mb: 3,
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {selectedImage.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        lineHeight: 1.6,
                                        opacity: 0.9,
                                        mb: 3,
                                    }}
                                >
                                    {selectedImage.description}
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 1,
                                    }}
                                >
                                    {selectedImage.tags.map(tag => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            size="small"
                                            sx={{
                                                backgroundColor:
                                                    'rgba(255, 255, 255, 0.2)',
                                                color: 'white',
                                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                                '&:hover': {
                                                    backgroundColor:
                                                        'rgba(255, 255, 255, 0.3)',
                                                },
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};
