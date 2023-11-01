"use client";

import axios from "axios";
import {CheckCircle, XCircle} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import toast from "react-hot-toast";

import {Button} from "@/components/ui/button";

interface CourseProgressButtonProps {
    chapterId: string;
    courseId: string;
    isCompleted?: boolean;
    nextChapterId?: string;
}

export const CourseProgressButton = ({
                                         chapterId,
                                         courseId,
                                         isCompleted,
                                         nextChapterId
                                     }: CourseProgressButtonProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                isCompleted: !isCompleted
            });


            if (!isCompleted && nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }

            toast.success("진척도 수정됨");
            router.refresh();
        } catch {
            toast.error("오류: 문제가 있습니다.");
        } finally {
            setIsLoading(false);
        }
    }

    const Icon = isCompleted ? XCircle : CheckCircle

    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            type="button"
            variant={isCompleted ? "outline" : "success"}
            className="w-full md:w-auto"
        >
            {isCompleted ? "수강 완료 취소 " : "수강 완료"}
            <Icon className="h-4 w-4 ml-2"/>
        </Button>
    )
}