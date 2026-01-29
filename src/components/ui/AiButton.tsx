import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/components/ui/button";

interface AiButtonProps extends ButtonProps {
    isLoading?: boolean;
    loadingText?: string;
    icon?: React.ReactNode;
}

export function AiButton({
    className,
    children,
    isLoading,
    loadingText = "Generating...",
    icon,
    disabled,
    ...props
}: AiButtonProps) {
    return (
        <Button
            className={cn(
                "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white border-0 hover:opacity-90 shadow-lg shadow-purple-500/20 transition-all duration-300",
                isLoading && "opacity-80 cursor-wait",
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {loadingText}
                </>
            ) : (
                <>
                    {icon || <Sparkles className="w-4 h-4 mr-2" />}
                    {children}
                </>
            )}
        </Button>
    );
}
