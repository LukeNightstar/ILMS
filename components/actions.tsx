"use client";

import axios from "axios";
import {MinusCircle} from "lucide-react";
import * as React from "react";
import {useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";
import {ConfirmModal} from "@/components/modals/confirm-modal";

interface ActionProps {
    courseId: string;
}

export const Actions = ({
                            courseId,
                        }: ActionProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/courses/${courseId}`);

            toast.success("강의 삭제 완료");
            router.refresh();
        } catch {
            toast.error("오류: 문제가 있습니다.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="">
            <ConfirmModal onConfirm={onDelete}>
                <Button>
                    <MinusCircle className="h-4 w-4 mr-2"/>
                    강의 삭제
                </Button>
            </ConfirmModal>
        </div>
    )
}