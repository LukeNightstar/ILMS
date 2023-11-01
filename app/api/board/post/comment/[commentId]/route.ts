import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import {prisma} from "@/lib/db";

// 댓글 수정
export async function PATCH(
    req: Request,
    {params}: {
        params: {
            commentId: string;
        }
    }
) {
    try {
        const {content} = await req.json();

        const {userId} = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const comment = await prisma.comment.update({
            where: {
                id: params.commentId,
                userId
            },
            data: {
                content
            }
        });

        return NextResponse.json(comment)
    } catch (e) {
        console.log("[UPDATE_COMMENT]", e);
        return new NextResponse("Internal Error", {status: 500});
    }
}

// 댓글 삭제
export async function DELETE(
    req: Request,
    {params}: {
        params: {
            commentId: string;
        }
    }
) {
    try {
        const {userId} = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const comment = await prisma.comment.findUnique({
            where: {
                id: params.commentId,
                userId
            }
        });
        if (!comment) {
            return new NextResponse("Not found", {status: 404});
        }

        const deleteComment = await prisma.comment.delete({
            where: {
                id: params.commentId,
            }
        })

        return NextResponse.json(deleteComment);
    } catch (e) {
        console.log("[DELETE_COMMENT]", e);
        return new NextResponse("Internal Error", {status: 500});
    }
}