import prepareCatalogData from "./prepareCatalogData";
import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { LoaderIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import type { Documentation } from "~/types/docs/Documentation";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";


export default function Catalog({ navbarData, filter }: { navbarData: Documentation[], filter: string[] }) {
    const cols = useMemo(() => [
        "md:grid-cols-1",
        "md:grid-cols-2",
        "md:grid-cols-3",
        "md:grid-cols-4"
    ], []);

    const route = useLocation().pathname
    const docCategory = useMemo(() => route.split("/")[1], [route])
    const interestKey = useMemo(() => {
        const split = route.split("/")
        split.shift()
        split.shift()
        return split.join(".")
    }, [route])

    const shouldFilter = (filter.filter((a) => a.length > 0).length > 0)
    const catalogData = prepareCatalogData(navbarData, docCategory, interestKey)
    if (!catalogData) return <LoaderIcon className="animate-spin" />

    return (
        <div className={`sm:flex sm:flex-col md:grid ${cols[Math.min(catalogData.items.length, 4) - 1]} gap-4`}>
            {catalogData.items.map((value) => {
                if (!shouldFilter || filter.includes(value.key)) {
                    return (
                        <Link key={value.title} prefetch={"intent"} to={value.url}>
                            <Card
                                className="bg-muted/50 hover:bg-muted/80 transition-colors shadow-md dark:shadow-slate-900 cursor-pointer"
                            >
                                <CardHeader>
                                    <CardTitle className="flex flex-row gap-4 items-center">
                                        {value.icon != "" ? <FontAwesomeIcon icon={value.icon as IconProp} /> : null}
                                        {value.title}
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                    )
                } else return null
            })
            }
        </div>
    )
}