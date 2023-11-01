// 조회수
import {prisma} from "@/lib/db";
import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";

export async function PATCH(
    req: Request,
    {params}: { params: { postId: string } }
) {
    try {
        const {userId} = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const post = await prisma.post.findUnique({
            where: {
                id: params.postId,
            },
        });

        if (!post) {
            return new NextResponse("Not Found", {status: 404});
        }

        await prisma.post.update({
            where: {
                id: params.postId,
            },
            data: {
                views: post.views + 1,
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.log("[BOARD_FETCH]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}