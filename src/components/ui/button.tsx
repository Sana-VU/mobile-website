"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Premium button variants aligned with design system:
// Primary #2563EB with blue-700 hover, Secondary #7C3AED, rounded-2xl, soft shadows
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft hover:bg-primary-hover hover-lift press-down",
        destructive:
          "bg-destructive text-destructive-foreground shadow-soft hover:bg-red-600 hover-lift press-down",
        outline:
          "border border-border bg-background text-foreground shadow-soft hover:bg-accent hover:text-accent-foreground hover-lift",
        secondary:
          "bg-secondary text-secondary-foreground shadow-soft hover:bg-violet-700 hover-lift press-down",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground transition-smooth",
        subtle:
          "bg-accent/60 text-accent-foreground hover:bg-accent transition-smooth",
        link: "text-primary underline-offset-4 hover:underline transition-smooth",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
