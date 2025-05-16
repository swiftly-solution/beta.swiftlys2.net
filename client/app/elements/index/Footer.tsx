import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="w-full bg-white dark:bg-background">
            <hr className="w-full bg-zinc-700 mx-auto h-px border-0" />

            <section className="container mx-auto py-12 flex flex-row w-screen">
                <div className="col-span-full xl:col-span-2">
                    <Link
                        rel="noreferrer noopener"
                        to={"/"}
                        className="font-bold text-xl flex"
                    >
                        SwiftlyS2
                    </Link>

                    <div className="mt-2 block">
                        Swiftly Solution SRL<br />
                        Reg. Nr. 30884766, J2012000439218
                    </div>
                </div>

                <div className="ml-auto hidden md:flex flex-row gap-24">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">Follow US</h3>
                        <div>
                            <a
                                rel="noreferrer noopener"
                                href="https://github.com/swiftly-solution"
                                className="opacity-60 hover:opacity-100"
                            >
                                Github
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">Community</h3>
                        <div>
                            <a
                                rel="noreferrer noopener"
                                href="https://swiftlycs2.net/discord"
                                className="opacity-60 hover:opacity-100"
                            >
                                Discord
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container pb-14 text-center mx-auto">
                <h3>
                    &copy; 2025 Copyright{" "}
                    <a
                        rel="noreferrer noopener"
                        target="_blank"
                        href="https://github.com/swiftly-solution"
                        className="text-[#00ffee] transition-all duration-100 border-primary hover:border-b-2"
                    >
                        Swiftly Solution SRL
                    </a>
                </h3>
            </section>
        </footer>
    )
}