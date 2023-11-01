"use client";

import {motion} from 'framer-motion';
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {useRouter} from "next/navigation";
import {useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface PostBookmarkProps {
    postId: string;
    isMarked?: boolean;
}

export const PostBookmark = ({
                                 postId,
                                 isMarked,
                             }: PostBookmarkProps) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
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

    const Icon = isMarked ? AiFillStar : AiOutlineStar

    return (
        <>
            <motion.button
                onClick={onClick}
                disabled={isLoading}

                initial={{scale: 1}}
                whileTap={{scale: 0.5}}
                transition={{duration: 0.3}}
                className="flex items-center justify-center border p-1 rounded-lg"
            >
                <Icon className="h-[30px] w-[30px] text-yellow-300"/>
            </motion.button>
        </>
    )
}