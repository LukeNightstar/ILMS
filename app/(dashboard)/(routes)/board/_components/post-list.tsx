import {Board, Post, User} from "@prisma/client";
import {PostCard} from "@/app/(dashboard)/(routes)/board/_components/post-card";

type PostWithBoard = Post & {
    board: Board | null;
    user: User | null;
    commentCount: number;
    postLikeCount: number;
    isMarked: boolean;
};

interface PostListProps {
    items: PostWithBoard[];
}

export const PostList = async ({
                                   items,
                               }: PostListProps) => {
    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-4">
                {items.map((item) => (
                    <PostCard
                        key={item.boardId}
                        id={item.id}
                        title={item.title}
                        content={item.content || "내용이 없습니다."}
                        category={item?.board?.name!}
                        username={item.user?.username || ""}
                        createdAt={item.createdAt}
                        views={item.views}
                        commentCount={item.commentCount}
                        postLikeCount={item.postLikeCount}
                        isMarked={item.isMarked}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-xl text-muted-foreground mt-10">
                    게시글 없음
                </div>
            )}
        </div>
    );

};