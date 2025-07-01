import type { Documentation } from "~/types/docs/Documentation";
import DocumentationBreadcrumb from "./DocumentationBreadcrumb";

export default function DocumentationHeader({ data, pgkey }: { data: Documentation[], pgkey: string }) {
    return (
        <>
            <DocumentationBreadcrumb navbarData={data} pagekey={pgkey} />
        </>
    )
}