import {prisma} from "@/lib/db";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import UpdateForm from "@/app/(dashboard)/(routes)/board/update/[postId]/_components/update-form-test";
import {isTeacher} from "@/lib/teacher";
import {isAdmin} from "@/lib/admin";

const PostUpdatePage = async ({
                                  params
                              }: {
    params: {
        postId: string;
    }
}) => {

    const {userId} = auth();
    if (!userId) {
        return redirect("/")
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

    // postId를 기반으로 해당 글의 데이터를 서버에서 가져옴
    const post = await prisma.post.findUnique({
        where: {
            id: params.postId,
            userId,
        },
        select: {
            userId: true,
            title: true,
            content: true,
            boardId: true,
        }
    })
    if (!post) {
        return redirect("/board");
    }

    const postAttachment = await prisma.postAttachment.findMany({
        where: {
            postId: params.postId,
            userId,
        }
    });

    return (
        <div className="-mt-4">
            <UpdateForm
                initialData={{
                    title: post.title, content: post.content, boardId: post.boardId || "",
                }}
                options={board_categories.map((category) => ({
                    label: category.name,
                    value: category.id
                }))}
                postId={params.postId}
                postAttachments={postAttachment}/>
        </div>
    );
}

export default PostUpdatePage;