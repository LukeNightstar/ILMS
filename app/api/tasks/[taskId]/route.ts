import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";

// 과제 삭제
export async function DELETE(
    req: Request,
    {params}: { params: { taskId: string } }
) {
    try {
        const {userId} = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const task = await prisma.task.findUnique({
            where: {
                id: params.taskId,
                userId: userId,
            },
        });

        if (!task) {
            return new NextResponse("Not found", {status: 404});
        }

        const deletedTask = await prisma.task.delete({
            where: {
                id: params.taskId,
            },
        });

        return NextResponse.json(deletedTask);
    } catch (error) {
        console.log("[TASK_ID_DELETE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

// 과제 수정
export async function PATCH(
    req: Request,
    {params}: { params: { taskId: string } }
) {
    try {
        const {userId} = auth();
        const {taskId} = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const task = await prisma.task.update({
            where: {
                id: taskId,
                userId
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(task);
    } catch (error) {
        console.log("[TASK_ID]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}