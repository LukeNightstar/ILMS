"use client";

import {
    BookOpenCheck,
    Bot,
    CalendarRange,
    ClipboardList,
    GraduationCap,
    Home,
    LogOut,
    MessageSquare,
    Settings,
    UserIcon
} from "lucide-react";
import {usePathname} from "next/navigation";
import {SidebarItem} from "./sidebar-item";
import {useAuth} from "@clerk/nextjs";
import {isTeacher} from "@/lib/teacher";
import {isAdmin} from "@/lib/admin";
import {cn} from "@/lib/utils";
import React from "react";

// 일반
const defaultRoutes = [
    {
        label: "Home",
        icon: Home,
        href: "/home",
    },
    {
        label: "강의",
        icon: GraduationCap,
        href: "/courses",
    },
    {
        label: "과제",
        icon: BookOpenCheck,
        href: "/tasks",
    },
    {
        label: "캘린더",
        icon: CalendarRange,
        href: "/calendar",
    },
    {
        label: "게시판",
        icon: ClipboardList,
        href: "/board",
    },
    {
        label: "메세지",
        icon: MessageSquare,
        href: "/message/home",
    },
];

// teacher mode
const teacherRoutes = [
    {
        label: "유저",
        icon: UserIcon,
        href: "/teacher/users",
    },
    {
        label: "강의",
        icon: GraduationCap,
        href: "/teacher/courses",
    },
    {
        label: "과제",
        icon: BookOpenCheck,
        href: "/teacher/tasks/list",
    },
    {
        label: "게시판",
        icon: ClipboardList,
        href: "/teacher/boards",
    },
    {
        label: "나가기",
        icon: LogOut,
        href: "/home",
    },
]

const adminRoutes = [
    {
        label: "관리 모드",
        icon: Settings,
        href: "/teacher/courses"
    }
]

export const SidebarRoutes = () => {
    const {userId} = useAuth();
    const pathname = usePathname();

    // teacher 한정
    const isTeacherPage = pathname?.startsWith("/teacher");

    const routes = isTeacherPage ? teacherRoutes : defaultRoutes;

    const chatBotWindowFeature = 'width=582,height=592';

    const openChatBot = () => {
        const chatBotURL = '/chatbot';
        const chatBotWindow = window.open(chatBotURL, '_blank', chatBotWindowFeature);

        if (chatBotWindow) {
            chatBotWindow.focus();
        } else {
            alert('팝업 차단이 활성화되어 있습니다. 팝업 차단을 해제해주세요.');
        }
    };


    return (
        <div className="flex flex-col w-full space-y-2.5">
            {routes.map((route) => (
                <SidebarItem
                    key={route.label}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
            {!isTeacherPage && (
                <button onClick={openChatBot} type="button"
                        className={cn(
                            "group flex p-2.5 w-full justify-start font-bold text-base " +
                            "cursor-pointer hover:bg-white/10 rounded-lg transition",
                        )}>
                    <div className="flex flex-1 items-center text-white">
                        <Bot className={cn("h-5.5 w-5.5 mr-3 text-cyan-300")}/>
                        문의
                    </div>
                </button>
            )}
            {!isTeacherPage && (isTeacher(userId) || isAdmin(userId)) && (
                    adminRoutes.map((route) => (
                        <SidebarItem
                            key={route.label}
                            icon={route.icon}
                            label={route.label}
                            href={route.href}
                        />
                    ))
                )}
        </div>
    )
}