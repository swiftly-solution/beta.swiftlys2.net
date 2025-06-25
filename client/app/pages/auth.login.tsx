import Cookies from "js-cookie"
import { useEffect, useState, type FormEvent } from "react"
import { Link, useLocation, useNavigate, type MetaArgs } from "react-router"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { PrepareForm } from "~/lib/forms"
import { useAPI } from "~/lib/ws"
import { useServerStore } from "~/stores/server"
import { useUserStore, type User } from "~/stores/user"
import loginSchema from "~/validation/auth/login"
import { handleZodValidation, type ValidationError } from "~/validation/HandleValidation"

export function meta({ }: MetaArgs) {
    return [
        { title: "Swiftly - Login - Source 2 Server Framework" },
        { name: "description", content: "Swiftly is a server modification plugin for Source 2 games which is using Metamod:Source." }
    ]
}

export default function Page() {
    const api = useAPI();
    const server = useServerStore((state) => state.server_name)
    const [submitting, setSubmitting] = useState(false)
    const [errors, setErrors] = useState<ValidationError<typeof loginSchema>>({})
    const location = useLocation()
    const navigate = useNavigate()
    const query = new URLSearchParams(location.search)
    const userStore = useUserStore();

    useEffect(() => {
        if (userStore.user != undefined) navigate(query.has("from") ? String(query.get("from")) : "/profile");
    }, [userStore.user])

    const changeLogin = (e: FormEvent<HTMLFormElement>) => {
        handleZodValidation({
            onError: setErrors,
            data: PrepareForm(e),
            onSuccess: () => {
                setErrors({})
            },
            schema: loginSchema
        })
    }

    const submitLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (errors.email || errors.password) return;

        setSubmitting(true)

        setTimeout(() => {
            toast.promise(
                new Promise<Record<string, any>>((resolve, reject) => {
                    api?.sendEvent("auth-login", PrepareForm(e), (data) => {
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
                        setTimeout(() => {
                            navigate(query.has("from") ? String(query.get("from")) : "/profile")
                        }, 1000);

                        userStore.setUser(data.user as User)
                        if (data.session) {
                            if (Cookies.get("session") != undefined) Cookies.remove("session")
                            Cookies.set("session", data.session, { expires: 1, secure: true })
                        }

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
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10 w-full">
            <div className="w-full max-w-sm">
                <form onSubmit={submitLogin} onChange={changeLogin}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <Link to={"/"} className="flex flex-col items-center gap-2 font-medium">
                                <div className="flex h-16 w-16 items-center justify-center rounded-md">
                                    <img src={"https://cdn.swiftlys2.net/swiftly-logo.png"} alt="SwiftlyS2" width={64} height={64} />
                                </div>
                                <span className="sr-only">SwiftlyS2</span>
                            </Link>
                            <h1 className="text-xl font-bold">Welcome to SwiftlyS2.</h1>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link to={`/auth/signup${query.has("from") ? `?from=${encodeURIComponent(String(query.get("from")))}` : ""}`} className="underline underline-offset-4">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    disabled={submitting}
                                    id="email"
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    required
                                    error={errors["email"]}
                                />

                                <Label htmlFor="password">Password</Label>
                                <Input
                                    disabled={submitting}
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    minLength={8}
                                    required
                                    error={errors["password"]}
                                />
                                <Link to={`/auth/forgot${query.has("from") ? `?from=${encodeURIComponent(String(query.get("from")))}` : ""}`} className="underline underline-offset-4 text-right cursor-pointer">
                                    <Label>Forgot password?</Label>
                                </Link>
                            </div>
                            <Button type="submit" className="w-full" disabled={submitting || errors["password"] != undefined || errors["email"] != undefined}>
                                Authenticate
                            </Button>
                        </div>
                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                Or
                            </span>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Button variant="outline" className="w-full">
                                Continue with GitHub
                            </Button>
                            <Button variant="outline" className="w-full">
                                Continue with Discord
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="text-base flex items-center gap-2 text-zinc-700 opacity-70">
                <svg viewBox="0 0 128 128" width="16" height="16">
                    <path fill="#fff" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"></path>
                </svg>
                <div>- {server}</div>
            </div>
        </div >
    )
}