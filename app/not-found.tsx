import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main
      className="mx-auto flex min-h-[65vh] w-full max-w-3xl flex-col items-start justify-center px-4 py-20 sm:px-6"
      id="main-content"
    >
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
        Justin Pan
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
        This page is not part of the portfolio, or it may have moved.
      </p>
      <Link className={`${buttonVariants()} mt-8`} href="/">
        Return home
      </Link>
    </main>
  );
}
