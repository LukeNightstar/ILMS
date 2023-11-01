import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";
import {isTeacher} from "@/lib/teacher";
import {isAdmin} from "@/lib/admin";

export async function DELETE(
    req: Request,
    {params}: { params: { postId: string } }
) {
    try {
        const {userId} = auth();
        const teacher = isTeacher(userId);
        const admin = isAdmin(userId);

        if (!isTeacher(userId) || !isAdmin(userId) || !userId) {
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