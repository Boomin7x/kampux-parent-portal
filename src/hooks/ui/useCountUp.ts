import { useState, useEffect } from 'react';

// Count up animation hook
export interface UseCountUpOptions {
    start?: number;
    end: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    separator?: string;
    easingFunction?: (t: number) => number;
}

export const useCountUp = (trigger: boolean, options: UseCountUpOptions) => {
    const {
        start = 0,
        end,
        duration = 2000,
        decimals = 0,
        prefix = '',
        suffix = '',
        separator = ',',
        easingFunction = (t: number) => t * t * t, // cubic ease-out
    } = options;

    const [count, setCount] = useState(start);

    useEffect(() => {
        if (!trigger) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            const easedProgress = easingFunction(progress);
            const currentCount = start + (end - start) * easedProgress;

            setCount(currentCount);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [trigger, start, end, duration, easingFunction]);

    // Format the number
    const formatNumber = (num: number): string => {
        const fixed = num.toFixed(decimals);
        const parts = fixed.split('.');
        const integerPart = parts[0].replace(
            /\B(?=(\d{3})+(?!\d))/g,
            separator
        );
        const formattedNumber =
            decimals > 0 && parts[1]
                ? `${integerPart}.${parts[1]}`
                : integerPart;

        return `${prefix}${formattedNumber}${suffix}`;
    };

    return formatNumber(count);
};
