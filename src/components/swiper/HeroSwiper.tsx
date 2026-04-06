import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import {
    A11y,
    Autoplay,
    EffectFade,
    Keyboard,
    Navigation,
    Pagination,
} from 'swiper/modules';
import { BaseSwiper, useSwiper } from './BaseSwiper';
import { heroSwiperConfig } from './swiperConfig';

// Hero slide data interface
export interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage?: string;
    backgroundGradient?: string;
}

// Hero Swiper props
export interface HeroSwiperProps {
    slides: HeroSlide[];
    onCtaClick?: (slide: HeroSlide) => void;
    autoplay?: boolean;
    className?: string;
}

// Individual hero slide component
const HeroSlideContent: React.FC<{
    slide: HeroSlide;
    onCtaClick?: (slide: HeroSlide) => void;
}> = ({ slide, onCtaClick }) => {
    return (
        <Box
            sx={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                backgroundImage: slide.backgroundImage
                    ? `url(${slide.backgroundImage})`
                    : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                background: slide.backgroundGradient || undefined,
                zIndex: 1,
            }}
        >
            <Container
                maxWidth="lg"
                sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
            >
                <Box
                    sx={{
                        maxWidth: 800,
                        mx: 'auto',
                        textAlign: 'center',
                        color: 'white',
                        width: '100%',
                        zIndex: 10,
                        position: 'relative',
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            fontWeight: 700,
                            mb: 2,
                            zIndex: '100',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        }}
                    >
                        {slide.title}
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: { xs: '1.25rem', md: '1.75rem' },
                            fontWeight: 500,
                            mb: 3,
                            opacity: 0.95,
                        }}
                    >
                        {slide.subtitle}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            mb: 4,
                            opacity: 0.9,
                            maxWidth: 600,
                            mx: 'auto',
                            lineHeight: 1.6,
                        }}
                    >
                        {slide.description}
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            px: 6,
                            py: 2,
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            borderRadius: 2,
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                            '&:hover': {
                                background: 'rgba(255, 255, 255, 0.25)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                        onClick={() => onCtaClick?.(slide)}
                    >
                        {slide.ctaText}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

// Main Hero Swiper component
export const HeroSwiper: React.FC<HeroSwiperProps> = ({
    slides,
    onCtaClick,
    autoplay = true,
    className = '',
}) => {
    const { handleSwiper, handleSlideChange } = useSwiper();

    const config = {
        ...heroSwiperConfig,
        autoplay: autoplay ? heroSwiperConfig.autoplay : false,
    };

    return (
        <>
            <BaseSwiper
                {...config}
                className={`hero-swiper ${className}`}
                onSwiper={handleSwiper}
                onSlideChange={handleSlideChange}
                modules={[
                    Navigation,
                    Pagination,
                    Autoplay,
                    A11y,
                    Keyboard,
                    EffectFade,
                ]}
            >
                {slides.map(slide => (
                    <HeroSlideContent
                        key={slide.id}
                        slide={slide}
                        onCtaClick={onCtaClick}
                    />
                ))}
            </BaseSwiper>
        </>
    );
};

// Default hero slides for demo/placeholder
export const defaultHeroSlides: HeroSlide[] = [
    {
        id: '1',
        title: 'Excellence en Education ',
        subtitle: 'Former dès aujourd’hui les leaders de demain',
        description:
            'Offrir une éducation de qualité exceptionnelle, axée sur l’excellence académique, le développement du caractère et la préparation des élèves à un avenir réussi.',
        ctaText: 'Accès au portail parent',
        ctaLink: '/auth',
        backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
        id: '2',
        title: 'Environnement Educative Innovante',
        subtitle: 'Là où la curiosité rencontre le savoir',
        description:
            'Nos infrastructures modernes et nos méthodes pédagogiques innovantes créent un environnement où les élèves s’épanouissent et atteignent leur plein potentiel.',
        ctaText: 'Découvrir Nos programmes',
        ctaLink: '/programs',
        backgroundGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
        id: '3',
        title: 'Construire des communautés solides',
        subtitle: 'Ensemble, nous accomplissons davantage',
        description:
            'Favoriser des relations solides entre les élèves, les familles et les éducateurs afin de créer une communauté bienveillante qui soutient la réussite.',
        ctaText: 'Rejoindre Notre Communauté',
        ctaLink: '/community',
        backgroundGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
];
