import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";

export async function PATCH(
    req: Request,
    {params}: {
        params: {
            doTaskId: string;
        }
    }
) {
    try {
        const {doTaskId} = params;
        const {comment}: { comment: string } = await req.json();

        // Check if a DoTaskScore already exists for the given doTaskId
        const existingDoTaskScoreComment = await prisma.doTaskScore.findFirst({
            where: {
                doTaskId: doTaskId
            }
        });

        if (existingDoTaskScoreComment) {
            // If it exists, update the existing DoTaskScore
            const updatedDoTaskScore = await prisma.doTaskScore.update({
                where: {
                    id: existingDoTaskScoreComment.id
                },
                data: {
                    comment
                }
            });
            return NextResponse.json(updatedDoTaskScore);
        } else {
            // TODO: data 수정
            // If it doesn't exist, create a new DoTaskScore
            const newDoTaskScoreComment = await prisma.doTaskScore.create({
                // @ts-ignore
                data: {
                    comment: comment,
                    doTaskId: doTaskId
                }
            });
            return NextResponse.json(newDoTaskScoreComment);
        }

    } catch (e) {
        console.log("[DOTASK_SCORE]", e);
        return new NextResponse("Internal Error", {status: 500});
    }
}