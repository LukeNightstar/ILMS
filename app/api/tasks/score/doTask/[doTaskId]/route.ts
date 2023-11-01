import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";

export async function PATCH(
    req: Request,
    {params}: { params: { doTaskId: string; } }
) {
    try {
        const {doTaskId} = params;
        const {score} = await req.json();

        // Check if a DoTaskScore already exists for the given doTaskId
        const existingDoTaskScore = await prisma.doTaskScore.findFirst({
            where: {
                doTaskId: doTaskId
            }
        });

        if (existingDoTaskScore) {
            // If it exists, update the existing DoTaskScore
            const updatedDoTaskScore = await prisma.doTaskScore.update({
                where: {
                    id: existingDoTaskScore.id
                },
                data: {
                    score
                }
            });
            return NextResponse.json(updatedDoTaskScore);
        } else {
            // If it doesn't exist, create a new DoTaskScore
            const newDoTaskScore = await prisma.doTaskScore.create({
                data: {
                    score,
                    doTaskId: doTaskId
                }
            });
            return NextResponse.json(newDoTaskScore);
        }

    } catch (e) {
        console.log("[DOTASK_SCORE]", e);
        return new NextResponse("Internal Error", {status: 500});
    }
}