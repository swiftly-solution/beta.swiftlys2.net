import { LoaderIcon, SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ErrorCard } from "~/components/ui/alert-cards";
import AdminNavigation from "~/elements/admin/AdminNavigation";
import PageWithNavbarLayout from "~/layouts/PageWithNavbar";
import { useAPI } from "~/lib/ws";
import { useUserStore } from "~/stores/user";
import { type Documentation } from "~/types/docs/Documentation";
import Editor from '@monaco-editor/react';
import DocumentationRender from "~/elements/documentation/DocumentationRenderer";
import { Button } from "~/components/ui/button";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function Page() {
    const api = useAPI()
    const userStore = useUserStore();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [docs, setDocs] = useState<Documentation | null>(null);
    const [touched, setTouched] = useState(false)
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false)

    const page = searchParams.get("page")
    const category = searchParams.get("category")

    useEffect(() => {
        if (userStore.contentLoaded) {
            if (!userStore.user) navigate("/")
            else if (!userStore.user.admin) navigate("/")

            if (page && category) {
                api?.sendEvent("fetch-docs", { pagekey: page, category }, (data) => {
                    if (data.status != 200) return;
                    setDocs(data.data)
                })
            }
        }
    }, [userStore.user, userStore.contentLoaded, page, category])

    const SaveDocPage = () => {
        if (submitting) return;

        setSubmitting(true)

        setTimeout(() => {
            toast.promise(
                new Promise<Record<string, any>>((resolve, reject) => {
                    api?.sendEvent("save-docs-page", { key: page, category, content, token: String(Cookies.get("session")) }, (data) => {
                        if (data.status == 200) {
                            resolve(data)
                        } else {
                            reject(data)
                        }
                    });
                }),
                {
                    loading: "Checking request...",
                    success: (data: Record<string, any>) => {
                        setSubmitting(false)
                        return data.message
                    },
                    error: (data: Record<string, any>) => {
                        setSubmitting(false)
                        return data.message
                    }
                }
            )
        }, 300)
    }

    return (
        <PageWithNavbarLayout head={
            <div className="w-full">
                {docs ? <Button type="button" disabled={!touched || content == docs.content} onClick={SaveDocPage}><SaveIcon /> Save</Button> : null}
            </div>
        } navbar={<AdminNavigation />}>
            {
                !userStore.contentLoaded ? <LoaderIcon size={64} className="animate-spin" /> : (
                    !page ? <ErrorCard text={"Invalid page key."} /> : (
                        !category ? <ErrorCard text={"Invalid category."} /> : (
                            !docs ? <ErrorCard text={"Page not found."} /> : (
                                <div className="grid grid-cols-2 gap-2">
                                    <Editor height={"90vh"} language={"markdown"} defaultValue={docs.content} onChange={(val) => {
                                        if (!touched) setTouched(true)
                                        setContent(val || "")
                                    }} theme={"vs-dark"} />
                                    <DocumentationRender navbarData={[]} content={touched ? content : docs.content} />
                                </div>
                            )
                        )
                    )
                )
            }
        </PageWithNavbarLayout>
    )
}