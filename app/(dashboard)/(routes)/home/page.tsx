import {Separator} from "@/components/ui/separator";
import {currentUser} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {getHomeCourses} from "@/actions/get-home-courses";
import {CoursesList} from "@/app/(dashboard)/(routes)/courses/_components/courses-list";
import {CheckCircle, Clock} from "lucide-react";
import {InfoCard} from "@/app/(dashboard)/_components/info-card";

export default async function HomePage() {

    const userId = currentUser();

    if (!userId) {
        return redirect("/");
    }

    const {
        completedCourses,
        coursesInProgress,
    } = await getHomeCourses(userId);

    return (
        <div className="flex flex-1 flex-col">
            {/* 메인 슬로건 */}
            <div className="space-y-2">
                <h1 className="lg:text-[46px] md:text-4xl font-bold text-center sticky">
                    사람과 사람 그리고 생각을 연결하다
                </h1>
                <h2 className="text-muted-foreground font-bold md:text-lg lg:text-2xl text-center">
                    Interactive Learning Management System
                </h2>
            </div>

            {/* 메인 배너 */}
            <div className="mt-4">
                {/*<AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
                    <Image src="/images/Starfield_NewAtlantis.webp" alt="test image" fill
                           className="rounded-lg shadow-md" priority={false}/>
                </AspectRatio>*/}
            </div>

            {/* 컨텐츠 */}
            <div className="mt-8">
                <div>
                    <p className="font-bold text-2xl">새로운 소식</p>
                </div>
                <Separator className="mt-2 mb-4"/>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoCard
                        icon={Clock}
                        label="수강 중인 강의"
                        numberOfItems={coursesInProgress.length}
                    />
                    <InfoCard
                        icon={CheckCircle}
                        label="수강 완료한 강의"
                        numberOfItems={completedCourses.length}
                        variant="success"
                    />
                </div>
                <CoursesList items={[...coursesInProgress, ...completedCourses]}/>
            </div>
        </div>
    );
}
