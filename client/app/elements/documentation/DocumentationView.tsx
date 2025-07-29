import { useEffect, useState } from "react";
import PageWithNavbarLayout from "~/layouts/PageWithNavbar";
import { useAPI } from "~/lib/ws";
import DocumentationNavbar from "./DocumentationNavbar";
import DocumentationHeader from "./DocumentationHeader";
import type { Documentation } from "~/types/docs/Documentation";
import { getTheme } from "~/components/theme-provider";
import { LoaderIcon } from "lucide-react";
import DocumentationRender from "./DocumentationRenderer";
import { ErrorCard } from "~/components/ui/alert-cards";

export default function DocumentationView({ category, pagekey }: { category: string, pagekey: string }) {
    const api = useAPI();

    const [loaded, setLoaded] = useState(false)
    const [navbarData, setNavbarData] = useState<Documentation[]>([]);
    const [page, setPage] = useState<Documentation | null>(null);

    useEffect(() => {
        api?.sendEvent("fetch-documentation-navigation", { category }, (response) => {
            if (response.status != 200) return;
            setNavbarData(response.data)
        })
    }, [category, api])

    useEffect(() => {
        if (page && page.key == pagekey && page.category == category) return;

        setLoaded(false)

        api?.sendEvent("fetch-documentation", { pagekey, category }, (response) => {
            setLoaded(true)
            if (response.status == 200) {
                setPage(response.data)
            } else {
                setPage(null)
            }
        })
    }, [pagekey, category, api])

    return (
        <PageWithNavbarLayout navbar={<DocumentationNavbar data={navbarData} pgkey={pagekey} />} head={<DocumentationHeader data={navbarData} pgkey={pagekey} />}>
            <div className="px-4 pb-4 sm:flex sm:flex-col md:grid md:grid-cols-[3fr_1fr] gap-4">
                <div className={loaded ? "" : "flex items-center justify-center"}>
                    {
                        !loaded ? <LoaderIcon size={64} className="animate-spin" /> : (
                            !page ? <ErrorCard text={"Unknown page."} /> : <DocumentationRender navbarData={navbarData} content={page.content} />
                        )
                    }
                </div>
                <div className="mx-auto">
                    <iframe src={`https://ptb.discord.com/widget?id=1178027657594687608&theme=${getTheme()}`} width="350" height="500" frameBorder={0} sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" loading="lazy"></iframe>
                </div>
            </div>
        </PageWithNavbarLayout>
    )
}