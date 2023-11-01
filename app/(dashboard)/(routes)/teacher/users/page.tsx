import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {isTeacher} from "@/lib/teacher";
import {isAdmin} from "@/lib/admin";
import {prisma} from "@/lib/db";
import {DataTable} from "@/app/(dashboard)/(routes)/teacher/users/_components/data-table";
import {columns} from "@/app/(dashboard)/(routes)/teacher/users/_components/columns";

const UserPage = async () => {
    const {userId} = auth();
    if (!userId) {
        return redirect("/");
    }

    // 보안 설정 TODO: 이거 수정해야함
    if (isTeacher(userId) || isAdmin(userId)) {
    } else {
        return redirect("/");
    }

    const users = await prisma.user.findMany();

    return (
        <div>
            <DataTable columns={columns} data={users}/>
        </div>
    )
}

export default UserPage;