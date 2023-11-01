interface CreatedDateProps {
    createdAt: Date;
}

export const CreatedDate = async ({
                                      createdAt
                                  }: CreatedDateProps) => {
    const formatCreatedAt = (createdAt: Date) => {
        // UTC 시간을 KST로 변환
        const date = new Date(createdAt);
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
    const formattedCreatedAt = formatCreatedAt(createdAt);

    return (
        <div>
            {formattedCreatedAt}
        </div>
    );
}