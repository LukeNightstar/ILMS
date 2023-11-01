import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {prisma} from "@/lib/db";
import {User} from "@prisma/client";
import {CreatedDate} from "@/components/created-date";
import {UpdatedDate} from "@/components/updated-date";
import DoTaskViewInScorePage
    from "@/app/(dashboard)/(routes)/teacher/tasks/score/doTask/[doTaskId]/_components/doTask-view-score";
import ScoreForm from "@/app/(dashboard)/(routes)/teacher/tasks/score/doTask/[doTaskId]/_components/score-form";

const DoTaskScorePage = async ({
                                   params
                               }: { params: { doTaskId: string; } }) => {
    const {userId} = auth();
    if (!userId) {
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
                },
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

    return (
        <div className="p-5">
            <div className="">
                <h1 className="text-3xl font-semibold">{user?.username} 님이 제출한 과제</h1>
                <div className="flex flex-col text-sm mt-2 text-muted-foreground">
                    <div className="flex flex-1 items-center">
                        <p>과제 제출일 :</p><CreatedDate createdAt={doTask.createdAt}/>
                    </div>
                    <div className="flex flex-1 items-center">
                        <p>최종 수정일 :</p><UpdatedDate updatedAt={doTask.updatedAt}/>
                    </div>
                </div>
                <DoTaskViewInScorePage
                    doTask={doTask}
                    doTaskAttachment={doTask.DoTaskAttachment}
                />
            </div>
            <div className="mt-10">
                <h1 className="text-3xl font-semibold">성적</h1>
                <ScoreForm
                    doTaskId={params.doTaskId}
                    initialData={doTask.DoTaskScore}
                />
            </div>
        </div>
    )
}

export default DoTaskScorePage;