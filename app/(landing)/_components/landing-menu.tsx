"use client"

import {cn} from "@/lib/utils"

import * as React from "react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/app/(landing)/_components/Navigation-menu"
import DropdownNotice from "@/app/(landing)/_components/DropdownNotice";
import DropdownFAQ from "@/app/(landing)/_components/DropdownFAQ";

export default function AuthenticationPage() {

    return (
        <div>
            <NavigationMenu>
                <NavigationMenuList className="gap-[20px]">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Notice</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <DropdownNotice/>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>FAQ</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <DropdownFAQ/>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md page-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"