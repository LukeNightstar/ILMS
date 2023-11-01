"use client";

import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {motion} from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";

interface BookmarkIconProps {
    postId: string;
    isMarked?: boolean;
}

export const PostIcon = ({
                             postId,
                             isMarked
                         }: BookmarkIconProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Link 컴포넌트의 클릭 이벤트 중지
        try {
            setIsLoading(true);
            await axios.put(`/api/board/post/${postId}/bookmark`, {
                isMarked: !isMarked
            })
            router.refresh();
        } catch (e) {
            toast.error("오류: 문제가 있습니다.")
        } finally {
            setIsLoading(false);
        }
    }


    const Icon = isMarked ? AiFillStar : AiOutlineStar;

    return (
        <>
            <motion.button
                onClick={onClick}
                disabled={isLoading}
                initial={{scale: 1}}
                whileTap={{scale: 0.5}}
                transition={{duration: 0.3}}
            >
                <Icon className="h-[30px] w-[30px] text-yellow-300"/>
            </motion.button>
        </>
    );
};