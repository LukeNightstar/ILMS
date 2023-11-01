import {auth} from "@clerk/nextjs";
import {redirect, useRouter} from "next/navigation";
import {ArrowLeft, ClipboardEdit, File, ListChecks} from "lucide-react";

import {prisma} from "@/lib/db";
import {IconBadge} from "@/components/icon-badge";

import {TitleForm} from "./_components/title-form";
import {DescriptionForm} from "./_components/description-form";
import {ImageForm} from "./_components/image-form";
import {CategoryForm} from "./_components/category-form";
import {AttachmentForm} from "./_components/attachment-form";
import {ChaptersForm} from "./_components/chapters-form";
import {Banner} from "@/components/banner";
import {Actions} from "./_components/actions";
import Link from "next/link";

const CourseIdPage = async ({
                                params
                            }: {
    params: {
        courseId: string
    }
}) => {

    const {userId} = auth();
    if (!userId) {
        return redirect("/")
    }

    const course = await prisma.course.findUnique({
        where: {
            id: params.courseId,
            userId,
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                },
            },
            attachments: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });
    if (!course) {
        return redirect("/");
    }

    const categories = await prisma.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields} / ${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            {!course.isPublished && (
                <Banner label="이 강의는 등록되지 않아 목록에서 볼 수 없습니다."
                />
            )}
            <div className="mt-6">
                <div className="flex items-center justify-between">
                    <div className="w-full">
                        <Link href={`/teacher/courses`}
                              className="flex items-center text-sm hover:opacity-75 transition mb-6"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2"/>
                            강의 목록으로 돌아가기
                        </Link>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col gap-y-2">
                                <h1 className="text-4xl font-bold">
                                    강의 관리
                                </h1>
                                <span className="text-sm text-slate-700">
                                     모든 설정을 완료하세요 {completionText}
                                </span>
                            </div>
                            <Actions
                                disabled={!isComplete}
                                courseId={params.courseId}
                                isPublished={course.isPublished}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    <div>
                        <div className="flex items-center gap-x-3">
                            <IconBadge icon={ClipboardEdit} variant={"default"} size={"default"}/>
                            <h1 className="text-xl font-bold">
                                강의를 수정하세요
                            </h1>
                        </div>
                        <TitleForm initialData={course} courseId={course.id}/>
                        <DescriptionForm initialData={course} courseId={course.id}/>
                        <ImageForm initialData={course} courseId={course.id}/>
                        <CategoryForm
                            initialData={course}
                            courseId={course.id}
                            options={categories.map((category) => ({
                                label: category.name,
                                value: category.id,
                            }))}/>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-3">
                                <IconBadge icon={ListChecks} variant={"default"} size={"default"}/>
                                <h1 className="text-xl font-bold">
                                    단원 목록
                                </h1>
                            </div>
                            <div>
                                <ChaptersForm initialData={course} courseId={course.id}/>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-x-3">
                                <IconBadge icon={File}/>
                                <h1 className="text-xl font-bold">
                                    첨부파일
                                </h1>
                            </div>
                            <AttachmentForm initialData={course} courseId={course.id}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseIdPage;