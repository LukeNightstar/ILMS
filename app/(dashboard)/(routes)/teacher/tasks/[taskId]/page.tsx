import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {ArrowLeft, ClipboardEdit, File, TimerIcon} from "lucide-react";

import {prisma} from "@/lib/db";
import {IconBadge} from "@/components/icon-badge";

import {TitleForm} from "./_components/title-form";
import {Banner} from "@/components/banner";
import {Actions} from "./_components/actions";
import Link from "next/link";
import {DescriptionForm} from "@/app/(dashboard)/(routes)/teacher/tasks/[taskId]/_components/description-form";
import {AttachmentForm} from "@/app/(dashboard)/(routes)/teacher/tasks/[taskId]/_components/attachment-form";
import {DeadlineForm} from "@/app/(dashboard)/(routes)/teacher/tasks/[taskId]/_components/deadline-form";

const TaskIdPage = async ({
                              params
                          }: {
    params: {
        taskId: string
    }
}) => {

    const {userId} = auth();

    if (!userId) {
        return redirect("/")
    }

    const task = await prisma.task.findUnique({
        where: {
            id: params.taskId,
            userId,
        },
        include: {
            taskAttachments: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    if (!task) {
        return redirect("/");
    }

    const requiredFields = [
        task.title,
        task.description,
        task.deadline,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields} / ${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            {!task.isPublished && (
                <Banner label="과제가 등록되지 않았습니다."
                />
            )}
            <div className="mt-6">
                <div className="flex items-center justify-between">
                    <div className="w-full">
                        <Link href={`/teacher/tasks/list`}
                              className="flex items-center text-sm hover:opacity-75 transition mb-6"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2"/>
                            과제 목록으로 돌아가기
                        </Link>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col gap-y-2">
                                <h1 className="text-4xl font-bold">
                                    과제 관리
                                </h1>
                                <span className="text-sm text-slate-700">
                                    <p>모든 설정을 완료하세요 {completionText}</p>
                                    <p>(첨부 파일은 선택사항입니다)</p>
                                </span>
                            </div>
                            <Actions
                                disabled={!isComplete}
                                taskId={params.taskId}
                                isPublished={task.isPublished}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    <div>
                        <div className="flex items-center gap-x-3">
                            <IconBadge icon={ClipboardEdit} variant={"default"} size={"default"}/>
                            <h1 className="text-xl font-bold">
                                제목 / 설명
                            </h1>
                        </div>
                        <TitleForm initialData={task} taskId={task.id}/>
                        <DescriptionForm initialData={task} taskId={task.id}/>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-3">
                                <IconBadge icon={TimerIcon}/>
                                <h1 className="text-xl font-bold">
                                    제출 기간
                                </h1>
                            </div>
                            <DeadlineForm initialData={task} taskId={task.id}/>
                        </div>
                        <div>
                            <div className="flex items-center gap-x-3">
                                <IconBadge icon={File}/>
                                <h1 className="text-xl font-bold">
                                    첨부파일
                                </h1>
                            </div>
                            <AttachmentForm initialData={task} taskId={task.id}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TaskIdPage;