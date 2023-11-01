import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";

import {prisma} from "@/lib/db";

export async function PATCH(
    req: Request,
    {params}: { params: { courseId: string } }
) {
    try {
        const {userId} = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const course = await prisma.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            },
        });

        if (!course) {
            return new NextResponse("Not found", {status: 404});
        }

        const unpublishedCourse = await prisma.course.update({
            where: {
                id: params.courseId,
                userId,
            },
            data: {
                isPublished: false,
            }
        });

        return NextResponse.json(unpublishedCourse);
    } catch (error) {
        console.log("[COURSE_ID_UNPUBLISHED]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}