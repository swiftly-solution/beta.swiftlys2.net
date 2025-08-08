import Cookies from "js-cookie";
import { PlusIcon, UploadIcon } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { PrepareForm } from "~/lib/forms";
import { useAPI } from "~/lib/ws";
import uploadPagesSchema from "~/validation/admin/docs/uploadpages";
import { handleZodValidation, type ValidationError } from "~/validation/HandleValidation";

export default function AdminUploadPages() {
    const api = useAPI()
    const [submitting, setSubmitting] = useState(false)

    const [errors, setErrors] = useState<ValidationError<typeof uploadPagesSchema>>({})

    const changeCreatePage = (e: FormEvent<HTMLFormElement>) => {
        handleZodValidation({
            onError: setErrors,
            data: PrepareForm(e),
            onSuccess: () => {
                setErrors({})
            },
            schema: uploadPagesSchema
        })
    }

    const submitCreatePage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (errors.content || errors.category) return;

        setSubmitting(true)

        setTimeout(() => {
            let dt = PrepareForm(e)
            dt.token = String(Cookies.get("session"))

            toast.promise(
                new Promise<Record<string, any>>((resolve, reject) => {
                    api?.sendEvent("upload-docs-pages", dt, (data) => {
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
                <Button variant={"secondary"}><UploadIcon className="mr-2" /> Upload Pages</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={submitCreatePage} onChange={changeCreatePage}>
                    <DialogHeader>
                        <DialogTitle>Upload Pages</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-6 pt-6 pb-6">
                        <div className="grid gap-2">
                            <Label htmlFor="content">Content Generated</Label>
                            <Textarea
                                disabled={submitting}
                                id="content"
                                placeholder="Content Generated"
                                required
                                style={{ maxHeight: "300px" }}
                                error={errors["content"]}
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
                            Upload Pages
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