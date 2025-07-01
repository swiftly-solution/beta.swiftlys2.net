import { Book } from "lucide-react";
import { Link } from "react-router";
import { Separator } from "~/components/ui/separator";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";

export default function AdminNavigation() {
    return (
        <>
            <SidebarHeader>
                <img src={"/logo.png"} />
                <Separator />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Documentation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to={"/admin/docs/pages"} prefetch={"intent"}>
                                        <Book /> Pages
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </>
    )
}