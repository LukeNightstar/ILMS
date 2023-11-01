import {columns} from "./_components/columns";
import {DataTable} from "./_components/data-table";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {prisma} from "@/lib/db";
import {isTeacher} from "@/lib/teacher";
import {isAdmin} from "@/lib/admin";

const CoursePage = async () => {
    const {userId} = auth();

    if (!userId) {
        return redirect("/");
    }

    // 보안 설정
    if (!isTeacher(userId)) {
        return redirect("/");
    }

    if (isTeacher(userId) || isAdmin(userId)) {
    } else {
        return redirect("/");
    }

    const courses = await prisma.course.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        }
    });

    return (
        <div className="-mt-10">
            <DataTable columns={columns} data={courses}/>
        </div>
    );
}

export default CoursePage;