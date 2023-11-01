"use client";

import axios from "axios";
import {Trash} from "lucide-react";
import {useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";
import {ConfirmModal} from "@/components/modals/confirm-modal";
import {useConfettiStore} from "@/hooks/use-confetti-store";

interface ActionProps {
    disabled: boolean;
    taskId: string;
    isPublished: boolean;
}

export const Actions = ({
                            disabled,
                            taskId,
                            isPublished
                        }: ActionProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const confetti = useConfettiStore();

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isPublished) {
                await axios.patch(`/api/tasks/${taskId}/unpublish`);
                toast.success("과제 등록 해제");
            } else {
                await axios.patch(`/api/tasks/${taskId}/publish`);
                toast.success("과제 등록 완료");
                confetti.onOpen();
            }

            router.refresh();
        } catch {
            toast.error("오류: 문제가 있습니다.");
        } finally {
            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/tasks/${taskId}`);

            toast.success("과제 삭제 완료");
            router.refresh();
            router.push(`/teacher/tasks/list`);
        } catch {
            toast.error("오류: 문제가 있습니다.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center gap-x-3">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "등록 해제" : "등록"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4"/>
                </Button>
            </ConfirmModal>
        </div>
    )
}