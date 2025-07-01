import type { ColumnDef } from "@tanstack/react-table";
import Cookies from "js-cookie";
import { PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { useAPI } from "~/lib/ws"
import type { Documentation } from "~/types/docs/Documentation";
import AdminCreatePage from "./AdminCreatePage";
import AdminDeletePage from "./AdminDeletePage";

const columns: ColumnDef<Documentation>[] = [
    {
        accessorKey: "key",
        header: "Key"
    },
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "category",
        header: "Category"
    },
    {
        id: "actions",
        header: "Actions",
        cell({ row }) {
            return (
                <div className="flex gap-2">
                    <Link prefetch={"intent"} to={`/admin/docs/pages/edit?page=${row.getValue("key")}&category=${row.getValue("category")}`}>
                        <Button variant={"secondary"}>
                            <PencilIcon />
                        </Button>
                    </Link>
                    <AdminDeletePage pagekey={row.getValue("key")} pagecategory={row.getValue("category")} />
                </div>
            )
        }
    }
]

export default function AdminDocumentationViewer() {
    const api = useAPI();
    const [pages, setPages] = useState<Documentation[]>([]);

    useEffect(() => {
        api?.sendEvent("fetch-all-docs", { token: Cookies.get("session") }, (data) => {
            if (data.status != 200) return;
            setPages(data.data)
        })
    }, [api]);

    return (
        <DataTable columns={columns} data={pages} filterBy="key">
            <AdminCreatePage />
        </DataTable>
    )
}