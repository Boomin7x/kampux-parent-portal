/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type ReactNode } from 'react';
// import { type SwiperOptions } from 'swiper';
import {
    A11y,
    Autoplay,
    Keyboard,
    Navigation,
    Pagination,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './swiperStyles.css';

// Base Swiper component props
export interface BaseSwiperProps extends SwiperOptions {
    children: ReactNode[];

    className?: string;
    onSlideChange?: (swiper: any) => void;
    onSwiper?: (swiper: any) => void;
    modules?: any[];
    wrapperClassName?: string;
}

// Base Swiper component that handles common functionality
export const BaseSwiper: React.FC<BaseSwiperProps> = ({
    children,

    className = '',
    onSlideChange,
    onSwiper,
    modules = [Navigation, Pagination, Autoplay, A11y, Keyboard],
    wrapperClassName = '',
    ...config
}) => {
    return (
        <div className={`custom-swiper ${wrapperClassName}`}>
            <Swiper
                modules={modules}
                onSlideChange={onSlideChange}
                onSwiper={onSwiper}
                className={`${className}`}
                {...config}
            >
                {children.map((child, index) => (
                    <SwiperSlide key={index}>{child}</SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

// Swiper slide wrapper component for consistent styling
export interface SwiperSlideWrapperProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export const SwiperSlideWrapper: React.FC<SwiperSlideWrapperProps> = ({
    children,
    className = '',
    onClick,
}) => {
    return (
        <div className={`swiper-slide-content ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};

// Navigation buttons component
export interface SwiperNavigationProps {
    prevClassName?: string;
    nextClassName?: string;
    showNavigation?: boolean;
}

export const SwiperNavigation: React.FC<SwiperNavigationProps> = ({
    prevClassName = 'custom-swiper-button-prev',
    nextClassName = 'custom-swiper-button-next',
    showNavigation = true,
}) => {
    if (!showNavigation) return null;

    return (
        <>
            <div className={prevClassName}></div>
            <div className={nextClassName}></div>
        </>
    );
};

// Pagination component
export interface SwiperPaginationProps {
    className?: string;
    showPagination?: boolean;
    type?: 'bullets' | 'fraction' | 'progressbar';
}

export const SwiperPagination: React.FC<SwiperPaginationProps> = ({
    className = '',
    showPagination = true,
}) => {
    if (!showPagination) return null;

    return <div className={`swiper-pagination ${className}`}></div>;
};

// Hook for Swiper instance management
import { useCallback, useState } from 'react';
import type { SwiperOptions } from 'swiper/types';

export const useSwiper = () => {
    const [swiperInstance, setSwiperInstance] = useState<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSwiper = useCallback((swiper: any) => {
        setSwiperInstance(swiper);
    }, []);

    const handleSlideChange = useCallback((swiper: any) => {
        setActiveIndex(swiper.activeIndex);
    }, []);

    const goToSlide = useCallback(
        (index: number) => {
            if (swiperInstance) {
                swiperInstance.slideTo(index);
            }
        },
        [swiperInstance]
    );

    const goToNext = useCallback(() => {
        if (swiperInstance) {
            swiperInstance.slideNext();
        }
    }, [swiperInstance]);

    const goToPrev = useCallback(() => {
        if (swiperInstance) {
            swiperInstance.slidePrev();
        }
    }, [swiperInstance]);

    const pauseAutoplay = useCallback(() => {
        if (swiperInstance && swiperInstance.autoplay) {
            swiperInstance.autoplay.pause();
        }
    }, [swiperInstance]);

    const resumeAutoplay = useCallback(() => {
        if (swiperInstance && swiperInstance.autoplay) {
            swiperInstance.autoplay.resume();
        }
    }, [swiperInstance]);

    return {
        swiperInstance,
        activeIndex,
        handleSwiper,
        handleSlideChange,
        goToSlide,
        goToNext,
        goToPrev,
        pauseAutoplay,
        resumeAutoplay,
    };
};
