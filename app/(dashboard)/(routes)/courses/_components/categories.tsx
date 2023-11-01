"use client";

import {Category} from ".prisma/client";

import {IconType} from "react-icons";
import {FcEngineering, FcFilm, FcMindMap, FcMultipleDevices, FcMusic, FcNext, FcSurvey} from "react-icons/fc";

import {CategoryItem} from "./category-item";

// 카테고리 props
interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
    "C": FcMusic,
    "Java": FcMultipleDevices,
    "SpringBoot": FcEngineering,
    "MySql": FcEngineering,
    "Prisma": FcEngineering,
    "Node.js": FcMindMap,
    "React": FcMindMap,
    "TypeScript": FcSurvey,
    "Next.js": FcNext,
};

export const Categories = ({
                               items,
                           }: CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
}
