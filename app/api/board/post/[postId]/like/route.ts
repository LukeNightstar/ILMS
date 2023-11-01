import {NextResponse} from "next/server";

import {prisma} from "@/lib/db";
import {auth} from "@clerk/nextjs";

export async function PUT(
    req: Request,
    {params}: {
        params: {
            postId: string;
        }
    }
) {
    try {
        const {userId} = auth();
        const {isLiked} = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const postLike = await prisma.postLike.upsert({
            where: {
                postId_userId: {
                    postId: params.postId, // 게시물 ID
                    userId, // 사용자 ID
                },
            },
            update: {
                isLiked, // 좋아요 상태를 토글
            },
            create: {
                userId,
                postId: params.postId,
                isLiked
            },
        });

        return NextResponse.json(postLike);
    } catch (error) {
        console.log("[POST_LIKE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}