import { useParams, type MetaArgs } from "react-router";
import DocumentationView from "~/elements/documentation/DocumentationView";

export function meta({ }: MetaArgs) {
    return [
        { title: "Plugin Documentation - Source 2 Server Framework" },
        { name: "description", content: "Swiftly is a server modification plugin for Source 2 games which is using Metamod:Source." }
    ]
}

export default function Page() {
    const { '*': splat } = useParams();

    return (
        <DocumentationView category={"plugin-docs"} pagekey={splat!.split("/").join(".")} />
    )
}