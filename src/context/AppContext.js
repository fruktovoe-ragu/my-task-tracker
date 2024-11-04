import React, { useState, useEffect, useCallback, useMemo } from 'react';
import throttle from 'lodash.throttle';
import { AppContextProvider } from './createAppContext';

const AppContext = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = useCallback(() => {
        const windowWidth = window.innerWidth;

        setIsMobile(windowWidth < 768);
    }, []);

    const handleSetThrottled = useMemo(() => throttle(handleResize, 20), [handleResize]);

    useEffect(() => {
        handleSetThrottled();
        window.addEventListener('resize', handleSetThrottled);

        return () => {
            window.removeEventListener('resize', handleSetThrottled);
        };
    }, [handleSetThrottled]);

    return (
        <AppContextProvider value={{ isMobile }}>
            {children}
        </AppContextProvider>
    );
};

export default AppContext;
