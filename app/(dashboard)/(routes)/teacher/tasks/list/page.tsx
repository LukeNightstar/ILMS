import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {prisma} from "@/lib/db";
import * as React from "react";
import {DataTable} from "@/app/(dashboard)/(routes)/teacher/tasks/_components/data-table";
import {columns} from "@/app/(dashboard)/(routes)/teacher/tasks/_components/columns";
import {isTeacher} from "@/lib/teacher";

const TaskPage = async () => {
    const {userId} = auth();

    if (!userId) {
        return redirect("/");
    }

    // 보안 설정
    if (!isTeacher(userId)) {
        return redirect("/");
    }


    const task = await prisma.task.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        }
    });

    return (
        <div className="-my-10">
            <DataTable columns={columns} data={task}/>
        </div>
    );
}

export default TaskPage;