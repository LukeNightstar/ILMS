import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {getChapter} from "@/actions/get-chapter";
import {Banner} from "@/components/banner";
import {VideoPlayer} from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/video-player";
import {Separator} from "@/components/ui/separator";
import {Preview} from "@/components/preview";
import {File} from "lucide-react";
import {
    CourseProgressButton
} from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/course-progress-button";

const ChapterIdPage = async ({
                                 params
                             }: {
    params: { courseId: string; chapterId: string; }
}) => {
    const {userId} = auth();
    if (!userId) {
        return redirect("/");
    }

    const {
        chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        userProgress,
    } = await getChapter({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
    });

    if (!chapter || !course) {
        return redirect("/courses")
    }

    const completeOnEnd = !userProgress?.isCompleted;

    return (
        <div>
            {/* 최상단 배너 */}
            <div className="mb-6">
                {userProgress?.isCompleted && (
                    <Banner
                        variant="success"
                        label="이미 시청한 영상 입니다."
                    />
                )}
            </div>

            <div className="flex flex-col max-w-4xl mx-auto">
                <div className="">
                    <VideoPlayer
                        chapterId={params.chapterId}
                        title={chapter.title}
                        courseId={params.courseId}
                        nextChapterId={nextChapter?.id}
                        playbackId={muxData?.playbackId!}
                        completeOnEnd={completeOnEnd}
                    />
                </div>
                <div className="mt-4">
                    <div className="flex flex-1 items-center justify-between px-2">
                        <h2 className="text-3xl font-semibold mb-4">
                            {chapter.title}
                        </h2>
                        <div className="mb-2">
                            <CourseProgressButton
                                chapterId={params.chapterId} courseId={params.courseId}
                                nextChapterId={nextChapter?.id} isCompleted={!!userProgress?.isCompleted}
                            />
                        </div>
                    </div>
                    <Separator/>
                    <div className="">
                        <Preview value={chapter.description!}/>
                    </div>
                    <Separator/>
                    <div className="mt-4 space-y-4">
                        <p className="text-lg font-semibold">첨부파일</p>
                        {attachments.map((attachment) => (
                            <a
                                target="_blank"
                                href={attachment.url}
                                key={attachment.id}
                                className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                            >
                                <File/>
                                <p className="line-clamp-1">
                                    {attachment.name}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChapterIdPage;