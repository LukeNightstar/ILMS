import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";

// 수정
export async function PATCH(
    req: Request,
    {params}: { params: { postId: string } }
) {
    try {
        const {userId} = auth();
        const {postId} = params;
        const {title, content, board, urls} = await req.json();

        const boardId = board;

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const post = await prisma.post.update({
            where: {
                id: postId,
                userId
            },
            data: {
                title,
                content,
                boardId,
            },
        })

        const postAttachments = urls.map((url: string) => ({
            name: url.split("/").pop(),
            url,
            userId,
            postId,
        }));

        await prisma.postAttachment.createMany({
            data: postAttachments,
        });

        return NextResponse.json(post);
    } catch (error) {
        console.log("[UPDATE_POST]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

// 삭제
export async function DELETE(
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
                userId: userId,
            },
        });

        if (!post) {
            return new NextResponse("Not found", {status: 404});
        }

        const deletedPost = await prisma.post.delete({
            where: {
                id: params.postId,
            },
        });

        return NextResponse.json(deletedPost);
    } catch (error) {
        console.log("[DELETE_POST]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}