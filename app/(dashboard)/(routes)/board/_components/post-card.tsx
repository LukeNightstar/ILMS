import {CreatedDate} from "@/components/created-date";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import Link from "next/link";
import {PostIcon} from "@/app/(dashboard)/(routes)/board/_components/post-icon";

interface PostCardProps {
    id: string;
    title: string;
    content: string;
    category: string;
    username: string;
    createdAt: Date;
    views: number;
    commentCount: number;
    postLikeCount: number;
    isMarked: boolean;
}

export const PostCard = ({
                             id,
                             title,
                             content,
                             category,
                             username,
                             createdAt,
                             views,
                             commentCount,
                             postLikeCount,
                             isMarked
                         }: PostCardProps) => {
    const getLikeIcon = (postLikeCount: number) => {
        if (postLikeCount === 0) {
            return <AiOutlineHeart className="w-4 h-4 text-red-500"/>;
        } else {
            return <AiFillHeart className="w-4 h-4 text-red-500"/>;
        }
    };

    const likeIcon = getLikeIcon(postLikeCount);

    return (
        <>
            <Link href={`/board/post/${id}`}>
                <div
                    className="group shadow-md hover:shadow-lg hover:border-sky-700 transition overflow-hidden border rounded-lg p-3 h-full">
                    <div className="flex flex-col">
                        <div className="grid grid-cols-10">
                            <div className="col-span-9 font-semibold group-hover:text-sky-700 transition line-clamp-1">
                                <p className="text-2xl">{title}</p>
                            </div>
                            <div className="flex items-center justify-end">
                                <PostIcon postId={id} isMarked={isMarked}/>
                            </div>
                        </div>
                        <div className="flex flex-1 gap-x-2 items-center text-base text-muted-foreground mt-1">
                            <p>{category}</p>|<p>작성자 : {username}</p>
                        </div>
                        <div className="h-[80px] text-sm my-2 items-center line-clamp-4">
                            <p>{content}</p>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                            <CreatedDate createdAt={createdAt}/>
                        </div>
                        <div className="grid grid-cols-2 mt-1">
                            <div className="text-sm text-muted-foreground items-center">
                                <p className="flex flex-1 items-center gap-x-1">Like {likeIcon} {postLikeCount}</p>
                            </div>
                            <div
                                className="flex flex-1 justify-end gap-x-2 items-center text-sm text-muted-foreground">
                                <p>조회수 : {views}</p>|<p>댓글 : {commentCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};