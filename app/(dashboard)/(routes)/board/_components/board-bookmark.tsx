"use client";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import qs from "query-string";
import {AiFillStar} from "react-icons/ai";

export const BoardBookmark = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams() || new URLSearchParams();

    const currentTitle = searchParams.get("title");
    const isSelected = searchParams.get("isMarked");

    const onClick = () => {
        const url = qs.stringifyUrl({
            //@ts-ignore
            url: pathname,
            query: {
                title: currentTitle,
                isMarked: isSelected ? null : true,
            }
        }, {skipNull: true, skipEmptyString: true});
        router.push(url);
    };

    const Icon = AiFillStar;

    return (
        <>
            <Button
                onClick={onClick}
                className={
                    cn("py-2 px-3 text-sm border border-slate-200 rounded-lg bg-white text-black " +
                        "flex items-center gap-x-1 hover:bg-blue-800 transition hover:text-white shadow-sm ",
                        isSelected && "border-sky-700 bg-sky-200/20 "
                    )} type="button">
                <Icon size={20} className="text-yellow-300"/>
                <div className="truncate">
                    북마크
                </div>
            </Button>
        </>
    )
}