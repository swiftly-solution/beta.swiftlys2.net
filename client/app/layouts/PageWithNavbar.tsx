import type { ReactNode } from "react";
import { Separator } from "~/components/ui/separator";
import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

export default function PageWithNavbarLayout({ Navbar, Header, children }: { Navbar: ReactNode, Header: ReactNode, children: ReactNode }) {
    return (
        <SidebarProvider>
            <Sidebar>
                {Navbar}
            </Sidebar>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4 w-full">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        {Header}
                    </div>
                </header>
                <div className="px-4 pb-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}