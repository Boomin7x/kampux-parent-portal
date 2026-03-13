/**
 * Route Constants
 * Centralized route definitions for type safety and consistency
 */

export const ROUTES = {
    // Landing Pages
    HOME: '/',
    ABOUT: '/about',
    ACADEMICS: '/academics',
    FACULTY: '/faculty',
    STUDENT_LIFE: '/student-life',
    FACILITIES: '/facilities',
    GALLERY: '/gallery',
    CONTACT: '/contact',

    // Auth Routes
    AUTH: '/auth',
    AUTH_LOGIN: '/auth/login',
    AUTH_SIGNUP: '/auth/signup',
    AUTH_FORGOT_PASSWORD: '/auth/forgot-password',
    AUTH_RESET_PASSWORD: '/auth/reset-password',
    AUTH_VERIFY_EMAIL: '/auth/verify-email',
    AUTH_SECURE: '/auth/secure',

    // Portal Routes
    PORTAL: '/portal',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
