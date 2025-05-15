import type { MetaArgs } from "react-router";
import { useAPI } from "~/lib/ws";

export function meta({ }: MetaArgs) {
    return [
        { title: "Swiftly - Source 2 Server Framework" },
        { name: "description", content: "Swiftly is a server modification plugin for Source 2 games which is using Metamod:Source." }
    ]
}

export default function Page() {
    const api = useAPI();
    if (!api) return (<></>)

    return (<></>)
}