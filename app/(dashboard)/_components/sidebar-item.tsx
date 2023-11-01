import {LucideIcon} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";

import {cn} from "@/lib/utils";
import React from "react";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
}

export const SidebarItem = ({
                                icon: Icon,
                                label,
                                href,
                            }: SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive =
        (pathname === "/" && href === "/") ||
        pathname === href ||
        pathname?.startsWith(`${href}/`);

    // 버튼 태그에 링크 연결
    const onClick = () => {
        router.push(href);
    }

    // 사이드바 item 설정
    return (
        <button onClick={onClick} type="button"
                className={cn(
                    "group flex p-2.5 w-full justify-start font-bold text-base " +
                    "cursor-pointer hover:bg-white/10 rounded-lg transition",
                    isActive ? "bg-blue-800 hover:bg-blue-700" : "hover:bg-slate-600"
                )}>
            <div className="flex flex-1 items-center text-white">
                <Icon className={cn("h-5.5 w-5.5 mr-3 text-cyan-300")}/>
                {label}
            </div>
        </button>
    )
}