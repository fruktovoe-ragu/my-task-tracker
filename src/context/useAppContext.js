import { useContext } from 'react';
import appContext from './createAppContext';

const useAppContext = () => {
    const { isMobile } = useContext(appContext);

    return { isMobile };
};

export default useAppContext;