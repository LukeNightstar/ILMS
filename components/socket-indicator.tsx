"use client";

import {useSocket} from "@/components/providers/socket-provider";
import {Badge} from "@/components/ui/badge";

export const SocketIndicator = () => {
    const {isConnected} = useSocket();

    if (!isConnected) {
        return (
            <Badge
                variant="outline"
                className="bg-yellow-600 text-white text-sm border-none"
            >
                연결 상태 : 불안정, 1초마다 갱신 중
            </Badge>
        )
    }

    return (
        <Badge
            variant="outline"
            className="bg-emerald-600 text-white text-sm border-none"
        >
            연결 상태 : 양호
        </Badge>
    )
}