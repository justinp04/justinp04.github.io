import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <h2 className="project-prose-heading">{children}</h2>,
    h3: ({ children }) => (
      <h3 className="project-prose-subheading">{children}</h3>
    ),
    p: ({ children }) => <p className="project-prose-paragraph">{children}</p>,
    ul: ({ children }) => <ul className="project-prose-list">{children}</ul>,
    ol: ({ children }) => <ol className="project-prose-list">{children}</ol>,
    li: ({ children }) => (
      <li className="project-prose-list-item">{children}</li>
    ),
    a: ({ children, href }) => (
      <a className="project-prose-link" href={href}>
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="project-prose-strong">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="project-prose-quote">{children}</blockquote>
    ),
    ...components,
  };
}
