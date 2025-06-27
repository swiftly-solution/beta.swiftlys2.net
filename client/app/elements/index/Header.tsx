import { Menu } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "~/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

interface RouteProps {
    href: string;
    label: string;
    description: string;
}

interface RouteGroup {
    title: string;
    routes: RouteProps[];
}

const routeList: RouteGroup[] = [
    {
        title: "API Documentation",
        routes: [
            {
                label: "Beginners",
                href: "/for-beginners",
                description: "You can learn how to work with Swiftly."
            },
            {
                label: "Plugins",
                href: "/plugin-docs",
                description: "You can learn how to work with Swiftly's Plugin API."
            },
            {
                label: "Extensions",
                href: "/ext-docs",
                description: "You can learn how to work with Swiftly's Extension API."
            }
        ]
    },
    {
        title: "SDK",
        routes: [
            {
                label: "Counter-Strike: 2",
                href: "/sdk/cs2",
                description: "View the SDK available through Swiftly for Counter-Strike: 2."
            }
        ]
    }
]

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-zinc-700 dark:bg-background">
            <div className="container h-14 px-4 flex justify-between w-screen mx-auto items-center">
                <Link
                    rel="noreferrer noopener"
                    to="/"
                    className="ml-2 font-bold text-xl flex"
                >
                    SwiftlyS2
                </Link>

                <span className="flex md:hidden ml-auto">
                    <Sheet
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <SheetTrigger className="px-2">
                            <Menu
                                className="flex md:hidden h-5 w-5"
                                onClick={() => setIsOpen(true)}
                            >
                            </Menu>
                        </SheetTrigger>

                        <SheetContent side={"left"}>
                            <SheetHeader>
                                <SheetTitle className="font-bold text-xl">
                                    SwiftlyS2
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                                <NavigationMenu className="mx-auto px-4 grid grid-col-2">
                                    <NavigationMenuList>
                                        {routeList.map((rt) => (
                                            <NavigationMenuItem>
                                                <NavigationMenuTrigger>{rt.title}</NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    <ul className="grid w-[280px] md:w-[400px] gap-3 p-4 md:grid-cols-1">
                                                        {rt.routes.map((component) => (
                                                            <ListItem
                                                                key={component.label}
                                                                title={component.label}
                                                                href={component.href}
                                                            >
                                                                {component.description}
                                                            </ListItem>
                                                        ))}
                                                    </ul>
                                                </NavigationMenuContent>
                                            </NavigationMenuItem>
                                        ))}
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </span>

                <NavigationMenu className="hidden md:flex ml-auto">
                    <NavigationMenuList>
                        {routeList.map((rt) => (
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>{rt.title}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-1">
                                        {rt.routes.map((component) => (
                                            <ListItem
                                                key={component.label}
                                                title={component.label}
                                                href={component.href}
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    )
}