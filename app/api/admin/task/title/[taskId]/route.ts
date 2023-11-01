import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";

export async function GET(
    req: Request,
    {params}: { params: { taskId: string; } }
) {
    try {
        const taskId = params.taskId;

        const task = await prisma.task.findUnique({
            where:{
                id: taskId,
            }
        })

        if (!task) {
            return new NextResponse("Not Found", {status: 404});
        }

        return NextResponse.json({title: task.title});
    } catch (e) {
        console.log("[USER_EMAIL]", e);
        return new NextResponse("Internal Error", {status: 500});
    }
}