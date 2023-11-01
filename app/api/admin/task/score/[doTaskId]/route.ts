import {prisma} from "@/lib/db";
import {NextResponse} from "next/server";

export async function GET(
    req: Request,
    {params}: { params: { id: string; } }
) {
    try {
        const doTaskId = params.id;

        const doTaskScore = await prisma.doTaskScore.findFirst({
            where: {
                id: doTaskId,
            }
        })

        if (!doTaskScore) {
            return new NextResponse("Not Found", {status: 404});
        }

        return NextResponse.json({score: doTaskScore.score});
    } catch (e) {
        console.log("[USER_EMAIL]", e);
        return new NextResponse("Internal Error", {status: 500});
    }
}