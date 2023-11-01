import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import {prisma} from "@/lib/db";
import {isTeacher} from "@/lib/teacher";

export async function POST(
    req: Request,
) {
    try {

        const {userId} = auth();
        const {title} = await req.json();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const task = await prisma.task.create({
            data: {
                userId,
                title,
            }
        });

        return NextResponse.json(task);

    } catch (error) {
        console.log("[TASKS]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}