import { Trash2Icon } from "lucide-react"
import Cookies from "js-cookie";
import { useState, type FormEvent } from "react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { PrepareForm } from "~/lib/forms"
import { useAPI } from "~/lib/ws"
import deletePageSchema from "~/validation/admin/docs/deletepage"
import { handleZodValidation, type ValidationError } from "~/validation/HandleValidation"

export default function AdminDeletePage({ pagekey, pagecategory }: { pagekey: string, pagecategory: string }) {
    const api = useAPI()
    const [submitting, setSubmitting] = useState(false)

    const [errors, setErrors] = useState<ValidationError<typeof deletePageSchema>>({})

    const changeDeletePage = (e: FormEvent<HTMLFormElement>) => {
        handleZodValidation({
            onError: setErrors,
            data: PrepareForm(e),
            onSuccess: () => {
                setErrors({})
            },
            schema: deletePageSchema
        })
    }

    const submitDeletePage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (errors.key || errors.category) return;

        setSubmitting(true)

        setTimeout(() => {
            let dt = PrepareForm(e)
            dt.token = String(Cookies.get("session"))

            toast.promise(
                new Promise<Record<string, any>>((resolve, reject) => {
                    api?.sendEvent("delete-docs-page", dt, (data) => {
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
                        api?.sendEvent("fetch-all-docs", { token: Cookies.get("session") })
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
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"destructive"}>
                    <Trash2Icon />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={submitDeletePage} onChange={changeDeletePage}>
                    <DialogHeader>
                        <DialogTitle>Delete Page</DialogTitle>
                    </DialogHeader>
                    <div className="gap-6 pt-6 pb-6">
                        <Input
                            disabled={true}
                            id="key"
                            type="text"
                            required
                            value={pagekey}
                            className="hidden"
                        />
                        <Input
                            disabled={true}
                            id="category"
                            type="text"
                            required
                            value={pagecategory}
                            className="hidden"
                        />
                        Are you sure that you want to delete <code id={"code"}>{pagekey}</code> from <code id={"code"} className="capitalize">{pagecategory}</code>?
                    </div>
                    <DialogFooter className="justify-end">
                        <Button type={"submit"} variant={"destructive"} disabled={submitting || Object.keys(errors).length != 0}>
                            Delete Page
                        </Button>
                        <DialogClose asChild>
                            <Button variant="secondary" disabled={submitting}>
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}