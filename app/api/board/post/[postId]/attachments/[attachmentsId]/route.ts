import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";

export async function DELETE(
    req: Request,
    {params}: {
        params: {
            postId: string,
            attachmentsId: string;
        }
    }
) {
    try {
        const {userId} = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const postOwner = await prisma.post.findUnique({
            where: {
                id: params.postId,
                userId: userId
            }
        });

        if (!postOwner) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const postAttachment = await prisma.postAttachment.delete({
            where: {
                postId: params.postId,
                id: params.attachmentsId,
            }
        });

        return NextResponse.json(postAttachment);

    } catch (e) {
        console.log("ATTACHMENT_ID", e);
        return new NextResponse("Internal Error", {status: 500});
    }
}