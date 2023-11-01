import Link from "next/link"
import React from 'react';
import {SidebarRoutes} from "@/app/(dashboard)/_components/sidebar-routes";
import {Logo} from "@/app/(dashboard)/_components/logo";
import {Separator} from "@/components/ui/separator";
import {UserInfo} from "@/components/user-info";

// 사이드바 하단 세팅
/*const routes_settings = [
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        color: "white"
    }
];*/

const Sidebar = () => {

    // cn:(객체로 통쨰 전달)을 위한 pathname 값 설정
    // const pathname = usePathname();

    return (
        // #25262D = 37, 38, 45
        <div className="bg-gray-900 shadow-lg border-r w-[300px] h-screen overflow-hidden p-4 relative">

            {/* 로고 */}
            <div>
                <Link href="/" className="mt-4 flex items-center justify-center">
                    <Logo/>
                </Link>
            </div>

            <Separator className="mt-8"/>
            {/* 상단 정보 29 30 36 */}
            {/* 현재 접속 유저 정보 표시 완료 */}
            <div className="pt-3.5 pb-1.5 px-1.5 mt-4 mb-4 flex-col space-y-2 text-white bg-blue-900/60 rounded-lg">
                <UserInfo/>
            </div>
            <Separator className="mb-4"/>

            {/* 메뉴 */}
            {/* Sidebar-Item, Sidebar-routes로 분리 작업 > 분리 완료*/}
            <div className="flex flex-col">
                <SidebarRoutes/>
            </div>

            {/* Settings */}
            {/*<div className="flex flex-col absolute bottom-0 left-0 p-5">
                {routes_settings.map((route) => (
                    <Link href={route.href} key={route.href}
                          className={cn("group flex p-3 w-full justify-start font-bold text-base" +
                              "cursor-pointer hover:bg-white/10 rounded-lg transition",
                              pathname === route.href ? "text-white bd-white" : "text-zinc-400")}>
                        <div className="flex items-center flex-1 text-white">
                            <route.icon className={cn("h-5.5 w-5.5 mr-3", route.color)}/>
                            {route.label}
                        </div>
                    </Link>
                ))}
            </div>*/}
        </div>

    );
};

export default Sidebar;
