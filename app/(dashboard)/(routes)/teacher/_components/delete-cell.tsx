"use client";

import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {ConfirmModal} from "@/components/modals/confirm-modal";

interface DeleteCellProps {
    postId: string;
}

export const DeleteCell = ({
                               postId,
                           }: DeleteCellProps) => {
    const router = useRouter();

    const onDelete = async () => {
        try {
            await axios.delete(`/api/admin/board/update/${postId}`);
            toast.success("글 삭제 완료");
            router.refresh();
        } catch {
            toast.error("오류: 문제가 있습니다.");
        }
    }

    return (
        <div>
            <ConfirmModal onConfirm={onDelete}>
                삭제
            </ConfirmModal>
        </div>
    )
}