import { createContext, useContext, useState } from "react";

export type UserFalse = {
    phoneNumber: null;
};

export type UserTrue = {
    phoneNumber: string;
    accountId: number;
    fullName: string;
    createdAt: string;
    status: string;
    balance: number;
};

export type User = UserFalse | UserTrue;

export type UserContextData = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = createContext<UserContextData>({
    user: {
        phoneNumber: null,
    },
    setUser: () => { },
});

export function UserProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User>({
        phoneNumber: null,
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
