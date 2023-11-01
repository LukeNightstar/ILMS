"use client";

import {Board} from "@prisma/client"
import {IconType} from "react-icons";
import {FcEmptyFilter, FcGlobe, FcQuestions, FcSupport} from "react-icons/fc";
import {BoardCategoryItem} from "@/app/(dashboard)/(routes)/board/_components/board-category-item";
import {BoardBookmark} from "@/app/(dashboard)/(routes)/board/_components/board-bookmark";

interface BoardCategoriesProps {
    items: Board[];
}

const iconMap: Record<Board["name"], IconType> = {
    "공지": FcEmptyFilter,
    "자유": FcGlobe,
    "질문": FcQuestions,
    "코드": FcSupport,
};

export const BoardCategories = ({
                                    items,
                                }: BoardCategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto">
            {items.map((item) => (
                <BoardCategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
            <BoardBookmark/>
        </div>
    )
}