import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";

// 과제 제출
export async function POST(
    req: Request,
    {params}: {
        params: {
            taskId: string
        }
    }
) {
    try {
        const {userId} = auth();
        const {description, urls, isCompleted} = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!urls) {
            return new NextResponse("Bad Request - URLs are missing", {status: 400});
        }

        const doTask = await prisma.doTask.create({
            data: {
                taskId: params.taskId,
                userId,
                description,
            }
        })

        const doTaskId = doTask.id;

        const doTaskAttachment = urls.map((url: string) => ({
            name: url.split("/").pop(),
            url,
            doTaskId
        }));

        await prisma.doTaskAttachment.createMany({
            data: doTaskAttachment,
        });

        // 진척도 설정
        await prisma.taskProgress.create({
            data: {
                userId,
                doTaskId: doTaskId,
                isCompleted: isCompleted,
            }
        });

        return NextResponse.json(doTask);
    } catch (e) {
        console.log("[DOTASK_DESCRIPTION]", e);
        return new NextResponse("Internal Error", {status: 500});
    }
}