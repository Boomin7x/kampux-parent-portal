import type { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    // const isAuthenticated = localStorage.getItem('auth-token');

    // if (!isAuthenticated) {
    //     return <Navigate to="/auth" replace />;
    // }

    return <>{children}</>;
};

export default ProtectedRoute;
