import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import Link from "next/link";
import {ArrowLeft, LayoutDashboard, Video} from "lucide-react";

import {prisma} from "@/lib/db";
import {IconBadge} from "@/components/icon-badge";
import {Banner} from "@/components/banner";

import {ChapterTitleForm} from "./_components/chapter-title-form";
import {ChapterDescriptionForm} from "./_components/chapter-description-form";
import {ChapterVideoForm} from "./_components/chapter-video-form";
import {ChapterActions} from "./_components/chapter-actions";

const ChapterIdPage = async ({
                                 params
                             }: {
    params: { courseId: string; chapterId: string; }
}) => {
    const {userId} = auth();

    if (!userId) {
        return redirect("/");
    }

    const chapter = await prisma.chapter.findUnique({
        where: {
            id: params.chapterId,
            courseId: params.courseId
        },
        include: {
            muxData: true,
        },
    });

    if (!chapter) {
        return redirect("/");
    }

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            {/* 상단 배너 */}
            {!chapter.isPublished && (
                <Banner
                    variant="warning"
                    label="이 단원은 아직 등록되지 않았습니다."
                />
            )}

            {/* 제목 + 진척도 + 뒤로가기*/}
            <div className="mt-6">
                <div className="flex items-center justify-between">
                    <div className="w-full">
                        <Link href={`/teacher/courses/${params.courseId}`}
                              className="flex items-center text-sm hover:opacity-75 transition mb-6"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2"/>
                            강의 관리로 돌아가기
                        </Link>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col gap-y-2">
                                <h1 className="text-4xl font-bold">
                                    단원 생성
                                </h1>
                                <span className="text-sm text-slate-700">
                                    모든 설정을 완료하세요 {completionText}
                                </span>
                            </div>
                            <ChapterActions
                                disabled={!isComplete}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                                isPublished={chapter.isPublished}
                            />
                        </div>
                    </div>
                </div>

                {/* 메인 영역 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center gap-x-3">
                                <IconBadge icon={LayoutDashboard}/>
                                <h2 className="text-xl font-bold">
                                    단원을 수정하세요
                                </h2>
                            </div>
                            <ChapterTitleForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />
                            <ChapterDescriptionForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />
                        </div>


                        {/* TODO: 엑세스 여부 설정 = 추후 다른 기능으로 대체 예정*/}
                        {/*<div>
                            <div className="flex items-center gap-x-3">
                                <IconBadge icon={Eye}/>
                                <h2 className="text-xl font-bold">
                                    Access Settings
                                </h2>
                            </div>
                            <ChapterAccessForm initialData={chapter} courseId={params.courseId}
                                               chapterId={params.chapterId}/>
                        </div>*/}
                    </div>
                    <div>
                        <div className="flex items-center gap-x-3">
                            <IconBadge icon={Video}/>
                            <h2 className="text-xl font-bold">
                                영상 추가
                            </h2>
                        </div>
                        <ChapterVideoForm
                            initialData={chapter}
                            chapterId={params.chapterId}
                            courseId={params.courseId}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChapterIdPage;