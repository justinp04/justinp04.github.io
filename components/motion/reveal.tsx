"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export function Reveal({ children, className }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || !("IntersectionObserver" in window)) {
      return;
    }

    element.dataset.revealReady = "true";
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        element.dataset.visible = "true";
        observer.disconnect();
      }
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("reveal", className)} ref={elementRef}>
      {children}
    </div>
  );
}
