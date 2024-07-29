'use client';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token, 'Auth Token value');
        if (token) {
            setIsAuthenticated(true);
        } else {
            router.push('/login');
        }
    }, [router]);

    return isAuthenticated;
};

export default useAuth;
