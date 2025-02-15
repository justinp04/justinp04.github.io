export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Justin Pan",
    description:
        "Make beautiful websites regardless of your design experience.",
    navItems: [
        {
            label: "About",
            href: "/",
        },
        {
            label: "Experience",
            href: "/docs",
        },
        {
            label: "Projects",
            href: "/pricing",
        },
        {
            label: "Contact",
            href: "/blog",
        },
    ],
    projects: [
        {
            name: "ePortfolio",
            link: "",
            repo: "",
            public: true,
        },
        {
            name: "MacroMunch",
            link: "",
            repo: "",
            public: true,
        },
        {
            name: "IN-ACTION",
            link: "",
            repo: "",
            public: false,
        },
    ],
    links: {
        github: "https://github.com/justinp04",
        linkedIn: "https://www.linkedin.com/in/justin-pan-055b0122b/",
    },
};
