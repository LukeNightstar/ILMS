"use client";

import {Comment} from "@prisma/client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Pencil, Save, X} from "lucide-react";
import {ReplyDeleteButton} from "@/app/(dashboard)/(routes)/board/_components/reply-delete-button";
import {TextArea} from "@radix-ui/themes";
import toast from "react-hot-toast";
import axios from "axios";

interface ReplyEditFormProps {
    userId: string;
    initialData: Comment
}

export const ReplyEditForm = ({
                                  userId,
                                  initialData,
                              }: ReplyEditFormProps) => {

    const commentId = initialData.id;
    const commentOwnerId = initialData.userId;

    // 댓글 작성자와 현재 접속자 간의 일치 여부 확인
    const isAuthor = commentOwnerId !== userId;

    // Form을 위한 기본 요소 설정
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(initialData.content);

    const toggleEdit = () => {
        if (isEditing) {
            setEditedComment(initialData.content); // 수정 취소 시, 원래 내용으로 되돌립니다.
        }
        setIsEditing((current) => !current);
    };

    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.patch(`/api/board/post/comment/${commentId}`, {
                content: editedComment,
            });
            toast.success("댓글 수정 완료");
            setIsEditing(false); // 수정 완료 후 수정모드 해제
            router.refresh();
        } catch (e) {
            toast.error("오류: 문제가 있습니다.");
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit} className="mt-1">
                {!isEditing && (
                    <div className={cn("text-base mt-1",
                        !initialData.content && "text-slate-500 italic")}>
                        {!initialData.content && "내용 없음"}
                        {initialData.content && (
                            <p>{initialData.content}</p>
                        )}
                    </div>
                )}
                {isEditing && (
                    <TextArea
                        className="h-28 w-full rounded-lg border"
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                    />
                )}
                <div className="grid grid-cols-2">
                    <div>
                        {/* 빈 공간 */}
                    </div>
                    <div className="flex justify-end items-center gap-x-1 mt-2">
                        <fieldset disabled={isAuthor}>
                            <div className="flex gap-x-4">
                                <div className="p-0">
                                    <Button
                                        type="button"
                                        onClick={toggleEdit}
                                        variant="link"
                                        className="flex flex-1 items-center text-sm p-0"
                                    >
                                        {isEditing ? (
                                            <>
                                                <X className="h-4 w-4 mr-2"/>
                                                취소
                                            </>
                                        ) : (
                                            <>
                                                <Pencil className="h-4 w-4 mr-2"/>
                                                수정
                                            </>
                                        )}
                                    </Button>
                                </div>
                                <div>
                                    {isEditing ? (
                                        <>
                                            <Button
                                                type="submit"
                                                variant="link"
                                                className="flex flex-1 items-center text-sm p-0"
                                            >
                                                <Save className="h-4 w-4 mr-2"/>
                                                저장
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <ReplyDeleteButton commentId={commentId}/>
                                        </>
                                    )}
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </form>
        </div>
    )
};