'use client'
import { ReactNode, createContext, useContext, useState, useEffect } from "react";

interface UserContextInterface {
    isLoggedIn: boolean;
    setIsLoggedIn: (loggedIn: boolean) => void;
}

const UserContext = createContext<UserContextInterface | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
};

const ApplicationContext: React.FC<AppProviderProps> = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token);


    useEffect(() => {
        const checkUser = () => {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            setIsLoggedIn(!!user?.token);
        };

        window.addEventListener('storage', checkUser);

        return () => {
            window.removeEventListener('storage', checkUser);
        };
    }, []);

    const value = {
        isLoggedIn,
        setIsLoggedIn
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { ApplicationContext, useUserContext };
