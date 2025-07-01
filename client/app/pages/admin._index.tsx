import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, type MetaArgs } from "react-router";
import AdminNavigation from "~/elements/admin/AdminNavigation";
import PageWithNavbarLayout from "~/layouts/PageWithNavbar";
import { useUserStore } from "~/stores/user";

export function meta({ }: MetaArgs) {
    return [
        { title: "Admin - Source 2 Server Framework" },
        { name: "description", content: "Swiftly is a server modification plugin for Source 2 games which is using Metamod:Source." }
    ]
}

export default function Page() {
    const userStore = useUserStore();
    const navigate = useNavigate()

    useEffect(() => {
        if (userStore.contentLoaded) {
            if (!userStore.user) navigate("/")
            else if (!userStore.user.admin) navigate("/")
        }
    }, [userStore.user, userStore.contentLoaded])

    return (
        <PageWithNavbarLayout head={<></>} navbar={<AdminNavigation />}>
            {
                !userStore.contentLoaded ? <LoaderIcon size={64} className="animate-spin" /> :
                    (
                        <></>
                    )
            }
        </PageWithNavbarLayout>
    )
}