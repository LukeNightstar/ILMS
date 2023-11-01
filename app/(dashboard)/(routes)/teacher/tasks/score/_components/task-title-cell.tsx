"use client";

import {useEffect, useState} from "react";
import axios from "axios";

interface TaskTitleCellProps {
    taskId: string;
}

export const TaskTitleCell = ({
                                  taskId
                              }: TaskTitleCellProps) => {
    const [taskTitle, setTaskTitle] = useState<string | null>("");

    useEffect(() => {
        const apiUrl = `/api/admin/task/title/${taskId}`;

        axios
            .get(apiUrl)
            .then((res) => {
                const title = res.data.title;
                setTaskTitle(title);
            })
            .catch((e) => {
                console.error("API Call Error", e);
            });
    }, [taskId]);

    return (
        <div>
            {taskTitle}
        </div>
    );
};
