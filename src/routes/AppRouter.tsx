import { createBrowserRouter, Navigate } from 'react-router-dom';
// import LandingPage from '../pages/Landing/LandingPage';
import AuthPage from '../pages/Auth/AuthPage';
import { LandingPage } from '../pages/LandingPage';
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
