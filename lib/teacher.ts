export const isTeacher = (userId?: string | null) => {
    const allowedUserIds = process.env.NEXT_PUBLIC_TEACHER_ID?.split(',') ?? [];

    return allowedUserIds.includes(userId || '');
}
