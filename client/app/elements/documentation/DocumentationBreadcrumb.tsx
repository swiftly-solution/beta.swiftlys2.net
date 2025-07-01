import type { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMemo } from "react"
import { Link, useLocation } from "react-router"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb"
import type { Documentation } from "~/types/docs/Documentation"

let joinTemp = ""

export default function DocumentationBreadcrumb({ navbarData, pagekey }: { navbarData: Documentation[], pagekey: string }) {
    const pagekeys = useMemo(() => pagekey.split("."), [pagekey])
    if (joinTemp != "") joinTemp = ""

    const router = useLocation()
    const docCategory = useMemo(() => router.pathname.split("/")[1], [router.pathname])

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pagekeys.map((value, idx) => {
                    if (idx == 0) joinTemp = value
                    else joinTemp += `.${value}`

                    const docdata = navbarData.filter((v) => v.key == joinTemp)[0]
                    if (!docdata) return null;

                    if (idx == pagekeys.length - 1) return <BreadcrumbItem key={idx}>
                        <BreadcrumbPage>{docdata.icon != "" ? <FontAwesomeIcon icon={docdata.icon as IconProp} /> : null} <span className="ml-1">{docdata!.title}</span></BreadcrumbPage>
                    </BreadcrumbItem>
                    else return <>
                        <BreadcrumbItem className="hidden md:block">
                            <Link prefetch={"intent"} to={`/${docCategory}/${joinTemp.replace(/\./g, "/")}`}>
                                {docdata.icon != "" ? <FontAwesomeIcon icon={docdata.icon as IconProp} /> : null} <span className="ml-1">{docdata!.title}</span>
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                    </>
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}