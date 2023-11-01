import {Categories} from "@/app/(dashboard)/(routes)/courses/_components/categories";
import {getCourses} from "@/actions/get-courses";
import {SearchInput} from "@/components/search-input";
import {prisma} from "@/lib/db";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {CoursesList} from "@/app/(dashboard)/(routes)/courses/_components/courses-list";

interface CoursePageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
}

const CoursePage = async ({
                              searchParams
                          }: CoursePageProps) => {
    const {userId} = auth();

    if (!userId) {
        return redirect("/");
    }

    const categories = await prisma.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    const courses = await getCourses({
        userId,
        ...searchParams,
    });

    return (
        <div>
            <div className="md:hidden pb-6 md:pb-0">
                <SearchInput/>
            </div>
            <div className="">
                <Categories items={categories}/>
                <CoursesList items={courses}/>
            </div>
        </div>
    )
}

export default CoursePage;