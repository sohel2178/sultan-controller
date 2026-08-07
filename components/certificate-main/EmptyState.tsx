"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileCheck2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function EmptyState() {
  const pathname = usePathname();

  const createHref = pathname.includes("rangs-certificate")
    ? "/rangs-certificate/new"
    : "/certificate/new";

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="rounded-full bg-primary/10 p-5">
        <FileCheck2 className="h-12 w-12 text-primary" />
      </div>

      <h2 className="mt-6 text-xl font-semibold">No Certificates Found</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        No GPS compliance certificates have been created yet. Generate your
        first certificate to start managing vehicle verification.
      </p>

      <Button asChild className="mt-6">
        <Link href={createHref}>
          <Plus className="mr-2 h-4 w-4" />
          Create Certificate
        </Link>
      </Button>
    </div>
  );
}
