import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";

export async function PATCH(
    req: Request,
    {params}: { params: { doTaskId: string; } }
) {
    try {
        const {userId} = auth();
        const {doTaskId} = params;
        const {description, urls} = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const doTask = await prisma.doTask.update({
            where: {
                id: doTaskId,
                userId
            },
            data: {
                description,
            }
        })

        const doTaskAttachment = urls.map((url: string) => ({
            name: url.split("/").pop(),
            url,
            doTaskId
        }));

        await prisma.doTaskAttachment.createMany({
            data: doTaskAttachment,
        })

        return NextResponse.json(doTask)
    } catch (e) {
        console.log("[UPDATE_TASK]", e);
        return new NextResponse("Internal Error", {status: 500});
    }
}