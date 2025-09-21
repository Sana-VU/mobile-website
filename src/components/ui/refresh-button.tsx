"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function RefreshButton() {
  return (
    <Button
      onClick={() => window.location.reload()}
      className="flex items-center gap-2 px-8"
      size="lg"
    >
      <RefreshCw className="h-5 w-5" />
      Try Again
    </Button>
  );
}
