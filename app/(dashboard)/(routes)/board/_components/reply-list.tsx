import {Comment, Post, User} from "@prisma/client";
import {ReplyCard} from "@/app/(dashboard)/(routes)/board/_components/reply-card";

type CommentWithPost = Comment & {
    post: Post | null;
    user: User | null;
};

interface PostListProps {
    userId: string;
    items: CommentWithPost[];
}

const ReplyList = ({
                       userId,
                       items,
                   }: PostListProps) => {
    return (
        <div>
            <div className="grid grid-cols-1 gap-4">
                {items.map((item) => (
                    <ReplyCard
                        userId={userId}
                        key={item.id}
                        username={item.user?.username || ""}
                        initialData={item}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-xl text-muted-foreground mt-10">
                    댓글 없음
                </div>
            )}
        </div>
    )
};

export default ReplyList;