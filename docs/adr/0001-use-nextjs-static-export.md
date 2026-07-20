# Use Next.js static export

Build the portfolio with the Next.js App Router and `output: "export"`, producing static HTML for the homepage, project index, and every Project Case Study. This preserves React, TypeScript, Shadcn, local MDX, route-level metadata, and Netlify continuous deployment without adding a production server; it was chosen over a Vite SPA and Netlify's full Next.js runtime because the launch scope is entirely static.

The application must not depend on server-only Next.js features, and all case-study routes and assets must be known at build time. If the portfolio later requires request-time data, authentication, or server-side form handling, this decision should be revisited before introducing workarounds.
