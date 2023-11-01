import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {isTeacher} from "@/lib/teacher";
import {isAdmin} from "@/lib/admin";
import {prisma} from "@/lib/db";
import {DataTable} from "@/app/(dashboard)/(routes)/teacher/boards/_components/data-table";
import {columns} from "@/app/(dashboard)/(routes)/teacher/boards/_components/columns";

const BoardPage = async () => {
    const {userId} = auth();
    if (!userId) {
        return redirect("/");
    }

    // 보안 설정 TODO: 이거 수정해야함
    if (isTeacher(userId) || isAdmin(userId)) {
    } else {
        return redirect("/");
    }

    const posts = await prisma.post.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            Board: true,
        }
    });

    return (
        <div className="-mt-10">
            <DataTable columns={columns} data={posts}/>
        </div>
    )
}

export default BoardPage;