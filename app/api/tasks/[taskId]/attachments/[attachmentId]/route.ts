import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";

export async function DELETE(
    req: Request,
    {params}: { params: { taskId: string, attachmentId: string } }
) {
    try {
        const {userId} = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const taskOwner = await prisma.task.findUnique({
            where: {
                id: params.taskId,
                userId: userId
            }
        });

        if (!taskOwner) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const attachment = await prisma.taskAttachment.delete({
            where: {
                taskId: params.taskId,
                id: params.attachmentId,
            }
        });

        return NextResponse.json(attachment);

    } catch (error) {
        console.log("TASK_ATTACHMENT_ID", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}