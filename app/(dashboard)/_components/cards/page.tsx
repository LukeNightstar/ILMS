// setup card contents
import {FlaskConical, LayoutDashboard} from "lucide-react";
import {cn} from "@/lib/utils";
import React from "react";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";

const cardcontents = [
    {
        label: "TEST01 label",
        icon: FlaskConical,
        href: "#",
        topic: "TEST01",
        text: "This is Test typing",
    },
    {
        label: "TEST02 label",
        icon: FlaskConical,
        href: "#",
        topic: "TEST02",
        text: "This is Test typing",
    },
    {
        label: "TEST03 label",
        icon: FlaskConical,
        href: "#",
        topic: "TEST02",
        text: "This is Test typing",
    },
    {
        label: "TEST04 label",
        icon: FlaskConical,
        href: "#",
        topic: "TEST02",
        text: "This is Test typing",
    },
    {
        label: "TEST05 label",
        icon: FlaskConical,
        href: "#",
        topic: "TEST02",
        text: "This is Test typing",
    },
    {
        label: "TEST06 label",
        icon: FlaskConical,
        href: "#",
        topic: "TEST02",
        text: "This is Test typing",
    },
    {
        label: "TEST07 label",
        icon: FlaskConical,
        href: "#",
        topic: "TEST02",
        text: "This is Test typing",
    },
    {
        label: "TEST08 label",
        icon: FlaskConical,
        href: "#",
        topic: "TEST02",
        text: "This is Test typing",
    },
];

const CardsPage = () => {

    const pathname = usePathname();

    return (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mt-8 ">
            {cardcontents.map((contents) => (
                <div key={contents.href}
                     className={cn("group cursor-pointer rounded-lg bg-gray-500 " +
                         "hover:bg-dark-900 grid grid-cols-1 " +
                         "gap-3 transition-all duration-200 hover:shadow-lg p-6" +
                         "",
                     )}>
                    <div className="">
                        <contents.icon className={cn("bg-sky-600 h-10 w-10 rounded-md")}/>
                    </div>
                    <div className="flex flex-col">
                        <p>
                            {contents.label}
                        </p>
                        <p>
                            {contents.text}
                        </p>
                    </div>
                    <div>
                        <Button>자세히보기</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

/*routes{routes.map((route) => (
    <Link href={route.href} key={route.href}
          className={cn(buttonVariants({variant: "ghost"}),
              "group flex p-3 w-full justify-start font-bold text-base " +
              "cursor-pointer hover:bg-white/10 rounded-lg transition",
              // 사이드바 호버 기능
              pathname === route.href ? "bg-gray-500 hover:bg-gray-700" : "hover:bg-blue-500",
          )}>
        <div className="flex items-center flex-1 text-white">
            <route.icon className={cn("h-5.5 w-5.5 mr-3", route.color)}/>
            {route.label}
        </div>
    </Link>
))}*/

export default CardsPage;