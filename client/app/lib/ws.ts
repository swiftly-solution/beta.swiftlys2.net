import { useEffect, useState } from "react"
import { create } from "zustand";
import http from "./http";

interface Web_API {
    api: API | null;
    setAPI: (p: API) => void;
}

const apiStore = create<Web_API>((set) => ({
    api: null,
    setAPI: (p) => set((state) => ({ api: p }))
}))

class API {
    eventListeners: Record<string, (data: Record<string, any>) => void> = {};

    eventsQueue: { event: string, data: any }[] = [];

    addEventHandler(eventName: string, callback: (data: Record<string, any>) => void) {
        this.eventListeners[eventName] = callback;
    }

    sendEvent(event_name: string, data: Record<string, any>, eventHandlerCallback?: (data: Record<string, any>) => void) {
        if (eventHandlerCallback != undefined) {
            this.addEventHandler(event_name, eventHandlerCallback);
        }

        http.post("/api", { type: event_name, data: data },).then((res) => {
            const parsedJson = res.data.Data
            if (this.eventListeners.hasOwnProperty(parsedJson.event)) {
                this.eventListeners[parsedJson.event](parsedJson.data)
            }
        })
    }
}

export const useAPI = () => {
    const apStore = apiStore()

    useEffect(() => {
        if (!apStore.api) {
            apStore.setAPI(new API());
        }
    }, [apStore]);

    return apStore.api;
}