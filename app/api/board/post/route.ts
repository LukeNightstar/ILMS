import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";

// 글 생성
export async function POST(
    req: Request
) {
    try {
        const {userId} = auth();
        const {title, content, board, urls} = await req.json();


        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!urls) {
            return new NextResponse("Bad Request - URLs are missing", {status: 400});
        }

        const boardId = board;

        const post = await prisma.post.create({
            data: {
                userId,
                title,
                content,
                boardId,
            },
        });

        // Get the newly created post's ID
        const postId = post.id;

        // Create postAttachments for each URL
        const postAttachments = urls.map((url: string) => ({
            name: url.split("/").pop(),
            url,
            userId,
            postId,
        }));

        // Create postAttachments in the database
        await prisma.postAttachment.createMany({
            data: postAttachments,
        });

        return NextResponse.json(post);
    } catch (error) {
        console.log("[BOARD_POST]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}