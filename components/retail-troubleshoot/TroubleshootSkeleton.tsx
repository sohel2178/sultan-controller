"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TroubleshootSkeleton() {
  return (
    <div className="space-y-6">
      {/* Health Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div className="space-y-3">
              <Skeleton className="h-8 w-56" />
              <Skeleton className="h-5 w-28" />

              <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-72" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-52" />
              </div>
            </div>

            <div className="flex gap-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl border p-4 space-y-3 min-w-25"
                >
                  <Skeleton className="h-8 w-12 mx-auto" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
              ))}
            </div>
          </div>

          <Skeleton className="mt-6 h-14 w-full rounded-lg" />
        </CardContent>
      </Card>

      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(7)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />

                  <div className="space-y-2">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Root Cause */}
        <Card className="md:col-span-2 xl:col-span-3">
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />

            <div className="rounded-lg border p-4 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
