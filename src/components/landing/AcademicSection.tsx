import {
    School as AdvancedIcon,
    Palette as ArtsIcon,
    ChevronLeft,
    ChevronRight,
    MenuBook as LiteratureIcon,
    Science as ScienceIcon,
    Sports as SportsIcon,
} from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import {
    A11y,
    Autoplay,
    Keyboard,
    Navigation,
    Pagination,
} from 'swiper/modules';
import { Swiper, SwiperSlide, type SwiperProps } from 'swiper/react';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';
import '../swiper/swiperStyles.css';

// Academic program interface
interface AcademicProgram {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    features: string[];
    level: string;
    backgroundImage?: string;
    stats: { label: string; value: string }[];
}

// Academic Section props
interface AcademicSectionProps {
    className?: string;
}

// Academic programs data
const academicPrograms: AcademicProgram[] = [
    {
        id: 'elementary',
        title: 'Elementary Excellence',
        description:
            'Building strong foundations through hands-on learning, creativity, and character development in our nurturing elementary environment.',
        icon: <AdvancedIcon />,
        color: '#6366f1',
        level: 'Grades K-5',
        backgroundImage: '/pexels-rdne-8500421.jpg',
        features: [
            'Small Classes',
            'STEAM Learning',
            'Character Building',
            'Creative Arts',
        ],
        stats: [
            { label: 'Class Size', value: '12:1' },
            { label: 'Programs', value: '8+' },
        ],
    },
    {
        id: 'middle',
        title: 'Middle School Growth',
        description:
            'Developing critical thinking and leadership skills during these crucial formative years with personalized attention and advanced curricula.',
        icon: <LiteratureIcon />,
        color: '#8b5cf6',
        level: 'Grades 6-8',
        backgroundImage: '/shraga-kopstein-eUa90rsmjIs-unsplash.jpg',
        features: [
            'Advanced Academics',
            'Leadership',
            'Technology',
            'Social Development',
        ],
        stats: [
            { label: 'Honor Students', value: '85%' },
            { label: 'Clubs', value: '15+' },
        ],
    },
    {
        id: 'high',
        title: 'College Preparatory',
        description:
            'Comprehensive preparation for higher education with AP courses, college counseling, and real-world application opportunities.',
        icon: <AdvancedIcon />,
        color: '#ec4899',
        level: 'Grades 9-12',
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
        description:
            'Cutting-edge Science, Technology, Engineering, and Mathematics programs with state-of-the-art labs and research opportunities.',
        icon: <ScienceIcon />,
        color: '#10b981',
        level: 'All Grades',
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
        description:
            'Comprehensive arts education fostering creativity through visual arts, music, theater, and digital media in dedicated studio spaces.',
        icon: <ArtsIcon />,
        color: '#f59e0b',
        level: 'All Grades',
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
        description:
            'Comprehensive athletics promoting fitness, teamwork, and competitive excellence with championship-level coaching and facilities.',
        icon: <SportsIcon />,
        color: '#ef4444',
        level: 'All Grades',
        backgroundImage: '/pexels-rdne-8500421.jpg',
        features: ['Team Sports', 'Fitness', 'Championships', 'Scholarships'],
        stats: [
            { label: 'Sports', value: '18+' },
            { label: 'Championships', value: '32+' },
        ],
    },
];

