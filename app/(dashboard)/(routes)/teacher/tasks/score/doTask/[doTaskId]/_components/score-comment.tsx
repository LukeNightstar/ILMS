"use client";

import {DoTaskScore} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {Pencil, Save, X} from "lucide-react";
import React, {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {TextArea} from "@radix-ui/themes";
import {cn} from "@/lib/utils";

interface ScoreCommentProps {
    initialData: DoTaskScore[];
    doTaskId: string;
}

const ScoreComment = ({
                          initialData,
                          doTaskId
                      }: ScoreCommentProps) => {
    const scoreCommentData = initialData[0];
    const commentData = scoreCommentData ? scoreCommentData.comment : null;

    const [isEditing, setIsEditing] = useState(false);
    const [comment, setComment] = useState(commentData ?? "");

    const router = useRouter();

    const toggleEdit = () => {
        if (isEditing) {
            setComment(commentData ?? "");
        }
        setIsEditing((current) => !current);
    };

    const onSubmit = async () => {
        try {
            await axios.patch(`/api/tasks/score/comment/doTask/${doTaskId}`, {
                comment: comment,
            })
            toast.success("메모 작성 완료");
            setIsEditing(false); // 수정 완료 후 수정모드 해제
            router.refresh();
        } catch (e) {
            toast.error("오류: 문제가 있습니다.");
        }
    }


    return (
        <div>
            <form onSubmit={onSubmit}>
                {!isEditing && (
                    <div className={cn("text-base mt-1",
                        !commentData && "text-slate-500 italic")}>
                        {!commentData && "내용 없음"}
                        {commentData && (
                            <p>{commentData}</p>
                        )}
                    </div>
                )}
                {isEditing && (
                    <>
                        <TextArea
                            className="h-28 w-full rounded-lg border p-2"
                            value={comment ?? ""}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">성적을 먼저 기입해주세요</p>
                    </>
                )}
                <div className="grid grid-cols-2">
                    <div className="text-sm text-muted-foreground">
                    </div>
                    <div className="flex justify-end items-center mr-1">
                        {isEditing ? (
                            <div className="flex flex-1 justify-end gap-x-4">
                                <div>
                                    <Button
                                        type="submit"
                                        variant="link"
                                        className="flex flex-1 items-center text-sm p-0"
                                    >
                                        <Save className="h-4 w-4 mr-2"/>
                                        저장
                                    </Button>
                                </div>

                                <div>
                                    <Button
                                        type="button"
                                        variant="link"
                                        onClick={toggleEdit}
                                        className="flex flex-1 items-center text-sm p-0"
                                    >
                                        <X className="h-4 w-4 mr-2"/>
                                        취소
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Button
                                    type="button"
                                    variant="link"
                                    onClick={toggleEdit}
                                    className="flex flex-1 items-center text-sm p-0"
                                >
                                    <Pencil className="h-4 w-4 mr-2"/>
                                    수정
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ScoreComment;