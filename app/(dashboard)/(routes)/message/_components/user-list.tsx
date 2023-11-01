"use client";

import {BotIcon} from "lucide-react";
import {UserData} from "@/app/(dashboard)/(routes)/message/_components/user-data";

const defaultRoutes = [
    {
        label: "챗봇에게 문의하기",
        icon: BotIcon,
        href: "/message/chatbot",
    },
]

export const UserList = () => {

    return (
        <div className="text-white">
            {defaultRoutes.map((route) => (
                <UserData
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}