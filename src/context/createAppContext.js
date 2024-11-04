import { createContext } from 'react';

const appContext = createContext({
    isMobile: false,
});

const { Provider: AppContextProvider } = appContext;

export { AppContextProvider };
export default appContext;