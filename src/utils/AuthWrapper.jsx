// AuthWrapper.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthWrapper = (Component) => {
    const WrappedComponent = (props) => {
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const navigate = useNavigate();
        const auth = getAuth();

        useEffect(() => {
            // This is a listener which Firebase uses to determine the user's sign-in state
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                    navigate('/'); // redirect to home if not logged in
                }
            });

            // Cleanup subscription on unmount
            return () => unsubscribe();
        }, [auth, navigate]);

        // Render the component only when `isLoggedIn` is true, else render null or a loader
        return isLoggedIn ? <Component {...props} /> : null;
    };

    WrappedComponent.displayName = `AuthWrapper(${Component.displayName || Component.name || 'Component'})`;

    return WrappedComponent;
};

export default AuthWrapper;
