import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";

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
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const postBookmark = await prisma.postBookmark.findFirst({
            where: {
                postId: params.postId,
                userId,
            },
        });

        if (postBookmark) {
            // 이미 즐겨찾기된 경우 즐겨찾기 삭제
            await prisma.postBookmark.delete({
                where: {
                    id: postBookmark.id,
                },
            });
            return new NextResponse("Bookmark removed");
        } else {
            // 아직 즐겨찾기되지 않은 경우 즐겨찾기 생성
            await prisma.postBookmark.create({
                data: {
                    userId,
                    postId: params.postId,
                    isMarked: true,
                },
            });
            return new NextResponse("Bookmark added");
        }
    } catch (e) {
        console.log("[POST_LIKE]", e);
        return new NextResponse("Internal Error", {status: 500});
    }
}
