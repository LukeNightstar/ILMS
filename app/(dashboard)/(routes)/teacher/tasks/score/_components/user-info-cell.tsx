"use client";

import {useEffect, useState} from "react";
import axios from "axios";

interface UserInfoCellProps {
    userId: string;
}

export const UserInfoCell = ({
                                  userId,
                              }: UserInfoCellProps) => {
    const [userName, setUserName] = useState<string | null>("");

    useEffect(() => {
        const apiUrl = `/api/admin/user/name/${userId}`;

        axios
            .get(apiUrl)
            .then((res) => {
                const userName = res.data.username;
                setUserName(userName);
            })
            .catch((e) => {
                console.error("API Call Error", e);
            });
    }, [userId]);

    return (
        <div>
            {userName}
        </div>
    );
};
