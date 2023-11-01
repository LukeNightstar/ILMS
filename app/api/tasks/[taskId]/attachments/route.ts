import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";

import {prisma} from "@/lib/db";

export async function POST(
    req: Request,
    {params}: { params: { taskId: string; } }
) {
    try {
        const {userId} = auth();
        const {url} = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const taskOwner = await prisma.task.findUnique({
            where: {
                id: params.taskId,
                userId: userId,
            }
        });

        if (!taskOwner) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const taskAttachment = await prisma.taskAttachment.create({
            data: {
                url,
                name: url.split("/").pop(),
                taskId: params.taskId,
            }
        });

        return NextResponse.json(taskAttachment);

    } catch (error) {
        console.log("TASK_ID_ATTACHMENTS", error)
        return new NextResponse("Internal Error", {status: 500});
    }
}