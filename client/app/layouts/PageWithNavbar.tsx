import type { ReactNode } from "react";
import { Separator } from "~/components/ui/separator";
import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

export default function PageWithNavbarLayout({ navbar, head, children }: { navbar: ReactNode, head: ReactNode, children: ReactNode }) {
    return (
        <SidebarProvider>
            <Sidebar>
                {navbar}
            </Sidebar>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4 w-full">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        {head}
                    </div>
                </header>
                <div className="px-4 pb-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}