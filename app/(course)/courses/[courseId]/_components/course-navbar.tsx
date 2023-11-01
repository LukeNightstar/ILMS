import {Chapter, Course, UserProgress} from "@prisma/client";
import {LogOut} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {CourseMobileSidebar} from "@/app/(course)/courses/[courseId]/_components/course-mobile-sidebar";

interface CourseNavbarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;
}

const CourseNavbar = ({
                          course,
                          progressCount
                      }: CourseNavbarProps) => {
    return (
        <div className="bg-white flex items-center h-[80px] px-6 border-b shadow-sm">
            <CourseMobileSidebar course={course} progressCount={progressCount}/>
            <div className="flex flex-1 gap-x-4 justify-end">
                <Link href="/courses">
                    <Button className="bg-white text-black shadow-sm" variant="outline">
                        <LogOut className="h-4 w-4 mr-2"/>
                        나가기
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default CourseNavbar;