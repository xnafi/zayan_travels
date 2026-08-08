"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <AlertTriangle className="h-12 w-12 text-brand-secondary" />
      <h2 className="font-display text-2xl font-bold text-brand-dark">
        Something went wrong
      </h2>
      <p className="max-w-md text-brand-muted">
        An unexpected error occurred while loading this page. Please try again.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}