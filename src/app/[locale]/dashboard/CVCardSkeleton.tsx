export function CVCardSkeleton() {
    return (
        <div className="flex flex-col gap-4 animate-pulse">
            {/* Preview Section Skeleton */}
            <div className="h-[300px] w-full rounded-3xl bg-gray-200 border border-gray-100" />

            {/* Info Section Skeleton */}
            <div className="flex flex-col gap-3 px-1">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-2">
                        {/* Title Skeleton */}
                        <div className="h-6 w-3/4 rounded-md bg-gray-200" />
                        {/* Metadata Skeleton */}
                        <div className="h-4 w-1/2 rounded-md bg-gray-200" />
                    </div>
                    {/* Menu Button Skeleton */}
                    <div className="h-8 w-8 rounded-md bg-gray-200" />
                </div>

                {/* Buttons Skeleton */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="h-10 rounded-xl bg-gray-200" />
                    <div className="h-10 rounded-xl bg-gray-200" />
                </div>
            </div>
        </div>
    );
}
