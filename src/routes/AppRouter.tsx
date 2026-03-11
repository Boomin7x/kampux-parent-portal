import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import LandingPage from '../pages/Landing/LandingPage';
import AuthPage from '../pages/Auth/AuthPage';
import LoginPage from '../pages/Auth/LoginPage';
import { CreateAccountPage } from '../pages/Auth/CreateAccountPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/Auth/ResetPasswordPage';
import EmailVerificationPage from '../pages/Auth/EmailVerificationPage';
import PortalPage from '../pages/Portal/PortalPage';
import ProtectedRoute from './ProtectedRoute';
import { ROUTES } from './routes';
import LandingLayout from '../pages/Landing/landingLayout';

// Lazy load landing detail pages for better performance
const AboutPage = lazy(() =>
    import('../pages/Landing/AboutPage').then(module => ({
        default: module.AboutPage,
    }))
);
const AcademicsPage = lazy(() =>
    import('../pages/Landing/AcademicsPage').then(module => ({
        default: module.AcademicsPage,
    }))
);
const FacultyPage = lazy(() =>
    import('../pages/Landing/FacultyPage').then(module => ({
        default: module.FacultyPage,
    }))
);
const StudentLifePage = lazy(() =>
    import('../pages/Landing/StudentLifePage').then(module => ({
        default: module.StudentLifePage,
    }))
);
const FacilitiesPage = lazy(() =>
    import('../pages/Landing/FacilitiesPage').then(module => ({
        default: module.FacilitiesPage,
    }))
);
const GalleryPage = lazy(() =>
    import('../pages/Landing/GalleryPage').then(module => ({
        default: module.GalleryPage,
    }))
);
const ContactPage = lazy(() =>
    import('../pages/Landing/ContactPage').then(module => ({
        default: module.ContactPage,
    }))
);

// Loading fallback component
const LoadingFallback = () => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#fefefe',
        }}
    >
        <CircularProgress
            sx={{
                color: '#6366f1',
            }}
        />
    </Box>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingLayout />,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },

            {
                path: ROUTES.ABOUT,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <AboutPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.ACADEMICS,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <AcademicsPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.FACULTY,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <FacultyPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.STUDENT_LIFE,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <StudentLifePage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.FACILITIES,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <FacilitiesPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.GALLERY,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <GalleryPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.CONTACT,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <ContactPage />
                    </Suspense>
                ),
            },
        ],
    },

    {
        path: ROUTES.AUTH,
        element: <AuthPage />,
    },
    {
        path: ROUTES.AUTH_LOGIN,
        element: <LoginPage />,
    },
    {
        path: ROUTES.AUTH_SIGNUP,
        element: <CreateAccountPage />,
    },
    {
        path: ROUTES.AUTH_FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
    },
    {
        path: ROUTES.AUTH_RESET_PASSWORD,
        element: <ResetPasswordPage />,
    },
    {
        path: ROUTES.AUTH_VERIFY_EMAIL,
        element: <EmailVerificationPage />,
    },
    {
        path: ROUTES.AUTH_SECURE,
        element: <LoginPage />,
    },
    {
        path: `${ROUTES.PORTAL}/*`,
        element: (
            <ProtectedRoute>
                <PortalPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <Navigate to={ROUTES.HOME} replace />,
    },
]);

export default router;
