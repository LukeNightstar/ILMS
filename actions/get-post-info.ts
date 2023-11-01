import {prisma} from "@/lib/db";

interface GetPostInfoProps {
    userId: string;
    postId: string;
}

export const getPostInfo = async ({
                                      userId,
                                      postId,
                                  }: GetPostInfoProps) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                Comment: {
                    orderBy: {
                        createdAt: 'asc', // 댓글을 오름차순(가장 오래된 댓글부터)으로 정렬
                    }
                },
                PostLike: {
                    where: {
                        userId: userId, // 현재 사용자 ID
                    },
                    select: {
                        isLiked: true,
                    },
                },
                PostBookmark: {
                    where: {
                        userId: userId,
                    },
                    select: {
                        isMarked: true,
                    },
                },
                PostAttachment: {
                    where: {
                        postId: postId,
                    }
                }
            },
        });
        if (!post) {
            throw new Error("post를 찾지 못했습니다")
        }

        const postLike = await prisma.postLike.findUnique({
            where: {
                postId_userId: {
                    userId,
                    postId,
                }
            }
        })

        const postBookmark = await prisma.postBookmark.findUnique({
            where: {
                postId_userId: {
                    userId,
                    postId,
                }
            }
        })

        return {
            post,
            postLike,
            postBookmark,
        }

    } catch (e) {
        console.log("POST_INFO", e)
        return {
            postId: null,
            postLike: null,
        }
    }
}