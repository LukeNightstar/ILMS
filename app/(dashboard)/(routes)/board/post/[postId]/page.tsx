import {prisma} from "@/lib/db";
import {redirect} from "next/navigation";
import {auth} from "@clerk/nextjs";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {PostDeleteButton} from "@/app/(dashboard)/(routes)/board/_components/post-delete-button";
import PostViews from "@/app/(dashboard)/(routes)/board/_components/post-views";
import ReplyForm from "@/app/(dashboard)/(routes)/board/_components/reply-form";
import ReplyList from "@/app/(dashboard)/(routes)/board/_components/reply-list";
import {CreatedDate} from "@/components/created-date";
import {PenSquare} from "lucide-react";
import {PostLike} from "@/app/(dashboard)/(routes)/board/_components/post-like";
import {getPostInfo} from "@/actions/get-post-info";
import {PostBookmark} from "@/app/(dashboard)/(routes)/board/_components/post-bookmark";
import {AttachmentList} from "@/app/(dashboard)/(routes)/board/_components/attachment-list";

const PostIdPage = async ({
                              params
                          }: {
    params: {
        postId: string;
    }
}) => {
    const {userId} = auth();
    if (!userId) {
        return redirect("/");
    }

    const {
        post,
        postLike,
        postBookmark,
    } = await getPostInfo({
        userId,
        postId: params.postId,
    })
    if (!post) {
        return redirect("/")
    }

    // 사용자 정보 가져오기
    async function getUserInfo(userId: string) {
        return prisma.user.findUnique({
            where: {
                externalId: userId,
            },
        });
    }

    const postOwner = await getUserInfo(post.userId);

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

    // 첨부파일 정보

    // 댓글 정보 전달
    const commentInfo = await Promise.all(post.Comment.map(async (comment) => {
        const commentOwner = await getUserInfo(comment.userId);
        return {
            ...comment,
            post: post,
            user: commentOwner,
        };
    }));

    // 댓글 개수
    const commentCount = post.Comment.length;

    // 좋아요 개수
    const likedCount = post.PostLike.filter(like => like.isLiked).length;

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
                    <p>작성자</p>:<p>{postOwner?.username}</p>|<CreatedDate createdAt={post.createdAt}/>
                </div>
                <div className="flex items-center gap-x-1 justify-end">
                    <PostViews postId={params.postId} userId={userId}/>
                    <p>조회 : {post.views}</p>|<p>좋아요 : {likedCount} </p>|<p>댓글 : {commentCount}</p>
                </div>
            </div>
            <Separator className="mt-2 mb-4"/>
            <div className="border rounded-lg text-base h-96 p-2">
                <p>{post.content}</p>
            </div>
            <div className="mt-2 grid grid-cols-2">
                <div className="flex items-center gap-x-2">
                    <PostLike postId={params.postId} isLiked={!!postLike?.isLiked}/>
                    <PostBookmark postId={params.postId} isMarked={!!postBookmark?.isMarked}/>
                </div>
                <div className="flex items-center justify-end gap-x-2">
                    <div className="">
                        <Button disabled={!isAuthor} variant="outline" className="py-1 px-3">
                            <Link href={`/board/update/${params.postId}`} className="flex items-center">
                                <PenSquare className="h-4 w-4 mr-2"/>
                                <p>수정</p>
                            </Link>
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
            <Separator className="mt-4 mb-4"/>
            <div>
                <h1 className="text-xl font-semibold mb-2">첨부파일</h1>
                <AttachmentList items={post.PostAttachment}/>
            </div>
            <Separator className="mt-4"/>
            <div className="mt-4 mb-4">
                <ReplyForm postId={params.postId}/>
            </div>
            <Separator/>
            <div className="mt-4">
                <ReplyList items={commentInfo} userId={userId}/>
            </div>
        </div>
    );
}

export default PostIdPage