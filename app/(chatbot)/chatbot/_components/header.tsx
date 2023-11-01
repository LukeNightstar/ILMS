'use client';
import React, {useEffect, useState} from "react";

const Header = () => {
    const [conversationStartTime, setConversationStartTime] = useState<Date | null>(new Date()); // 대화 시작 시간을 기록
    const getTimeString = (time: Date) => {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const timeOfDay = hours >= 12 ? '오후' : '오전';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${timeOfDay} ${formattedHours}:${formattedMinutes}`;
    };

    useEffect(() => {
        // 대화가 시작되면 대화 시작 시간을 기록
        setConversationStartTime(new Date());
    }, []);
    return (
        <>
            <div className="flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-bot">
                        <path d="M12 8V4H8"/>
                        <rect width="16" height="12" x="4" y="8" rx="2"/>
                        <path d="M2 14h2"/>
                        <path d="M20 14h2"/>
                        <path d="M15 13v2"/>
                        <path d="M9 13v2"/>
                    </svg>
                </div>
            </div>
            <p className="text-black text-sm text-center ">ChatBot</p>
            <p className="text-[#666] text-xs text-center mt-2 mb-3">
                {conversationStartTime ? getTimeString(conversationStartTime) : ''}
            </p>

        </>

    );
};


export default Header;
