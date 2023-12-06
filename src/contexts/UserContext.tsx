import React, { createContext, useContext, useEffect, useState } from "react";
import { getProfile, login, logout, register } from "../api/api";

export interface IUserContext {
    loading: boolean;
    user?: IUser;
    jwt?: string;
    signIn: (email: string, password: string) => Promise<LoginResult>;
    signUp: (username: string, email: string, password: string) => Promise<LoginResult>;
    signOut: () => void;
}

const UserContext = createContext<IUserContext | null>(null);

interface IProviderProps {
    children: React.ReactNode;
}

interface IUser {
    username: string;
    email: string;
    _id: string;
}

interface LoginResult {
    success: boolean;
}

export const UserContextProvider = ({ children }: IProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [jwt, setJwt] = useState<string>();

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            setJwt(jwt);
        }
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    const signIn = async (email: string, password: string): Promise<LoginResult> => {
        setLoading(true);
        const result = await login(email, password);
        if (result.status === 201) {
            setJwt(result.data.access_token);
            localStorage.setItem('jwt', result.data.access_token);
            const response = await getProfile(result.data.access_token);
            if (response.status === 200) {
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        }
        setLoading(false);
        return { success: result.status === 201 };
    };

    const signUp = async (username: string, email: string, password: string): Promise<LoginResult> => {
        setLoading(true);
        const result = await register(username, email, password);
        if (result.status === 201) {
            setJwt(result.data.access_token);
            localStorage.setItem('jwt', result.data.access_token);
            const response = await getProfile(result.data.access_token);
            if (response.status === 200) {
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        }
        setLoading(false);
        return { success: result.status === 201 };
    }

    const signOut = async () => {
        const result = await logout();
        if (result.status === 200) {
            setJwt(undefined);
            localStorage.removeItem('jwt');
            setUser(undefined);
            localStorage.removeItem('user');
        }
    };

    return (
        <UserContext.Provider value={{ loading, user, jwt, signIn, signUp, signOut }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext<IUserContext | null>(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
}