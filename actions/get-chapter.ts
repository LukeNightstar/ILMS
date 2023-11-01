import {prisma} from "@/lib/db";
import {Attachment, Chapter} from "@prisma/client";

interface GetChapterProps {
    userId: string;
    courseId: string;
    chapterId: string;
}

export const getChapter = async ({
                                     userId,
                                     courseId,
                                     chapterId,
                                 }: GetChapterProps) => {
    try {
        const course = await prisma.course.findUnique({
            where: {
                isPublished: true,
                id: courseId,
            },
        });

        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true,
            }
        });

        if (!chapter || !course) {
            throw new Error("강의를 찾지 못했습니다");
        }

        let muxData = null;
        let nextChapter: Chapter | null = null;

        const attachments = await prisma.attachment.findMany({
            where: {
                courseId: courseId
            }
        });

        if (chapter) {
            muxData = await prisma.muxData.findUnique({
                where: {
                    chapterId: chapterId,
                }
            });

            nextChapter = await prisma.chapter.findFirst({
                where: {
                    courseId: courseId,
                    isPublished: true,
                    position: {
                        gt: chapter?.position,
                    }
                },
                orderBy: {
                    position: "asc",
                }
            });
        }

        const userProgress = await prisma.userProgress.findUnique({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId,
                }
            }
        });

        return {
            chapter,
            course,
            muxData,
            attachments,
            nextChapter,
            userProgress,
        };
    } catch (error) {
        console.log("[GET_CHAPTER]", error);
        return {
            chapter: null,
            course: null,
            muxData: null,
            attachments: [],
            nextChapter: null,
            userProgress: null,
        }
    }
}