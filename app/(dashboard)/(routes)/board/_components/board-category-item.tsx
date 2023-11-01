"use client";

import {IconType} from "react-icons";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import qs from "query-string";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface BoardCategoryItemProps {
    label: string;
    value: string;
    icon?: IconType;
}

export const BoardCategoryItem = ({
                                      label,
                                      value,
                                      icon: Icon,
                                  }: BoardCategoryItemProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams() || new URLSearchParams();

    const currentBoardId = searchParams.get("boardId");
    const currentTitle = searchParams.get("title");

    const isSelected = currentBoardId === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            //@ts-ignore
            url: pathname,
            query: {
                title: currentTitle,
                boardId: isSelected ? null : value,
            }
        }, {skipNull: true, skipEmptyString: true});
        router.push(url);
    };

    // TODO : 카테고리 qr 수정 필요, 게시판 누르고 검색하면 게시판이 초기화됨
    // 2023.10.08 수정 완료
    // search-input.tsx 수정정

    return (
        <Button
            onClick={onClick}
            className={
                cn("py-2 px-3 text-sm border border-slate-200 rounded-lg bg-white text-black " +
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