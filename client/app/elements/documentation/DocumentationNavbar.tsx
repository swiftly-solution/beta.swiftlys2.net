import { useMemo } from "react";
import { Link, useLocation } from "react-router";
import { Separator } from "~/components/ui/separator";
import { SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import type { Documentation } from "~/types/docs/Documentation";
import type { ProcessedDocs } from "./render/navbar/prepareDocsData";
import prepareDocsData from "./render/navbar/prepareDocsData";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type IconProp } from "@fortawesome/fontawesome-svg-core";

function RenderProcessedNavbar({ value, route, pagekey }: { value: ProcessedDocs, route: string, pagekey: string }) {
    return (
        <Collapsible key={value.title} asChild defaultOpen={route.startsWith(value.url)}>
            <SidebarMenuItem>
                <SidebarMenuButton isActive={route.split("/").length == 2 ? value.key == "home" : route == value.url} asChild tooltip={value.title}>
                    <Link to={value.url} prefetch={"intent"}>
                        {value.icon != "" ? <FontAwesomeIcon icon={value.icon as IconProp} /> : null}
                        <span>{value.title}</span>
                    </Link>
                </SidebarMenuButton>
                {value.items.length > 0 ? (
                    <>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuAction className="data-[state=open]:rotate-90">
                                <ChevronRight />
                                <span className="sr-only">Toggle</span>
                            </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenu className="pl-1.5 mt-1 border-l-0">
                                {value.items.map((val) => {
                                    if (val.items.length == 0) return (
                                        <SidebarMenuItem key={val.title}>
                                            <SidebarMenuButton isActive={route.split("/").length == 2 ? val.key == "home" : route == val.url} asChild>
                                                <Link to={val.url} prefetch={"intent"}>
                                                    {val.icon != "" ? <FontAwesomeIcon icon={val.icon as IconProp} /> : null}
                                                    <span>{val.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                    else return <Navbar key={val.title} navbarData={([val] as unknown) as Documentation[]} pagekey={pagekey} beenSet={false} dataSet={true} />
                                })}
                            </SidebarMenu>
                        </CollapsibleContent>
                    </>
                ) : null}
            </SidebarMenuItem>
        </Collapsible>
    )
}

function Navbar({ navbarData, pagekey, beenSet, dataSet }: { navbarData: Documentation[], pagekey: string, beenSet?: boolean, dataSet?: boolean }) {
    const route = useLocation().pathname
    const docCategory = useMemo(() => route.split("/")[1], [route])
    if (!beenSet && !dataSet) {
        return (
            <SidebarGroup>
                <SidebarMenu>
                    <Navbar navbarData={navbarData} pagekey={pagekey} beenSet={true} />
                </SidebarMenu>
            </SidebarGroup>
        )
    }

    const data = dataSet ? ((navbarData as unknown) as ProcessedDocs[]) : prepareDocsData(navbarData, docCategory)

    return data.map((value, iiddx) => <RenderProcessedNavbar key={iiddx} value={value} route={route} pagekey={pagekey} />)
}

export default function DocumentationNavbar({ data, pgkey }: { data: Documentation[], pgkey: string }) {
    return (
        <>
            <SidebarHeader>
                <Link prefetch={"intent"} to={"/"}>
                    <img src={"/logo.png"} />
                </Link>
                <Separator />
            </SidebarHeader>
            <SidebarContent>
                <Navbar navbarData={data} pagekey={pgkey} />
            </SidebarContent>
        </>
    )
}