import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function PageLoader() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <LoadingSpinner size={48} />
        </div>
    );
}
