import Link from "next/link"
import React from 'react';
import {redirect} from "next/navigation";
import {Logo} from "@/app/(dashboard)/_components/logo";
import {UserInfo} from "@/components/user-info";
import {Chapter, Course, UserProgress} from "@prisma/client";
import {auth} from "@clerk/nextjs";
import {CourseSidebarItem} from "@/app/(course)/courses/[courseId]/_components/course-sidebar-item";
import {CourseProgress} from "@/app/(dashboard)/(routes)/courses/_components/course-progress";
import {Separator} from "@/components/ui/separator";

interface CourseSidebarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[]
    };
    progressCount: number;
}

export const CourseSidebar = async ({
                                        course,
                                        progressCount,
                                    }: CourseSidebarProps) => {
    const {userId} = auth();
    if (!userId) {
        return redirect("/");
    }

    return (
        // #25262D = 37, 38, 45
        <div className="bg-gray-900 shadow-lg border-r w-[300px] h-screen overflow-hidden p-4 relative">

            <div>
                <Link href="/home" className="mt-4 flex items-center justify-center">
                    <Logo/>
                </Link>
            </div>

            <Separator className="mt-8"/>
            <div className="py-3 px-3 mt-4 mb-4 flex-col space-y-2 text-white bg-blue-900/60 rounded-lg">
                <UserInfo/>
            </div>
            <Separator className="mb-4"/>

            {/* 타이틀 */}
            <div className="p-4 flex flex-col shadow-sm mb-2">
                <h1 className="font-bold text-xl text-white">
                    {course.title}
                </h1>
                {/* Progress */}
                <div className="mt-10">
                    <CourseProgress variant="success" value={progressCount}/>
                </div>
            </div>

            {/* 강의 */}
            {/*TODO: 사이드바 scroll 수정 필요*/}
            <div className="overflow-hidden whitespace-nowrap overflow-y-scroll">
                <div className="flex flex-col w-full overflow-y-scroll scrollbar-hide space-y-2">
                    {course.chapters.map((chapter) => (
                        <CourseSidebarItem
                            key={chapter.id}
                            id={chapter.id}
                            label={chapter.title}
                            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                            courseId={course.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
