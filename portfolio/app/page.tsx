import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Info from "@/components/about/info";

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-xl text-center justify-center">
                <span className={title()}>Hi, I'm&nbsp;</span>
                <span className={title({ color: "violet" })}>Justin Pan</span>
                <br />
                <span className={title()}>
                    your next Full-Stack Software Engineer.
                </span>
            </div>

            <div className="flex gap-3">
                <Link
                    isExternal
                    className={buttonStyles({
                        color: "primary",
                        radius: "full",
                        variant: "shadow",
                    })}
                    href={siteConfig.links.linkedIn} // Update this link
                >
                    Download My Resume
                </Link>
                <Link
                    isExternal
                    className={buttonStyles({
                        variant: "bordered",
                        radius: "full",
                    })}
                    href={siteConfig.links.github}
                >
                    <GithubIcon size={20} />
                    GitHub
                </Link>
            </div>

            <div id="About" className="w-10/12">
                <Info />
            </div>

            <div id="Experience" className="w-10/12"></div>

            <div id="Projects" className="w-10/12"></div>

            <div id="Cotact me" className="w-10/12"></div>
        </section>
    );
}
