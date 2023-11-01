import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";
import {auth} from "@clerk/nextjs"

// 카테고리 이름 호출
export async function GET(
    req: Request,
    {params}: { params: { categoryId: string } }
) {
    try {
        const {userId} = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const category = await prisma.category.findUnique({
            where: {
                id: params.categoryId,
            },
        });

        if (!category) {
            return new NextResponse("Not Found", {status: 404});
        }


        return NextResponse.json({name: category.name});
    } catch (e) {
        console.log("[BOARD_CATEGORY_NAME]", e);
        return new NextResponse("Internal Error", {status: 500});
    }
}
