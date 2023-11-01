"use client";

import {useEffect, useState} from "react";
import axios from "axios";

interface CategoryInfoCellProps {
    boardId: string;
}

export const CategoryInfoCell = ({
                                     boardId
                                 }: CategoryInfoCellProps) => {
    const [categoryName, setCategoryName] = useState<string | null>("");

    useEffect(() => {
        const apiUrl = `/api/admin/board/category/${boardId}`;

        axios
            .get(apiUrl)
            .then((response) => {
                const boardName = response.data.name;
                setCategoryName(boardName);
            })
            .catch((error) => {
                console.error("API call error:", error);
            });


    }, [boardId]);

    return (
        <div>
            {categoryName}
        </div>
    );
};
