"use client";

import {useRouter} from "next/navigation";
import {useState} from "react";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import {motion} from 'framer-motion';

interface PostLikeProps {
    postId: string;
    isLiked?: boolean;
}

export const PostLike = ({
                             postId,
                             isLiked
                         }: PostLikeProps) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            await axios.put(`/api/board/post/${postId}/like`, {
                isLiked: !isLiked
            });
            router.refresh();
        } catch (e) {
            toast.error("오류: 문제가 있습니다.")
        } finally {
            setIsLoading(false);
        }
    }

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart

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
                <Icon className="h-[30px] w-[30px] text-red-500 transition-all"/>
            </motion.button>
        </>
    )
};