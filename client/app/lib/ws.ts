import { useEffect, useState } from "react"

class WebSocketAPI {
    ws: WebSocket | null = null;
    ready: boolean = false;
    eventListeners: Record<string, (data: Record<string, any>) => void> = {};

    constructor() {
        this.ws = new WebSocket("wss://beta.swiftlys2.net/api");

        this.ws.onopen = () => { this.ready = true };
        this.ws.onclose = () => { this.ready = false };

        this.ws.onmessage = (ev) => {
            console.log(ev.data);
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

    sendEvent(event_name: string, data: Record<string, any>) {
        if (!this.ws) return;
        this.ws.send(JSON.stringify({ type: event_name, data: data }));
    }
}

export const useAPI = () => {
    const [ws, setWS] = useState<WebSocketAPI | null>(null);

    useEffect(() => {
        const socket = new WebSocketAPI();

        setWS(socket)

        return () => {
            socket.close();
        }
    }, []);

    return ws;
}