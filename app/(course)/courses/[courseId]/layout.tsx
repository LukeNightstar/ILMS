// CourseIdPage Layout
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {prisma} from "@/lib/db";
import {getProgress} from "@/actions/get-progress";
import {CourseSidebar} from "@/app/(course)/courses/[courseId]/_components/course-sidebar";
import CourseNavbar from "@/app/(course)/courses/[courseId]/_components/course-navbar";

const CourseLayout = async ({
                                children,
                                params
                            }: {
    children: React.ReactNode;
    params: { courseId: string };
}) => {

    const {userId} = auth();
    if (!userId) {
        return redirect("/");
    }

    const course = await prisma.course.findUnique({
        where: {
            id: params.courseId,
        },
        include: {
            chapters: {
                where: {
                    isPublished: true
                },
                include: {
                    userProgress: {
                        where: {
                            userId,
                        }
                    }
                },
                orderBy: {
                    position: "asc",
                }
            }
        }
    })
    if (!course) {
        return redirect("/");
    }

    const progressCount = await getProgress(userId, course.id);

    // CourseIdPage Layout
    return (
        <div className="flex grow h-screen w-screen top-0 z-0 fixed">

            <div className="min-w-[300px] transform -translate-x-full absolute lg:!translate-x-0 left-0 top-0
            lg:relative h-screen
            ">
                {/*사이드바*/}
                <div className="h-full md:flex md:w-[300px] md:flex-col md:fixed md:inset-y-0">
                    <CourseSidebar course={course} progressCount={progressCount}/>
                </div>
            </div>

            {/*class="!overflow-hidden max-w-screen max-w-full lg:max-w-[calc(100vw-300px)] flex flex-col grow relative"*/}
            {/*메인영역*/}
            <div
                className="flex flex-col overflow-hidden bg-white max-w-screen max-w-full lg:max-w-[calc(100vw-300px)] grow relative">
                <div>
                    <CourseNavbar course={course} progressCount={progressCount}/>
                </div>

                <div
                    className="flex flex-col overflow-y-auto bg-white max-w-screen max-w-full p-4 lg:max-w-[calc(100vw-300px)] grow">
                    {children}
                </div>
            </div>

        </div>
    );
}

export default CourseLayout;