"use client";

import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {useDebounce} from "@/hooks/use-debounce";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import qs from "query-string";

export const SearchInput = () => {
    const [value, setValue] = useState("")
    const debouncedValue = useDebounce(value);

    const searchParams = useSearchParams() || new URLSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategoryId = searchParams.get("categoryId");
    const currentBoardId = searchParams.get("boardId");
    const currentIsMarked = searchParams.get("isMarked");

    // TODO : 수정 필요
    useEffect(() => {
        const url = qs.stringifyUrl({
            //@ts-ignore
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                boardId: currentBoardId,
                title: debouncedValue,
                isMarked: currentIsMarked,
            }
        }, {skipEmptyString: true, skipNull: true});
        router.push(url);
    }, [debouncedValue, currentCategoryId, currentBoardId, router, pathname, currentIsMarked]);

    return (
        <div className="relative">
            <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600"/>
            <Input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="md:w-[400px] pl-9 rounded-md bg-slate-100 focus-visible:ring-slate-400"
                placeholder="필요한 것을 검색하세요..."
            />
        </div>
    );
}