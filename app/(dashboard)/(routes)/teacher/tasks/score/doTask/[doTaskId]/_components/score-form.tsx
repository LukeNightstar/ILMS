"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import toast from "react-hot-toast";
import {Button} from "@/components/ui/button";
import {Pencil, Save, X} from "lucide-react";
import axios from "axios";
import {DoTaskScore} from "@prisma/client";
import ScoreComment from "@/app/(dashboard)/(routes)/teacher/tasks/score/doTask/[doTaskId]/_components/score-comment";

interface ScoreFormProps {
    initialData: DoTaskScore[];
    doTaskId: string;
}

const ScoreForm = ({
                       initialData,
                       doTaskId,
                   }: ScoreFormProps) => {

    const scoreData = initialData[0];
    const initScore = scoreData ? scoreData.score : 0;

    const [isEditing, setIsEditing] = useState(false);
    const [editedScore, setEditedScore] = useState<number | null>(initScore);

    const router = useRouter();

    const toggleEdit = () => {
        if (isEditing) {
            setEditedScore(initScore);
        }
        setIsEditing((current) => !current);
    };

    const onSubmit = async () => {
        try {
            await axios.patch(`/api/tasks/score/doTask/${doTaskId}`, {
                score: editedScore,
            })
            toast.success("성적 저장 완료");
            setIsEditing(false); // 수정 완료 후 수정모드 해제
            router.refresh();
        } catch (e) {
            toast.error("오류: 문제가 있습니다.");
        }
    }

    return (
        <div className="mt-6 border-t border-b border-gray-300">
            <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dt className="font-medium leading-6 text-gray-900">점수</dt>
                    <dd className="mt-1 leading-6 text-gray-700 sm:col-span-4 sm:mt-0 flex flex-col">
                        <form onSubmit={onSubmit} className="flex flex-1 items-center">
                            <div className="flex flex-1 items-center gap-4">
                                <div>
                                    <Input
                                        type="number"
                                        value={editedScore || 0}
                                        min="0"
                                        max="100"
                                        className=""
                                        disabled={!isEditing}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value, 10);
                                            if (!isNaN(value) && value >= 0 && value <= 100) {
                                                setEditedScore(value);
                                            } else {
                                                setEditedScore(0);
                                            }
                                        }}
                                    />
                                </div>
                                <p className="text-muted-foreground">총점 : 100점</p>
                            </div>

                            <div className="flex flex-1 items-center justify-end mr-1">
                                <div className="p-0">
                                    {isEditing ? (
                                        <div className="gap-4 flex flex-1 items-center">
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
                        <p className="text-sm text-muted-foreground mt-1">숫자만 입력 가능합니다.</p>
                    </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dt className="font-medium leading-6 text-gray-900">메모</dt>
                    <dd className="mt-1 leading-6 text-gray-700 sm:col-span-4 sm:mt-0">
                        <ScoreComment initialData={initialData} doTaskId={doTaskId}/>
                    </dd>
                </div>
            </dl>
        </div>
    );
}

export default ScoreForm;