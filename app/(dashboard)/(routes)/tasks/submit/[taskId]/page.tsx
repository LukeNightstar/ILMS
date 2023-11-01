import {prisma} from "@/lib/db";
import {redirect} from "next/navigation";
import {auth} from "@clerk/nextjs";
import {User} from "@prisma/client";
import {format} from "date-fns";
import TaskSubmitForm from "@/app/(dashboard)/(routes)/tasks/submit/[taskId]/_components/task-submit-form";
import {TaskDefaultForm} from "@/app/(dashboard)/(routes)/tasks/submit/[taskId]/_components/task-default-form";
import {Ban} from "lucide-react";

const TaskPage = async ({
                            params
                        }: {
    params: {
        taskId: string;
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

    // 마감일이 지났는지 확인
    const now = new Date();
    const isDeadlinePassed = deadline ? now > new Date(deadline) : false;

    return (
        <>
            <div className="p-5">
                <TaskDefaultForm
                    task={task}
                    formattedCreatedAt={formattedCreatedAt}
                    userEmail={userEmail}
                    formattedDeadline={formattedDeadline}
                    username={user?.username ?? ''}
                    taskAttachment={task.taskAttachments}
                />
                {isDeadlinePassed ? (
                    <>
                        <p className="flex flex-1 text-4xl mt-10 text-red-600 font-bold items-center">
                            <Ban size="36" className="mr-2"/>
                            과제 제출이 마감되었습니다.
                        </p>
                    </>
                ) : (
                    <div className="mt-10">
                        <h1 className="text-3xl font-semibold">과제 제출</h1>
                        <TaskSubmitForm taskId={task.id}/>
                    </div>
                )}
            </div>
        </>
    )
}

export default TaskPage;
