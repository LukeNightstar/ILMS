import {Category, Course} from "@prisma/client";
import {CourseCard} from "@/app/(dashboard)/(routes)/courses/_components/course-card";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

interface CoursesListProps {
    items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({
                                items
                            }: CoursesListProps) => {
    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {items.map((item) => (
                    <CourseCard
                        key={item.categoryId}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl!}
                        chaptersLength={item.chapters.length}
                        progress={item.progress}
                        category={item?.category?.name!}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-xl text-muted-foreground mt-10">
                    강의 없음
                </div>
            )}
        </div>
    )
}