import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    type LinksFunction,
} from "react-router";

import "./app.css";
import { ThemeProvider } from "./components/theme-provider";
import { useEffect } from "react";
import { useAPI } from "./lib/ws";
import { useServerStore } from "./stores/server";
import { Toaster } from "./components/ui/sonner";
import Cookies from 'js-cookie'
import { useUserStore, type User } from "./stores/user";

export const links: LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
    {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
    }
];

export function Layout({ children }: { children: React.ReactNode }) {
    const api = useAPI()
    const serverStore = useServerStore()
    const userStore = useUserStore();

    useEffect(() => {
        if (api) {
            api.sendEvent("server-info", {}, (data) => {
                serverStore.setServerName(data.name)
            });

            const cookieValue = Cookies.get("session")
            if (cookieValue != undefined && cookieValue != "undefined") {
                api.sendEvent("fetch-account", { token: cookieValue }, (data) => {
                    if (data.status == 200) {
                        userStore.setUser(data.data as User);
                    } else {
                        Cookies.remove("session")
                    }
                    userStore.setContentLoaded(true)
                })
            } else {
                userStore.setContentLoaded(true)
            }
        }
    }, [api])

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/js/all.min.js" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <Toaster />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="swiftlys2-theme">
            <Outlet />
        </ThemeProvider>
    )
}

export function ErrorBoundary({ error }: any) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
