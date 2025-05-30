import { create } from 'zustand'

interface ServerState {
    server_name: string;
    setServerName: (name: string) => void;
}

export const useServerStore = create<ServerState>((set) => ({
    server_name: "unknown",
    setServerName: (name: string) => set((state) => ({ server_name: name }))
}))