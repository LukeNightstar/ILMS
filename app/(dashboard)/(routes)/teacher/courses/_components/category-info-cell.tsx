"use client";

import {useEffect, useState} from "react";
import axios from "axios";

interface CategoryInfoCellProps {
    categoryId: string;
}

export const CategoryInfoCell = ({
                                     categoryId
                                 }: CategoryInfoCellProps) => {
    const [categoryName, setCategoryName] = useState<string | null>("");

    useEffect(() => {
        const apiUrl = `/api/admin/course/category/${categoryId}`;

        axios
            .get(apiUrl)
            .then((response) => {
                const boardName = response.data.name;
                setCategoryName(boardName);
            })
            .catch((error) => {
                console.error("API call error:", error);
            });


    }, [categoryId]);

    return (
        <div>
            {categoryName}
        </div>
    );
};
