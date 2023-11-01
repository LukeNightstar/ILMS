import {Button} from "@/components/ui/button";
import Link from "next/link";
import {BoardCategories} from "@/app/(dashboard)/(routes)/board/_components/board-categories";
import {prisma} from "@/lib/db";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {PostList} from "@/app/(dashboard)/(routes)/board/_components/post-list";
import {getPosts} from "@/actions/get-posts";
import {PencilLine} from "lucide-react";

interface BoardPageProps {
    searchParams: {
        title: string;
        boardId: string;
        isMarked: boolean;
    };
}

const BoardPage = async ({
                             searchParams,
                         }: BoardPageProps & {}) => {
    const {userId} = auth();
    if (!userId) {
        return redirect("/");
    }

    const categories = await prisma.board.findMany({
        orderBy: {
            name: "asc",
        }
    })

    const posts = await getPosts({
        ...searchParams,
    });

    return (
        <div className="-mt-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 items-center">
                <div>
                    <BoardCategories items={categories}/>
                </div>
                <div className="flex justify-end">
                    <Link href="/board/create">
                        <Button>
                            <PencilLine className="h-4 w-4 mr-2"/>
                            글쓰기
                        </Button>
                    </Link>
                </div>
            </div>
            <Separator className="mt-4 mb-4"/>
            <div className="">
                <PostList items={posts}/>
            </div>
        </div>
    );
};

export default BoardPage;
