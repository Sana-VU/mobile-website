"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    "aria-label"?: string;
    "aria-describedby"?: string;
  }
>(({ className, ...props }, ref) => {
  const values = (props as { value?: number[]; defaultValue?: number[] })
    .value ??
    (props as { value?: number[]; defaultValue?: number[] }).defaultValue ?? [
      0,
    ];

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {values.map((value, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className="block h-5 w-5 rounded-full border border-primary/50 bg-background shadow-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          aria-label={
            values.length === 1
              ? props["aria-label"] || "Slider value"
              : `${props["aria-label"] || "Slider"} value ${i + 1}`
          }
          aria-valuemin={props.min}
          aria-valuemax={props.max}
          aria-valuenow={value}
          aria-describedby={props["aria-describedby"]}
        />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
