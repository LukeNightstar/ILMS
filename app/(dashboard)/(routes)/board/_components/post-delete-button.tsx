"use client";

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ConfirmModal} from "@/components/modals/confirm-modal";
import toast from "react-hot-toast";
import {useState} from "react";
import {Trash} from "lucide-react";
import axios from "axios";

interface PostDeleteButtonProps {
    postId: string;
}

export const PostDeleteButton = ({
                                     postId,
                                 }: PostDeleteButtonProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/board/update/${postId}`);
            toast.success("글 삭제 완료");
            router.refresh();
            router.push(`/board`);
        } catch {
            toast.error("오류: 문제가 있습니다.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <ConfirmModal onConfirm={onDelete}>
                <Button disabled={isLoading} variant="destructive" className="shadow-sm hover:shadow-lg py-1 px-3">
                    <Trash className="h-4 w-4 mr-2"/>
                    삭제
                </Button>
            </ConfirmModal>
        </div>
    )
}