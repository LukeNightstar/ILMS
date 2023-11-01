import Link from "next/link";
import {CreatedDate} from "@/components/created-date";
import {DoTask} from "@prisma/client";
import {prisma} from "@/lib/db";
import {Deadline} from "@/app/(dashboard)/(routes)/tasks/_components/deadline";
import {DDay} from "@/app/(dashboard)/(routes)/tasks/_components/d-day";
import {TaskProgress} from "@/app/(dashboard)/(routes)/tasks/_components/task-progress";

interface TaskCardProps {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    deadline: Date | null;
    userId: string;
    doTask: DoTask[];
}

export const TaskCard = async ({
                                   id,
                                   title,
                                   description,
                                   createdAt,
                                   deadline,
                                   userId,
                                   doTask,
                               }: TaskCardProps) => {
    let redirectUrl;

    const userDoTask = await prisma.doTask.findFirst({
        where: {
            userId: userId,
            taskId: id,
        },
        include: {
            TaskProgress: true
        }
    });

    const isCompleted = !!userDoTask; // 불리언 값으로 변환

    // 제출 유무 파악하여 링크 변경
    if (userDoTask) {
        redirectUrl = `/tasks/${id}/doTask/view/${userDoTask.id}`;
    } else {
        redirectUrl = `/tasks/submit/${id}`;
    }

    return (
        <Link href={redirectUrl} className="">
            <div
                className="group shadow-md hover:shadow-lg hover:border-sky-700 transition overflow-hidden border rounded-lg p-3 h-full">
                <div>
                    <div className="grid grid-cols-10">
                        <div className="col-span-7 font-semibold group-hover:text-sky-700 transition line-clamp-1">
                            <p className="text-2xl">{title}</p>
                        </div>
                        <div className="col-span-3 flex items-center justify-end">
                            <DDay deadline={deadline}/>
                        </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 flex flex-1">
                        <p>과제 등록일</p>&nbsp;|&nbsp;<CreatedDate createdAt={createdAt}/>
                    </div>
                    <div className="text-sm my-2 h-20 line-clamp-2">
                        <p>{description}</p>
                    </div>
                    <div className="flex flex-1">
                        <div className="text-sm text-muted-foreground flex flex-1">
                            <p>마감 기한</p>&nbsp;|&nbsp;<Deadline deadline={deadline}/>
                        </div>
                        <div className="flex items-center justify-end">
                            <TaskProgress isCompleted={isCompleted}/>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}