import {Menu} from "lucide-react";
import {Chapter, Course, UserProgress} from "@prisma/client";

import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";

import {CourseSidebar} from "./course-sidebar";

interface CourseMobileSidebarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;
}

export const CourseMobileSidebar = ({
                                        course,
                                        progressCount,
                                    }: CourseMobileSidebarProps) => {
    return (
        // Sheet.tsx에서 사이드바 끄기 버튼 X 주석 처리함
        <Sheet>
            <SheetTrigger className="lg:hidden hover:opacity-75 transition">
                <Menu/>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white w-72">
                <CourseSidebar
                    course={course}
                    progressCount={progressCount}
                />
            </SheetContent>
        </Sheet>
    )
}