"use client";

import qs from "query-string";
import {IconType} from "react-icons";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

interface CategoryItemProps {
    label: string;
    value?: string;
    icon?: IconType;
}

export const CategoryItem = ({
                                 label,
                                 value,
                                 icon: Icon,
                             }: CategoryItemProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    //@ts-ignore
    const currentCategoryId = searchParams.get("categoryId");
    //@ts-ignore
    const currentTitle = searchParams.get("title");

    const isSelected = currentCategoryId === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            //@ts-ignore
            url: pathname,
            query: {
                title: currentTitle,
                categoryId: isSelected ? null : value,
            }
        }, {skipNull: true, skipEmptyString: true});
        router.push(url);
    };

    return (
        <Button
            onClick={onClick}
            className={
                cn("py-2 px-3 text-sm border border-slate-200 rounded-full bg-white text-black " +
                    "flex items-center gap-x-1 hover:bg-blue-800 transition hover:text-white shadow-sm ",
                    isSelected && "border-sky-700 bg-sky-200/20 "
                )} type="button">
            {Icon && <Icon size={20}/>}
            <div className="truncate">
                {label}
            </div>
        </Button>
    )
};