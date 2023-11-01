import {prisma} from "@/lib/db";
import {Board, Post, Prisma, User} from "@prisma/client";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";

type PostWithBoard = Post & {
    board: Board | null;
    user: User | null;
    commentCount: number;
    postLikeCount: number;
    isMarked: boolean;
};

type GetPosts = {
    title?: string;
    boardId: string;
    isMarked?: boolean;
}

export const getPosts = async ({
                                   title,
                                   boardId,
                                   isMarked,
                               }: GetPosts): Promise<PostWithBoard[]> => {
    try {
        const {userId} = auth();
        if (!userId) {
            return redirect("/");
        }

        // 기본 검색을 위한 요소
        const where: Prisma.PostWhereInput = {
            isPublished: true,
            title: {
                contains: title,
            },
            boardId,
        };

        if (isMarked) {
            where.PostBookmark = {
                some: {
                    isMarked: Boolean(isMarked),
                    userId: userId,
                },
            };
        }

        const posts = await prisma.post.findMany({
            where,
            include: {
                Board: true,
                User: true,
                Comment: true,
                PostLike: {
                    where: {
                        isLiked: true,
                    },
                },
                PostBookmark: {
                    where: {
                        userId
                    }
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });


        return posts.map((post) => {
            return {
                ...post,
                board: post.Board,
                user: post.User,
                commentCount: post.Comment.length,
                postLikeCount: post.PostLike.length,
                isMarked: post.PostBookmark.length === 1,
            };
        });

    } catch (error) {
        console.log("[GET_POSTS]", error)
        return [];
    }
}