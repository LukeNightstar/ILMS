import {Category, Chapter, Course} from "@prisma/client";

import {prisma} from "@/lib/db";
import {getProgress} from "@/actions/get-progress";

type CourseWithProgressWithCategory = Course & {
    category: Category;
    chapters: Chapter[];
    progress: number | null;
};

type HomeCourses = {
    completedCourses: CourseWithProgressWithCategory[];
    coursesInProgress: CourseWithProgressWithCategory[];
}

// TODO: userId parameter 타입 수정해야함 기존 타입 string, 현재 버그 픽스를 위해 any로 바꿈
export const getHomeCourses = async (userId: any): Promise<HomeCourses> => {
    try {
        const courses = await prisma.course.findMany({
            where: {
                userId: userId,
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    }
                }
            }
        }) as CourseWithProgressWithCategory[];

        for (let course of courses) {
            course["progress"] = await getProgress(userId, course.id);
        }

        const completedCourses = courses.filter((course) => course.progress === 100);
        const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100);

        return {
            completedCourses,
            coursesInProgress,
        }
    } catch (error) {
        console.log("[GET_DASHBOARD_COURSES]", error);
        return {
            completedCourses: [],
            coursesInProgress: [],
        }
    }
}