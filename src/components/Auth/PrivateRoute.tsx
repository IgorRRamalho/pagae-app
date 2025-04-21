import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Loader2 } from 'lucide-react';
import { auth } from '../../../firebaseConfig';
import Loader from '@components/Loader';

interface PrivateRouteProps {
    children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader/>
            </div>
        );
    }

    if (!authenticated) {
      return <Navigate to="/access-required" state={{ from: location }} replace />;
  }

    return children;
}