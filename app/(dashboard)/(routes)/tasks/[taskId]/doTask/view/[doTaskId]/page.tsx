import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {prisma} from "@/lib/db";
import {User} from "@prisma/client";
import {format} from "date-fns";
import {TaskDefaultForm} from "@/app/(dashboard)/(routes)/tasks/submit/[taskId]/_components/task-default-form";
import DoTaskViewPage from "@/app/(dashboard)/(routes)/tasks/[taskId]/doTask/_components/doTask-view";
import DoTaskScore from "@/app/(dashboard)/(routes)/tasks/[taskId]/doTask/_components/doTask-score";

const DoTaskIdPage = async ({
                                params
                            }: {
    params: {
        taskId: string;
        doTaskId: string;
    }
}) => {
    const {userId} = auth();
    if (!userId) {
        return redirect("/");
    }

    // 과제 정보 호출 task에 포함되는 doTask
    const task = await prisma.task.findUnique({
        where: {
            id: params.taskId,
        },
        include: {
            DoTask: {
                orderBy: {
                    createdAt: "desc"
                }
            },
            taskAttachments: {
                orderBy: {
                    createdAt: "desc",
                },
            }
        }
    });
    if (!task) {
        return redirect("/");
    }

    // 사용자가 작성한 과제 정보
    const doTask = await prisma.doTask.findUnique({
        where: {
            id: params.doTaskId,
        },
        include: {
            DoTaskAttachment: {
                where: {
                    doTaskId: params.doTaskId
                }
            },
            DoTaskScore: {
                where: {
                    doTaskId: params.doTaskId,
                }
            }
        }
    })
    if (!doTask) {
        return redirect("/");
    }

    // 사용자 정보 가져오기
    async function getUserInfo(userId: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                externalId: userId,
            },
            include: {
                email: true,
            }
        });
    }

    // 유저 정보
    const user = await getUserInfo(userId);
    //@ts-ignore
    const userEmail = user?.email?.[0]?.email_address;

    // 마감 날짜
    const deadline = task.deadline;
    const formattedDeadline = deadline ? format(new Date(deadline), "yyyy년 MM월 dd일 HH시 mm분") : "마감일 정해지지 않음";

    // createdAt
    const createdDate = task.createdAt;
    const formattedCreatedAt = createdDate ? format(new Date(createdDate), "yyyy년 MM월 dd일 HH시 mm분") : "";

    return (
        <div className="p-5">
            <TaskDefaultForm
                task={task}
                formattedCreatedAt={formattedCreatedAt}
                userEmail={userEmail}
                formattedDeadline={formattedDeadline}
                username={user?.username ?? ''}
                taskAttachment={task.taskAttachments}
            />
            <div className="mt-10">
                <h1 className="text-3xl font-semibold">과제 제출</h1>
                <DoTaskViewPage
                    userId={userId}
                    taskId={params.taskId}
                    doTaskId={params.doTaskId}
                    doTask={doTask}
                    doTaskAttachment={doTask.DoTaskAttachment}
                />
            </div>
            <div className="mt-10">
                <h1 className="text-3xl font-semibold">성적</h1>
                <DoTaskScore
                    doTaskScore={doTask.DoTaskScore}
                />
            </div>
        </div>
    )
}

export default DoTaskIdPage;