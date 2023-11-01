import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";

// 댓글 생성
export async function POST(
    req: Request,
    {params}: { params: { postId: string; } }
) {
    try {
        const {userId} = auth();
        const {postId} = params;
        const {comment} = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        // 해당 게시물을 찾습니다.
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });
        if (!post) {
            return new NextResponse("POST NOT FOUND", {status: 404});
        }

        const postComment = await prisma.comment.create({
            data: {
                userId,
                postId,
                content: comment,
            },
        });

        return NextResponse.json(postComment);
    } catch (error) {
        console.error("[COMMENT_POST]:", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}