import Cookies from "js-cookie"
import { useEffect, useState, type FormEvent } from "react"
import { Link, useLocation, useNavigate, type MetaArgs } from "react-router"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { PrepareForm } from "~/lib/forms"
import { useAPI } from "~/lib/ws"
import { useUserStore, type User } from "~/stores/user"
import signupSchema from "~/validation/auth/signup"
import { handleZodValidation, type ValidationError } from "~/validation/HandleValidation"

export function meta({ }: MetaArgs) {
    return [
        { title: "Swiftly - Sign Up - Source 2 Server Framework" },
        { name: "description", content: "Swiftly is a server modification plugin for Source 2 games which is using Metamod:Source." }
    ]
}

export default function Page() {
    const api = useAPI();

    const [submitting, setSubmitting] = useState(false)
    const [errors, setErrors] = useState<ValidationError<typeof signupSchema>>({})
    const location = useLocation()
    const navigate = useNavigate()
    const query = new URLSearchParams(location.search)
    const userStore = useUserStore();

    useEffect(() => {
        if (userStore.user != undefined) navigate(query.has("from") ? String(query.get("from")) : "/profile");
    }, [userStore.user])

    const changeSignUp = (e: FormEvent<HTMLFormElement>) => {
        handleZodValidation({
            onError: setErrors,
            data: PrepareForm(e),
            onSuccess: () => {
                setErrors({})
            },
            schema: signupSchema
        })
    }

    const submitSignUp = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (errors.email || errors.password || errors.confirmpassword || errors.username) return;

        setSubmitting(true)

        setTimeout(() => {
            toast.promise(
                new Promise<Record<string, any>>((resolve, reject) => {
                    api?.sendEvent("auth-signup", PrepareForm(e), (data) => {
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
                <form onSubmit={submitSignUp} onChange={changeSignUp}>
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
                                Got an account?{" "}
                                <Link to={`/auth/login${query.has("from") ? `?from=${encodeURIComponent(String(query.get("from")))}` : ""}`} className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    disabled={submitting}
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    required
                                    error={errors["username"]}
                                />

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

                                <Label htmlFor="confirmpassword">Confirm Password</Label>
                                <Input
                                    disabled={submitting}
                                    id="confirmpassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    minLength={8}
                                    required
                                    error={errors["confirmpassword"]}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={submitting || errors["password"] != undefined || errors["confirmpassword"] != undefined || errors["username"] != undefined || errors["email"] != undefined}>
                                Sign Up
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
        </div>
    )
}