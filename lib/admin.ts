export const isAdmin = (userId?: string | null) => {
    const allowedUserIds = process.env.NEXT_PUBLIC_ADMIN_ID?.split(',') ?? [];

    return allowedUserIds.includes(userId || '');
}
