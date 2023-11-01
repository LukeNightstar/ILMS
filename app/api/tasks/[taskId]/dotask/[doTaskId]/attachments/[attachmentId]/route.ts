import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import {prisma} from "@/lib/db";

export async function DELETE(
    req: Request,
    {params} :{
        params:{
            doTaskId: string;
            attachmentId: string;
        }
    }
) {
    try {
        const {userId} = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const doTaskAttachment = await prisma.doTaskAttachment.delete({
            where:{
                doTaskId: params.doTaskId,
                id: params.attachmentId
            }
        })

        return NextResponse.json(doTaskAttachment);

    } catch (e) {
        console.log("ATTACHMENT_ID", e);
        return new NextResponse("Internal Error", {status: 500});
    }
}