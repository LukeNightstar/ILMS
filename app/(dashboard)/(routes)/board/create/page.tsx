import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {prisma} from "@/lib/db";
import {isTeacher} from "@/lib/teacher";
import {isAdmin} from "@/lib/admin";
import CreateForm from "@/app/(dashboard)/(routes)/board/create/_components/create-form";

const BoardCreate = async () => {

    const {userId} = auth();
    if (!userId) {
        return redirect("/");
    }

    // 권한에 따라서 분리
    const isTeacherId = isTeacher(userId);
    const isAdminId = isAdmin(userId);

    let board_categories;
    if (isTeacherId || isAdminId) {
        board_categories = await prisma.board.findMany({
            orderBy: {
                name: "asc",
            },
        });
    } else {
        board_categories = await prisma.board.findMany({
            orderBy: {
                name: "asc",
            },
            where: {
                NOT: {
                    name: "공지",
                },
            },
        });
    }

    return (
        <div className="-mt-4">
            <CreateForm
                options={board_categories.map((category) => ({
                    label: category.name,
                    value: category.id,
                }))}
            />
        </div>
    )
};

export default BoardCreate;
