import { lazy } from "react";
import type { LinkDescriptor, MetaArgs } from "react-router";
import Intro from "~/elements/index/Intro";
import Languages from "~/elements/index/Languages";
import PageLayout from "~/layouts/Page";
import { useAPI } from "~/lib/ws";

export function meta({ }: MetaArgs) {
    return [
        { title: "Swiftly - Source 2 Server Framework" },
        { name: "description", content: "Swiftly is a server modification plugin for Source 2 games which is using Metamod:Source." }
    ]
}

export function links(): LinkDescriptor[] {
    return [
        {
            rel: "stylesheet",
            type: "text/css",
            href: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        }
    ]
}

const Features = lazy(() => import('~/elements/index/Features'));

export default function Page() {
    const api = useAPI();
    if (!api) return (<></>)

    return (
        <PageLayout>
            <Intro />
            <Languages />
            <Features />
        </PageLayout>
    )
}