import { useEffect, useState } from "react"
import { create } from "zustand";

interface WS_API {
    api: WebSocketAPI | null;
    setAPI: (p: WebSocketAPI) => void;
}

const apiStore = create<WS_API>((set) => ({
    api: null,
    setAPI: (p) => set((state) => ({ api: p }))
}))

class WebSocketAPI {
    ws: WebSocket | null = null;
    ready: boolean = false;
    eventListeners: Record<string, (data: Record<string, any>) => void> = {};

    eventsQueue: { event: string, data: any }[] = [];

    constructor() {
        this.init()
    }

    init() {
        this.ws = new WebSocket("wss://beta.swiftlys2.net/api");

        this.ws.onopen = () => {
            this.ready = true
            for (const queue of this.eventsQueue) {
                this.sendEvent(queue.event, queue.data);
            }
        };
        this.ws.onclose = () => {
            this.ready = false
        };

        this.ws.onmessage = (ev) => {
            try {
                const parsedJson = JSON.parse(ev.data)
                if (this.eventListeners.hasOwnProperty(parsedJson.event)) {
                    this.eventListeners[parsedJson.event](parsedJson.data)
                }
            } catch (err) {
                console.error(err)
            }
        }
    }

    close() {
        if (this.ws) this.ws.close();
    }

    isReady() {
        return this.ready;
    }

    addEventHandler(eventName: string, callback: (data: Record<string, any>) => void) {
        this.eventListeners[eventName] = callback;
    }

    sendEvent(event_name: string, data: Record<string, any>, eventHandlerCallback?: (data: Record<string, any>) => void) {
        if (!this.ws) return;
        if (eventHandlerCallback != undefined) {
            this.addEventHandler(event_name, eventHandlerCallback);
        }

        if (!this.ready) {
            this.eventsQueue.push({ event: event_name, data: data })
        } else {
            this.ws.send(JSON.stringify({ type: event_name, data: data }));
        }
    }
}

export const useAPI = () => {
    const apStore = apiStore()

    useEffect(() => {
        if (!apStore.api) {
            apStore.setAPI(new WebSocketAPI());
        }
    }, [apStore]);

    return apStore.api;
}