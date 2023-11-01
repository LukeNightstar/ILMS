import {prisma} from "@/lib/db";
import {redirect} from "next/navigation";
import {auth} from "@clerk/nextjs";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {PostDeleteButton} from "@/app/(dashboard)/(routes)/board/_components/post-delete-button";
import PostViews from "@/app/(dashboard)/(routes)/board/_components/post-views";
import ReplyList from "@/app/(dashboard)/(routes)/board/_components/reply-list";
import {CreatedDate} from "@/components/created-date";
import {PenSquare} from "lucide-react";

const PostIdPageAdmin = async ({
                                   params
                               }: {
    params: { postId: string; userId: string; }
}) => {
    const {userId} = auth();
    if (!userId) {
        return redirect("/");
    }

    const post = await prisma.post.findUnique({
        where: {
            id: params.postId,
        },
        include: {
            Comment: {
                orderBy: {
                    createdAt: 'asc',
                }
            }
        },
    });
    if (!post) {
        return redirect("/");
    }

    // 사용자 정보 가져오기
    async function getUserInfo(userId: string) {
        return prisma.user.findUnique({
            where: {
                externalId: userId,
            },
        });
    }

    const user = await getUserInfo(post.userId);

    // 게시판 정보
    async function getBoardInfo(boardId: string) {
        return prisma.board.findUnique({
            where: {
                id: boardId,
            }
        })
    }

    const board = await getBoardInfo(post.boardId)

    // 현재 사용자가 게시글 작성자인 경우에만 수정 버튼을 활성화
    const isAuthor = post.userId === userId;

    // 댓글 정보 전달
    const comment = post.Comment.map((comment) => ({
        ...comment,
        post: post,
        user: user,
    }));

    // 댓글 개수
    const commentCount = post.Comment.length; // 댓글 갯수

    return (
        <div className="-mt-4">
            <div className="items-center justify-start">
                <h1 className="text-4xl font-semibold">
                    {post.title}
                </h1>
            </div>
            <div className="mt-1">
                {board?.name}
            </div>
            <div className="mt-1 grid md:grid-cols-2 sm:grid-cols-1">
                <div className="flex items-center gap-x-1 w-auto">
                    <p>작성자</p>:<p>{user?.username}</p>|<CreatedDate createdAt={post.createdAt}/>
                </div>
                <div className="flex items-center gap-x-1 justify-end">
                    <PostViews postId={params.postId} userId={userId}/>
                    <p>조회 : {post.views}</p>|<p>좋아요</p>|<p>댓글 : {commentCount}</p>
                </div>
            </div>
            <Separator className="mt-2 mb-4"/>
            <div className="border rounded-lg text-base h-96 p-2">
                <p>{post.content}</p>
            </div>
            <div className="mt-2 grid grid-cols-2">
                <div>
                    좋아요
                </div>
                <div className="flex items-center justify-end gap-x-2">
                    <div className="">
                        <Button disabled={!isAuthor} className="" variant="outline">
                            <Link href={`/board/update/${params.postId}`}>
                                <PenSquare className="h-4 w-4 mr-2"/>
                            </Link>
                            수정
                        </Button>
                    </div>
                    <div>
                        {/* field set 으로 비활성화 */}
                        <fieldset disabled={!isAuthor}>
                            <PostDeleteButton postId={params.postId}/>
                        </fieldset>
                    </div>
                </div>
            </div>
            <Separator className="mt-4"/>
            <div className="mt-4">
                <ReplyList items={comment} userId={userId}/>
            </div>
        </div>
    );
}

export default PostIdPageAdmin;