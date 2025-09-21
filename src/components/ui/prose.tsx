import React from "react";
import { cn } from "@/lib/utils";

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Prose component for static content pages
 * Provides consistent typography and spacing for long-form content
 * Used across About, Contact, Privacy, Terms, and Offline pages
 */
export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        // Base prose styling
        "prose prose-neutral dark:prose-invert max-w-none",
        // Custom styling for brand consistency
        "prose-headings:font-bold prose-headings:text-foreground",
        "prose-h1:text-3xl prose-h1:lg:text-4xl prose-h1:mb-6",
        "prose-h2:text-2xl prose-h2:lg:text-3xl prose-h2:mb-4 prose-h2:mt-8",
        "prose-h3:text-xl prose-h3:lg:text-2xl prose-h3:mb-3 prose-h3:mt-6",
        "prose-p:leading-relaxed prose-p:text-muted-foreground",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-strong:text-foreground prose-strong:font-semibold",
        "prose-ul:space-y-2 prose-ol:space-y-2",
        "prose-li:text-muted-foreground",
        // Links and buttons
        "prose-a:transition-colors prose-a:font-medium",
        // Code styling
        "prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
        "prose-pre:bg-muted prose-pre:border",
        // Blockquotes
        "prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-2",
        // Tables
        "prose-table:border prose-thead:bg-muted",
        "prose-th:border prose-th:px-4 prose-th:py-2",
        "prose-td:border prose-td:px-4 prose-td:py-2",
        className
      )}
    >
      {children}
    </div>
  );
}
