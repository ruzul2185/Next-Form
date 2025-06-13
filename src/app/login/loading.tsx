"use client";

import { Skeleton } from "@/components/ui/skeleton";

const LoginSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="grid gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
};

export default LoginSkeleton;
