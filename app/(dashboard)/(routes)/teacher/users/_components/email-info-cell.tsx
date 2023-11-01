"use client";

import {useEffect, useState} from "react";
import axios from "axios";

interface EmailInfoCellProps {
    userId: string;
}

export const EmailInfoCell = ({
                                  userId,
                              }: EmailInfoCellProps) => {
    const [userEmail, setUserEmail] = useState<string | null>("");

    useEffect(() => {
        const apiUrl = `/api/admin/user/email/${userId}`;

        axios
            .get(apiUrl)
            .then((res) => {
                const userEmail = res.data.address;
                setUserEmail(userEmail);
            })
            .catch((e) => {
                console.error("API Call Error", e);
            });
    }, [userId]);

    return (
        <div>
            {userEmail}
        </div>
    );
};
