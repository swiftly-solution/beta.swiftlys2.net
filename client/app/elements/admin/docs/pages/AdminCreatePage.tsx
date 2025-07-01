import Cookies from "js-cookie";
import { PlusIcon } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { PrepareForm } from "~/lib/forms";
import { useAPI } from "~/lib/ws";
import createPageSchema from "~/validation/admin/docs/createpage";
import { handleZodValidation, type ValidationError } from "~/validation/HandleValidation";

export default function AdminCreatePage() {
    const api = useAPI()
    const [submitting, setSubmitting] = useState(false)

    const [errors, setErrors] = useState<ValidationError<typeof createPageSchema>>({})

    const changeCreatePage = (e: FormEvent<HTMLFormElement>) => {
        handleZodValidation({
            onError: setErrors,
            data: PrepareForm(e),
            onSuccess: () => {
                setErrors({})
            },
            schema: createPageSchema
        })
    }

    const submitCreatePage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (errors.title || errors.key || errors.icon || errors.category) return;

        setSubmitting(true)

        setTimeout(() => {
            let dt = PrepareForm(e)
            dt.token = String(Cookies.get("session"))

            toast.promise(
                new Promise<Record<string, any>>((resolve, reject) => {
                    api?.sendEvent("create-docs-page", dt, (data) => {
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
                <Button variant={"secondary"}><PlusIcon className="mr-2" /> Create Page</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={submitCreatePage} onChange={changeCreatePage}>
                    <DialogHeader>
                        <DialogTitle>Create Page</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-6 pt-6 pb-6">
                        <div className="grid gap-2">
                            <Label htmlFor="key">Page Key</Label>
                            <Input
                                disabled={submitting}
                                id="key"
                                type="text"
                                placeholder="Page Key"
                                required
                                error={errors["key"]}
                            />

                            <Label htmlFor="title">Title</Label>
                            <Input
                                disabled={submitting}
                                id="title"
                                type="text"
                                placeholder="Title"
                                required
                                error={errors["title"]}
                            />

                            <Label htmlFor="icon">Icon</Label>
                            <Input
                                disabled={submitting}
                                id="icon"
                                type="text"
                                placeholder="Icon"
                                error={errors["icon"]}
                            />

                            <Label htmlFor="category">Category</Label>
                            <Input
                                disabled={submitting}
                                id="category"
                                type="text"
                                placeholder="Category"
                                error={errors["category"]}
                            />
                        </div>
                    </div>
                    <DialogFooter className="justify-end">
                        <Button type={"submit"} variant={"default"} disabled={submitting || Object.keys(errors).length != 0}>
                            Create Page
                        </Button>
                        <DialogClose asChild>
                            <Button variant="destructive" disabled={submitting}>
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}