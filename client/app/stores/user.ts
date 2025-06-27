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
    contentLoaded: boolean;
    setUser: (user: User | undefined) => void;
    setContentLoaded: (value: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: undefined,
    contentLoaded: false,
    setUser: (user: User | undefined) => set((state) => ({ user, contentLoaded: state.contentLoaded })),
    setContentLoaded: (value: boolean) => set((state) => ({ user: state.user, contentLoaded: value }))
}))