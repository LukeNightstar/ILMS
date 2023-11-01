import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {isTeacher} from "@/lib/teacher";
import {prisma} from "@/lib/db";
import {DataTable} from "@/app/(dashboard)/(routes)/teacher/tasks/score/_components/data-table";
import {columns} from "@/app/(dashboard)/(routes)/teacher/tasks/score/_components/columns";

const TaskScorePage = async () => {
    const {userId} = auth();

    if (!userId) {
        return redirect("/");
    }

    // 보안 설정
    if (!isTeacher(userId)) {
        return redirect("/");
    }

    const doTask = await prisma.doTask.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        }
    })

    return (
        <div className="-my-10">
            <DataTable columns={columns} data={doTask}/>
        </div>
    )
}

export default TaskScorePage;