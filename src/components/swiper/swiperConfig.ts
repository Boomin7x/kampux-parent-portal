// Centralized Swiper configuration for the application
import type { SwiperOptions } from 'swiper';

// Default breakpoints for responsive design
export const defaultBreakpoints = {
    320: {
        slidesPerView: 1,
        spaceBetween: 16,
    },
    640: {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    768: {
        slidesPerView: 2,
        spaceBetween: 24,
    },
    1024: {
        slidesPerView: 3,
        spaceBetween: 32,
    },
    1280: {
        slidesPerView: 4,
        spaceBetween: 32,
    },
};

// Base configuration for all swipers
export const baseSwiperConfig: SwiperOptions = {
    spaceBetween: 24,
    grabCursor: true,
    keyboard: {
        enabled: true,
    },
    a11y: {
        enabled: true,
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
    },
    speed: 400,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    allowTouchMove: true,
    threshold: 5,
};

// Hero section swiper configuration
export const heroSwiperConfig: SwiperOptions = {
    ...baseSwiperConfig,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
    pagination: {
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3,
    },
    navigation: {
        nextEl: '.hero-swiper-button-next',
        prevEl: '.hero-swiper-button-prev',
    },
};

// Testimonials swiper configuration
export const testimonialSwiperConfig: SwiperOptions = {
    ...baseSwiperConfig,
    slidesPerView: 1,
    spaceBetween: 32,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    pagination: {
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 32,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 32,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 32,
        },
    },
};

// Faculty swiper configuration
export const facultySwiperConfig: SwiperOptions = {
    ...baseSwiperConfig,
    slidesPerView: 3,
    spaceBetween: 24,
    navigation: {
        nextEl: '.faculty-swiper-button-next',
        prevEl: '.faculty-swiper-button-prev',
    },
    pagination: {
        clickable: true,
    },
    breakpoints: defaultBreakpoints,
};

// Facilities swiper configuration
export const facilitiesSwiperConfig: SwiperOptions = {
    ...baseSwiperConfig,
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    navigation: {
        nextEl: '.facilities-swiper-button-next',
        prevEl: '.facilities-swiper-button-prev',
    },
    pagination: {
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 24,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 32,
        },
    },
};

// Gallery swiper configuration
export const gallerySwiperConfig: SwiperOptions = {
    ...baseSwiperConfig,
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    centeredSlides: true,
    navigation: {
        nextEl: '.gallery-swiper-button-next',
        prevEl: '.gallery-swiper-button-prev',
    },
    pagination: {
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 32,
        },
    },
};

// Activities swiper configuration (for student life section)
export const activitiesSwiperConfig: SwiperOptions = {
    ...baseSwiperConfig,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    navigation: {
        nextEl: '.activities-swiper-button-next',
        prevEl: '.activities-swiper-button-prev',
    },
    pagination: {
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 32,
        },
    },
};

// Academic programs swiper configuration
export const academicSwiperConfig: SwiperOptions = {
    ...baseSwiperConfig,
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
        nextEl: '.academic-swiper-button-next',
        prevEl: '.academic-swiper-button-prev',
    },
    pagination: {
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 24,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 32,
        },
    },
};

// Utility function to merge custom config with base config
export const createSwiperConfig = (
    customConfig: Partial<SwiperOptions>
): SwiperOptions => {
    return {
        ...baseSwiperConfig,
        ...customConfig,
        breakpoints: {
            ...defaultBreakpoints,
            ...customConfig.breakpoints,
        },
    };
};
