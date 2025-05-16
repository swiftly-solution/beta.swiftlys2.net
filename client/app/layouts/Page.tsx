import type { ReactNode } from "react";
import Footer from "~/elements/index/Footer";
import Header from "~/elements/index/Header";

export default function PageLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}