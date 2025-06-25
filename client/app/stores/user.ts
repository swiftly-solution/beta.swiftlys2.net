import { create } from 'zustand'

export interface User {
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    username: string;
    email: string;
    admin: boolean;
    otp_active: boolean;
}

interface UserState {
    user: User | undefined;
    setUser: (user: User | undefined) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: undefined,
    setUser: (user: User | undefined) => set((state) => ({ user }))
}))