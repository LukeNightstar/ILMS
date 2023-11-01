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
            },
            include: {
                email: {
                    select: {
                        email_address: true,
                    },
                },
            },
        });


        if (!user) {
            return new NextResponse("Not Found", {status: 404});
        }

        if (user.email) {
            return NextResponse.json({ address: user.email[0].email_address });
        } else {
            return new NextResponse("Email Not Found", { status: 404 });
        }
    } catch (e) {
        console.log("[USER_EMAIL]", e);
        return new NextResponse("Internal Error", {status: 500});
    }
}