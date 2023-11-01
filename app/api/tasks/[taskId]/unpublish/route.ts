import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";

import {prisma} from "@/lib/db";

export async function PATCH(
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
                userId,
            },
        });

        if (!task) {
            return new NextResponse("Not found", {status: 404});
        }

        const unpublishedTask = await prisma.task.update({
            where: {
                id: params.taskId,
                userId,
            },
            data: {
                isPublished: false,
            }
        });

        return NextResponse.json(unpublishedTask);
    } catch (error) {
        console.log("[COURSE_ID_UNPUBLISHED]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}