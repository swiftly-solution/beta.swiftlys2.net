import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import panel from "~/../public/images/panel.webp";

export default function Intro() {
    return (
        <section className="w-full bg-white dark:bg-background">
            <div className="lg:max-w-screen-xl grid grid-cols-2 gap-8 mx-auto py-20 md:py-32 place-items-center">
                <div className="text-center space-y-8">
                    <div className="max-w-screen-lg mx-auto text-center text-3xl md:text-5xl font-bold">
                        <h1>
                            <span className="text-transparent px-2 bg-gradient-to-r from-[#00ffee] to-[#2cc66d] bg-clip-text">
                                Swiftly - Source 2<br />Server Framework
                            </span>
                        </h1>
                    </div>

                    <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
                        Swiftly is a server modification plugin for Source 2 games which is using Metamod:Source.
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
                                href="https://github.com/swiftly-solution/swiftly"
                                target="_blank"
                            >
                                Github Homepage
                            </a>
                        </Button>
                    </div>
                </div>

                <div>
                    <div className="relative inline-block">
                        <div className="absolute inset-0 rounded-xl blur-xl opacity-70" style={{ backgroundColor: "rgba(0, 255, 170, 0.6)", zIndex: "-1" }}></div>
                        <div className="relative z-10 p-2 rounded-xl">
                            <img src={panel} alt="dashboard" fetchPriority="high" className="w-full mx-auto rounded-lg border border-t-2 border-secondary border-t-primary/30 shadow-[0_0_20px_#00ffee] shadow-[#00ffee]/30" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}