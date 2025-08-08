import type { Documentation } from "~/types/docs/Documentation";
import DocumentationBreadcrumb from "./DocumentationBreadcrumb";
import DocumentationSearch from "./DocumentationSearch";

export default function DocumentationHeader({ data, pgkey }: { data: Documentation[], pgkey: string }) {
    return (
        <>
            <DocumentationBreadcrumb navbarData={data} pagekey={pgkey} />

            <div className="ml-auto">
                <DocumentationSearch data={data} />
            </div>
        </>
    )
}