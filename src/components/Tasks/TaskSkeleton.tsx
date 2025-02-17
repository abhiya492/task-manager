export const TaskSkeleton = () => {
    return (
      <div className="animate-pulse flex items-center gap-4 p-4 bg-background rounded-lg border">
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    );
  };