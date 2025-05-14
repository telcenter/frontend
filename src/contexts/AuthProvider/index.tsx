import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export type AuthFalse = {
    authenticated: false;
};

export type AuthTrue = {
    authenticated: true;
    admin: {
        id: string;
        email: string;
    };
    accessToken: string;
}

export type Auth = AuthFalse | AuthTrue;

export type AuthContextData = {
    auth: Auth;
    setAuth: Dispatch<SetStateAction<Auth>>;
};

const AuthContext = createContext<AuthContextData>({
    auth: { authenticated: false },
    setAuth: () => { },
});

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [auth, setAuth] = useState<Auth>({
        authenticated: false,
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
