import { cn } from "@/lib/utils";
import { Plus, Check } from "lucide-react";

interface SkillChipProps {
    name: string;
    level: string;
    onAdd: () => void;
    isAdded?: boolean;
}

export function SkillChip({ name, level, onAdd, isAdded = false }: SkillChipProps) {
    return (
        <button
            onClick={onAdd}
            disabled={isAdded}
            className={cn(
                "group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                isAdded
                    ? "bg-green-50 text-green-700 border-green-200 cursor-default"
                    : "bg-white hover:bg-violet-50 text-slate-700 hover:text-violet-700 border-slate-200 hover:border-violet-200 shadow-sm hover:shadow active:scale-95"
            )}
        >
            <span>{name}</span>
            <span className="opacity-50 text-[10px]">• {level}</span>
            {isAdded ? (
                <Check className="w-3 h-3 text-green-600" />
            ) : (
                <Plus className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
        </button>
    );
}
