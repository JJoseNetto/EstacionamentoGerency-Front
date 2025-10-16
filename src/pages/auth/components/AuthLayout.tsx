import { cn } from "@/lib/utils";
import React from "react";

interface AuthLayoutProps extends React.PropsWithChildren {
  className?: string;
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4",
        className
      )}
    >
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
