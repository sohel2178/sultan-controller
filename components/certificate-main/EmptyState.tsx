"use client";

import Link from "next/link";
import { FileCheck2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
        <FileCheck2 className="h-10 w-10 text-orange-600" />
      </div>

      <h2 className="mt-6 text-xl font-semibold">No Certificates Found</h2>

      <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
        No GPS compliance certificates have been created yet. Generate your
        first certificate to start managing vehicle verification.
      </p>

      <Button asChild className="mt-6">
        <Link href="/certificate/new">
          <Plus className="mr-2 h-4 w-4" />
          Create Certificate
        </Link>
      </Button>
    </div>
  );
}