// Main Academic Section component
export const AcademicSection: React.FC<AcademicSectionProps> = ({
    className = '',
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const swiperConfig: SwiperProps = {
        modules: [Navigation, Pagination, A11y, Keyboard, Autoplay],
        autoplay: {
            delay: 3000, // Time between transitions (in ms)
            disableOnInteraction: false, // Crucial: keeps looping after user swipes
            pauseOnMouseEnter: true, // Optional: pause when user hovers
        },
        spaceBetween: 0,
        slidesPerView: 1,
        speed: 1000,
        loop: true,
        keyboard: {
            enabled: true,
        },
        pagination: {
            clickable: true,
            bulletClass: 'academic-swiper-bullet',
            bulletActiveClass: 'academic-swiper-bullet-active',
        },
        onSlideChange: (swiper: { realIndex: React.SetStateAction<number> }) =>
            setActiveIndex(swiper.realIndex),
        onSwiper: (swiper: SwiperType | null) => {
            swiperRef.current = swiper;
        },
    };

    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    return (
        <Box
            id="programs"
            component="section"
            className={className}
            ref={targetRef}
            sx={{
                position: 'relative',
                py: { xs: 12, md: 20 },
                backgroundColor: '#fefefe',
                overflow: 'hidden',
            }}
        >
            {/* Main Content Container */}
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '100vw',
                    mx: 'auto',
                }}
            >
                {/* Section Header */}
                <Box
                    sx={{
                        width: '95%',
                        maxWidth: '1600px',
                        mx: 'auto',
                        px: { xs: 3, md: 6, lg: 8 },
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
                        Academic Programs
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
                        Excellence
                        <br />
                        <Box
                            component="span"
                            sx={{
                                background:
                                    'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 300,
                            }}
                        >
                            Across
                        </Box>{' '}
                        Every Level
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
                        Comprehensive programs designed to challenge, inspire,
                        and prepare students for lifelong success.
                    </Typography>
                </Box>

                {/* Programs Swiper */}
                <Box
                    sx={{
                        position: 'relative',
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(50px)',
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.8s',
                    }}
                >
                    <Swiper
                        {...swiperConfig}
                        className="academic-programs-swiper"
                    >
                        {academicPrograms.map(program => (
                            <SwiperSlide key={program.id}>
                                <Box
                                    sx={{
                                        height: { xs: '80vh', md: '85vh' },
                                        minHeight: '600px',
                                        position: 'relative',
                                        backgroundImage: `url("${program.backgroundImage}")`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)`,
                                            zIndex: 1,
                                        },
                                    }}
                                >
                                    {/* Content */}
                                    <Box
                                        sx={{
                                            width: '95%',
                                            maxWidth: '1600px',
                                            mx: 'auto',
                                            px: { xs: 3, md: 6, lg: 8 },
                                            position: 'relative',
                                            zIndex: 2,
                                            display: 'grid',
                                            gridTemplateColumns: {
                                                xs: '1fr',
                                                lg: '1.2fr 1fr',
                                            },
                                            gap: { xs: 6, lg: 16 },
                                            alignItems: 'center',
                                        }}
                                    >
                                        {/* Left Content */}
                                        <Box sx={{ color: 'white' }}>
                                            {/* Icon */}
                                            <Box
                                                sx={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: { xs: 80, md: 100 },
                                                    height: { xs: 80, md: 100 },
                                                    borderRadius: 2,
                                                    background: `rgba(255, 255, 255, 0.1)`,
                                                    backdropFilter:
                                                        'blur(10px)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    mb: 4,
                                                    '& svg': {
                                                        fontSize: {
                                                            xs: '2rem',
                                                            md: '3rem',
                                                        },
                                                        color: 'white',
                                                    },
                                                }}
                                            >
                                                {program.icon}
                                            </Box>

                                            {/* Program Title */}
                                            <Typography
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    fontWeight: 600,
                                                    color: 'white',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.05em',
                                                    mb: 2,
                                                }}
                                            >
                                                {program.level}
                                            </Typography>
                                            <Typography
                                                variant="h2"
                                                sx={{
                                                    fontSize: {
                                                        xs: '2.5rem',
                                                        md: '4rem',
                                                        lg: '5rem',
                                                    },
                                                    fontWeight: 700,
                                                    lineHeight: 0.9,
                                                    letterSpacing: '-0.02em',
                                                    mb: 4,
                                                    color: 'white',
                                                    textShadow:
                                                        '0 4px 20px rgba(0, 0, 0, 0.3)',
                                                }}
                                            >
                                                {program.title}
                                            </Typography>

                                            {/* Description */}
                                            <Typography
                                                sx={{
                                                    fontSize: {
                                                        xs: '1.125rem',
                                                        md: '1.375rem',
                                                    },
                                                    lineHeight: 1.6,
                                                    color: 'rgba(255, 255, 255, 0.9)',
                                                    mb: 6,
                                                    maxWidth: '500px',
                                                }}
                                            >
                                                {program.description}
                                            </Typography>

                                            {/* Features */}
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: 2,
                                                    mb: 6,
                                                }}
                                            >
                                                {program.features.map(
                                                    (feature, idx) => (
                                                        <Box
                                                            key={idx}
                                                            sx={{
                                                                px: 3,
                                                                py: 1.5,
                                                                borderRadius: 1,
                                                                background:
                                                                    'rgba(255, 255, 255, 0.1)',
                                                                backdropFilter:
                                                                    'blur(10px)',
                                                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontSize:
                                                                        '0.875rem',
                                                                    fontWeight: 500,
                                                                    color: 'rgba(255, 255, 255, 0.9)',
                                                                }}
                                                            >
                                                                {feature}
                                                            </Typography>
                                                        </Box>
                                                    )
                                                )}
                                            </Box>
                                        </Box>

                                        {/* Right Stats */}
                                        <Box
                                            sx={{
                                                display: {
                                                    xs: 'none',
                                                    lg: 'flex',
                                                },
                                                flexDirection: 'column',
                                                gap: 4,
                                                alignItems: 'flex-end',
                                            }}
                                        >
                                            {program.stats.map((stat, idx) => (
                                                <Box
                                                    key={idx}
                                                    sx={{
                                                        textAlign: 'right',
                                                        background:
                                                            'rgba(255, 255, 255, 0.08)',
                                                        backdropFilter:
                                                            'blur(20px)',
                                                        borderRadius: 2,
                                                        p: 4,
                                                        border: '1px solid rgba(255, 255, 255, 0.15)',
                                                        minWidth: 200,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="h3"
                                                        sx={{
                                                            fontSize: {
                                                                md: '2.5rem',
                                                                lg: '3rem',
                                                            },
                                                            fontWeight: 700,
                                                            color: 'white',
                                                            mb: 1,
                                                            lineHeight: 1,
                                                        }}
                                                    >
                                                        {stat.value}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.9rem',
                                                            fontWeight: 500,
                                                            color: 'rgba(255, 255, 255, 0.8)',
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
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Controls */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: { xs: 40, md: 60 },
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 10,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                        }}
                    >
                        {/* Prev Button */}
                        <IconButton
                            onClick={handlePrev}
                            sx={{
                                width: 50,
                                height: 50,
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.25)',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            <ChevronLeft />
                        </IconButton>

                        {/* Progress Indicator */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                px: 3,
                                py: 1.5,
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 2,
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: 'white',
                                    minWidth: '60px',
                                    textAlign: 'center',
                                }}
                            >
                                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                                {String(academicPrograms.length).padStart(
                                    2,
                                    '0'
                                )}
                            </Typography>
                        </Box>

                        {/* Next Button */}
                        <IconButton
                            onClick={handleNext}
                            sx={{
                                width: 50,
                                height: 50,
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.25)',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            <ChevronRight />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            <style>{`
                .academic-programs-swiper {
                    width: 100%;
                    height: 100%;
                }

                .academic-swiper-bullet {
                    width: 12px !important;
                    height: 12px !important;
                    background: rgba(255, 255, 255, 0.3) !important;
                    opacity: 1 !important;
                    margin: 0 6px !important;
                    transition: all 0.3s ease !important;
                }

                .academic-swiper-bullet-active {
                    background: rgba(255, 255, 255, 0.9) !important;
                    transform: scale(1.2) !important;
                }

                .swiper-pagination {
                    position: absolute !important;
                    bottom: 120px !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                    width: auto !important;
                }

                @media (max-width: 768px) {
                    .swiper-pagination {
                        bottom: 100px !important;
                    }
                }
            `}</style>
        </Box>
    );
};
