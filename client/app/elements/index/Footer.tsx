import { Link } from "react-router";
import { useServerStore } from "~/stores/server";

export default function Footer({ hideSection }: { hideSection?: boolean }) {
    const server = useServerStore((state) => state.server_name)

    return (
        <footer className="w-full bg-white dark:bg-background">
            <hr className="w-full bg-zinc-700 mx-auto h-px border-0" />

            {
                hideSection ? null :
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

                            <div className="mt-2 text-base flex items-center gap-2 text-zinc-700 opacity-70">
                                <svg viewBox="0 0 128 128" width="16" height="16">
                                    <path fill="#fff" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"></path>
                                </svg>
                                <div>- Server: {server}</div>
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
            }

            <section className="container pb-6 text-center mx-auto">
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