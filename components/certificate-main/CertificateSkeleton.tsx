"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CertificateSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      {/* Toolbar Skeleton */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-10 w-40" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-44" />
        </div>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead className="border-b bg-muted/50">
          <tr>
            <HeaderCell width="50px" />
            <HeaderCell width="180px" />
            <HeaderCell width="180px" />
            <HeaderCell width="170px" />
            <HeaderCell width="180px" />
            <HeaderCell width="120px" />
            <HeaderCell width="130px" />
            <HeaderCell width="140px" />
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 8 }).map((_, index) => (
            <tr key={index} className="border-b">
              {/* SL */}
              <td className="px-4 py-4">
                <Skeleton className="mx-auto h-4 w-6" />
              </td>

              {/* Certificate */}
              <td className="px-4 py-4">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="mt-2 h-3 w-24" />
              </td>

              {/* Owner */}
              <td className="px-4 py-4">
                <Skeleton className="h-4 w-36" />
              </td>

              {/* Registration */}
              <td className="px-4 py-4">
                <Skeleton className="h-4 w-32" />
              </td>

              {/* IMEI */}
              <td className="px-4 py-4">
                <Skeleton className="h-4 w-40" />
              </td>

              {/* Status */}
              <td className="px-4 py-4">
                <Skeleton className="h-7 w-24 rounded-full" />
              </td>

              {/* Issue Date */}
              <td className="px-4 py-4">
                <Skeleton className="h-4 w-24" />
              </td>

              {/* Actions */}
              <td className="px-4 py-4">
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t p-4">
        <Skeleton className="h-4 w-40" />

        <div className="flex gap-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function HeaderCell({ width }: { width: string }) {
  return (
    <th className="px-4 py-3 text-left">
      <Skeleton
        className="h-4"
        style={{
          width,
        }}
      />
    </th>
  );
}
