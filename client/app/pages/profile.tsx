import { useAPI } from "~/lib/ws";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import PageWithNavbarLayout from "~/layouts/PageWithNavbar";
import { useUserStore } from "~/stores/user";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Gravatar from 'react-gravatar'
import { Button } from "~/components/ui/button";

export default function Page() {
    const api = useAPI();

    const user = useUserStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (user.contentLoaded == true) {
            if (!user.user) navigate("/auth/login")
        }
    }, [user])

    return (
        <PageWithNavbarLayout>
            {
                !user.user ? "Loading..." :
                    <>
                        <div className="sm:flex sm:flex-col md:grid md:grid-cols-2 gap-2">
                            <Card>
                                <CardContent>
                                    <div className="sm:flex sm:flex-col md:grid md:grid-cols-2">
                                        <div>
                                            <Gravatar email={user.user!.email} size={256} style={{ borderRadius: "50%", marginLeft: "auto", marginRight: "auto" }} />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xl font-semibold">{user.user.username}</span>
                                            <span>ID: {user.user.id}</span>
                                            <span>Email: {user.user.email}</span>
                                            <span>Github: linked</span>
                                            <span>Discord: linked</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="flex flex-col">
                                <CardContent>
                                    <span className="text-xl font-semibold align-middle"> Two Factor Authenticator</span>
                                    <div className="flex flex-col gap-1">
                                        <span>Informations about 2FA.</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="mt-auto">
                                    <Button variant={"secondary"} className="ml-auto" size={"lg"}>
                                        Configure
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card className="flex flex-col">
                                <CardContent>
                                    <span className="text-xl font-semibold align-middle"> Discord Connection</span>
                                    <div className="flex flex-col gap-1">
                                        <span>Status: Linked.</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="mt-auto">
                                    <Button variant={"secondary"} className="ml-auto" size={"lg"}>
                                        Configure
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card className="flex flex-col">
                                <CardContent>
                                    <span className="text-xl font-semibold align-middle"> Github Connection</span>
                                    <div className="flex flex-col gap-1">
                                        <span>Status: Linked.</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="mt-auto">
                                    <Button variant={"secondary"} className="ml-auto" size={"lg"}>
                                        Configure
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </>
            }
        </PageWithNavbarLayout>
    )
}