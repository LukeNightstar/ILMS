"use client";

import {usePathname, useRouter} from "next/navigation";
import {CheckCircle, PlayCircle} from "lucide-react";
import {cn} from "@/lib/utils";

interface CourseSidebarItemProps {
    label: string;
    id: string;
    isCompleted: boolean;
    courseId: string;
}

export const CourseSidebarItem = ({
                                      label,
                                      id,
                                      isCompleted,
                                      courseId
                                  }: CourseSidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const Icon = isCompleted ? CheckCircle : PlayCircle;
    const isActive = pathname?.includes(id);

    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`);
    }

    return (
        <button onClick={onClick} type="button"
                className={cn(
                    "group flex items-center w-full justify-start gap-x-2 text-slate-500 text-base px-2 py-4 hover:text-slate-600 hover:bg-white/10 transition rounded-lg",
                    isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700 rounded-lg",
                    isCompleted && "text-emerald-700 hover:text-emerald-700",
                    isCompleted && isActive && "bg-emerald-200/20",
                )}
        >
            <div className="flex flex-1 items-center text-white pl-1">
                <Icon
                    size={25}
                    className={cn(
                        "text-white mr-3",
                        isActive && "text-yellow-200",
                        isCompleted && "text-emerald-400"
                    )}
                />
                <div className="overflow-hidden whitespace-nowrap">
                    <p className="flex font-semibold overflow-x-scroll scrollbar-hide">
                        {label}
                    </p>
                </div>
            </div>
            <div className={cn(
                "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
                isActive && "opacity-100",
                isCompleted && "border-emerald-700"
            )}/>
        </button>
    )
};