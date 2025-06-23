"use client";

export default function ShimmerTasks() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 animate-pulse">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="h-8 bg-muted rounded w-64 mb-2"></div>
          <div className="h-4 bg-muted rounded w-96"></div>
        </div>

        {/* Search bar and filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="h-10 bg-muted rounded w-full sm:w-2/3"></div>
          <div className="h-10 bg-muted rounded w-full sm:w-1/3"></div>
        </div>

        {/* Task list shimmer */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-muted border border-border rounded-lg p-6 h-36"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
