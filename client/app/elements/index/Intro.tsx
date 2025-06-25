import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { getTheme } from "~/components/theme-provider";
import AutoConsole from "./AutoConsole";

export default function Intro() {
    return (
        <section className="w-full bg-white dark:bg-background">
            <div className="lg:max-w-screen-xl grid grid-cols-2 gap-8 mx-auto py-20 md:py-32 place-items-center">
                <div className="text-center space-y-8">
                    <div className="max-w-screen-lg mx-auto text-center text-3xl md:text-5xl font-bold">
                        <h1>
                            <span className="text-transparent bg-gradient-to-r from-[#00ffee] to-[#2cc66d] bg-clip-text">
                                Swiftly - Source2<br />Server Framework
                            </span>
                        </h1>
                    </div>

                    <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
                        Swiftly is a server modification plugin for Source2 games which is using Metamod:Source.
                    </p>

                    <div className="space-y-4 md:space-y-0 md:space-x-4">
                        <Link to={"/for-beginners"}>
                            <Button className="w-5/6 md:w-1/4 font-bold group/arrow px-2 cursor-pointer">
                                Get Started
                                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                            </Button>
                        </Link>

                        <Button
                            asChild
                            variant="secondary"
                            className="w-5/6 md:w-1/4 font-bold px-2"
                        >
                            <a
                                rel="noreferrer noopener"
                                href="https://github.com/swiftly-solution/swiftly/releases"
                                target="_blank"
                            >
                                Download
                            </a>
                        </Button>
                    </div>
                </div>

                <div className="w-full h-full max-w-[1200px] max-h-[350px]">
                    <div className="mx-auto rounded-lg border border-t-2 border-secondary border-t-primary/30 shadow-[0_0_20px_#00ffee] shadow-[#00ffee]/30">
                        <AutoConsole />
                    </div>
                </div>
            </div>
        </section>
    )
}