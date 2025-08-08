import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command";
import type { Documentation } from "~/types/docs/Documentation";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function DocumentationSearch({ data }: { data: Documentation[] }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button type={"submit"} variant={"default"} onClick={() => setOpen(true)}>
                <Search />  Search
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading={data.length == 0 ? "Empty" : (data[0].category.charAt(0).toUpperCase() + data[0].category.slice(1))}>
                        {
                            data.map((v) => (
                                <Link to={`/${v.category}/${v.key.split(".").join("/")}`} prefetch={"intent"}>
                                    <CommandItem>
                                        {v.icon != "" ? <FontAwesomeIcon icon={v.icon as IconProp} /> : null}
                                        <span>{v.title}</span>
                                    </CommandItem>
                                </Link>
                            ))
                        }
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}