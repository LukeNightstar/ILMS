import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";

export async function GET(
    req: Request,
    {params}: { params: { userId: string; } }
) {
    try {
        const userId = params.userId;

        const user = await prisma.user.findUnique({
            where: {
                externalId: userId,
            }
        });

        if (!user) {
            return new NextResponse("Not Found", {status: 404});
        }

        return NextResponse.json({username: user.username});
    } catch (e) {
        console.log("[USER_EMAIL]", e);
        return new NextResponse("Internal Error", {status: 500});
    }
}