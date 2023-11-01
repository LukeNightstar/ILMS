"use client";

import {useRouter} from "next/navigation";
import {useState} from "react";
import toast from "react-hot-toast";
import {ConfirmModal} from "@/components/modals/confirm-modal";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {Trash} from "lucide-react";

interface ReplyDeleteButtonProps {
    commentId: string;
}

export const ReplyDeleteButton = ({
                                      commentId
                                  }: ReplyDeleteButtonProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/board/post/comment/${commentId}`);
            toast.success("댓글 삭제 완료");
            router.refresh();
        } catch (e) {
            toast.error("오류: 문제가 있습니다.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <ConfirmModal onConfirm={onDelete}>
                <Button
                    disabled={isLoading}
                    variant="link"
                    className="flex flex-1 items-center text-sm p-0"
                >
                    <Trash className="h-4 w-4 mr-2"/>
                    삭제
                </Button>
            </ConfirmModal>
        </>
    )
};