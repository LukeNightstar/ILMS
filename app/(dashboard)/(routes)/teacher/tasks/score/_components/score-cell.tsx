"use client";

import {useEffect, useState} from "react";
import axios from "axios";

interface ScoreCellProps {
    id: string;
}

export const ScoreCell = ({
                              id
                          }: ScoreCellProps) => {
    const [score, setScore] = useState<string | null>("");

    useEffect(() => {
        const apiUrl = `/api/admin/task/score/${id}`;

        axios
            .get(apiUrl)
            .then((res) => {
                const score = res.data.score;
                setScore(score);
            })
            .catch((e) => {
                console.error("API Call Error", e);
            });
    }, []);

    return (
        <div>
            {score}
        </div>
    )
}