import { useEffect, useRef, useState } from 'react';

// Intersection Observer hook for scroll animations
export interface UseIntersectionObserverOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
    freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = (
    options: UseIntersectionObserverOptions = {}
) => {
    const {
        root = null,
        rootMargin = '0px',
        threshold = 0.1,
        freezeOnceVisible = false,
    } = options;

    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    const targetRef = useRef<Element | null>(null);

    useEffect(() => {
        const node = targetRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isElementIntersecting = entry.isIntersecting;

                if (!hasBeenVisible && isElementIntersecting) {
                    setHasBeenVisible(true);
                }

                if (!freezeOnceVisible || !hasBeenVisible) {
                    setIsIntersecting(isElementIntersecting);
                }
            },
            {
                root,
                rootMargin,
                threshold,
            }
        );

        observer.observe(node);

        return () => {
            observer.unobserve(node);
        };
    }, [root, rootMargin, threshold, freezeOnceVisible, hasBeenVisible]);

    return {
        isIntersecting: freezeOnceVisible ? hasBeenVisible : isIntersecting,
        hasBeenVisible,
        targetRef,
    };
};
