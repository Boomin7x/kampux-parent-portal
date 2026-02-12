import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import AuthPage from '../pages/Auth/AuthPage';
import LoginPage from '../pages/Auth/LoginPage';
import { CreateAccountPage } from '../pages/Auth/CreateAccountPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/Auth/ResetPasswordPage';
import EmailVerificationPage from '../pages/Auth/EmailVerificationPage';
import PortalPage from '../pages/Portal/PortalPage';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/auth',
        element: <AuthPage />,
    },
    {
        path: '/auth/login',
        element: <LoginPage />,
    },
    {
        path: '/auth/signup',
        element: <CreateAccountPage />,
    },
    {
        path: '/auth/forgot-password',
        element: <ForgotPasswordPage />,
    },
    {
        path: '/auth/reset-password',
        element: <ResetPasswordPage />,
    },
    {
        path: '/auth/verify-email',
        element: <EmailVerificationPage />,
    },
    {
        path: '/auth/secure',
        element: <LoginPage />,
    },
    {
        path: '/portal/*',
        element: (
            <ProtectedRoute>
                <PortalPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);

export default router;
