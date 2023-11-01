"use client";

import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {SubmitHandler, useForm} from "react-hook-form";

interface ReplyFormProps {
    postId: string;
}

// Form 요소
interface CommentFormData {
    comment: string;
}

const ReplyForm = ({
                       postId
                   }: ReplyFormProps) => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {isValid, isSubmitting},
        setValue,
        getValues,
    } = useForm<CommentFormData>();

    // 댓글 작성
    const onSubmit: SubmitHandler<CommentFormData> = async (data) => {
        if (!data.comment) {
            toast.error("댓글 내용을 입력하세요.");
        } else {
            try {
                await axios.post(`/api/board/post/${postId}/comment`, {
                    comment: data.comment,
                });
                toast.success("댓글 작성 완료");
                setValue("comment", ""); // 댓글 작성 후 폼 초기화
                router.refresh();
            } catch {
                toast.error("오류: 문제가 있습니다.");
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                <div className="flex flex-col">
                    <div className="flex-col">
                        <h1 className="text-3xl font-semibold">댓글</h1>
                        <Textarea
                            className="h-28 w-full rounded-lg mt-3"
                            {...register("comment", {required: true})}
                            placeholder="타인에게 불쾌감을 주는 댓글은 법률에 의해 제재 받을 수 있습니다."
                        />
                    </div>
                    <div className="grid grid-cols-2 mt-2">
                        <p className="text-xs text-muted-foreground -mt-1 pl-1">새 댓글 작성이 되지 않는다면 새로고침 후 다시 시도하세요</p>
                        <div className="flex items-center justify-end">
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting || !getValues("comment").trim()}
                            >
                                작성
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ReplyForm;
