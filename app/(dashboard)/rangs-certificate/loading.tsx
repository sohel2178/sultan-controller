import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto w-[210mm] rounded-xl bg-white p-10 shadow-xl">
        <Skeleton className="h-20 w-full rounded-xl" />

        <Skeleton className="mt-8 h-24 w-full rounded-xl" />

        <div className="mt-8 grid grid-cols-3 gap-6">
          <Skeleton className="h-85 rounded-xl" />
          <Skeleton className="h-85 rounded-xl" />
          <Skeleton className="h-85 rounded-xl" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <Skeleton className="h-105 rounded-xl" />
          <Skeleton className="h-105 rounded-xl" />
        </div>

        <Skeleton className="mt-8 h-32 rounded-xl" />
      </div>
    </main>
  );
}
