import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../../../firebaseConfig';

interface PublicRouteProps {
    children: JSX.Element;
}

export default function PublicRoute({ children }: PublicRouteProps) {
    const location = useLocation();

    if (auth.currentUser) {
        return <Navigate to="/app" state={{ from: location }} replace />;
    }

    return children;
}