import {prisma} from "@/lib/db";
import {DoTask, Prisma, Task} from "@prisma/client";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";

type TaskWithProgressWithDoTask = Task & {
    doTask: DoTask[];
}

type GetTasks = {
    title?: string;
}

export const getTasks = async ({
                                   title,
                               }: GetTasks): Promise<TaskWithProgressWithDoTask[]> => {
    try {
        const {userId} = auth();
        if (!userId) {
            return redirect("/");
        }

        const where: Prisma.TaskWhereInput = {
            isPublished: true,
            title: {
                contains: title,
            }
        }

        const tasks = await prisma.task.findMany({
            where,
            include: {
                DoTask: true
            },
            orderBy: {
                createdAt: "desc"
            },
        })

        return await Promise.all(
            tasks.map(async task => {

                return {
                    ...task,
                    doTask: task.DoTask,
                }

            })
        )

    } catch (error) {
        console.log("[GET_TASKS]", error);
        return [];
    }
};