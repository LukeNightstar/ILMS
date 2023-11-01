interface UpdatedDateProps {
    updatedAt: Date;
}

export const UpdatedDate = async ({
                                      updatedAt
                                  }: UpdatedDateProps) => {
    const formatUpdatedAt = (updatedAt: Date) => {
        // UTC 시간을 KST로 변환
        const date = new Date(updatedAt);
        date.setTime(date.getTime());

        // 표시 형식 변환
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${date.getFullYear()}.${month}.${day} 
        ${hours}:${minutes}:${seconds}`;
    };
    const formattedUpdatedAt = formatUpdatedAt(updatedAt);

    return (
        <div>
            {formattedUpdatedAt}
        </div>
    );
}
