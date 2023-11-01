import {prisma} from "@/lib/db";

interface DateCalculatorProps {
    taskId: string;
}

const DateCalculator = async ({
                                  taskId
                              }: DateCalculatorProps) => {

    const task = await prisma.task.findUnique({
        where: {
            id: taskId,
        }
    })

    const currentDate = new Date();
    //@ts-ignore
    const deadlineDate = new Date(task.deadline);

    const timeRemaining = deadlineDate.getTime() - currentDate.getTime();

    const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    const daysText = daysRemaining > 0 ? `${daysRemaining}일` : "";
    const hoursText = hoursRemaining > 0 ? `${hoursRemaining}시간` : "";
    const minutesText = minutesRemaining > 0 ? `${minutesRemaining}분` : "";

    const timeRemainingText = `${daysText} ${hoursText} ${minutesText} 남음`;

    const isDeadlinePassed = timeRemaining <= 0;

    const displayText = isDeadlinePassed
        ? "마감일이 지났습니다"
        : `마감일까지 ${timeRemainingText} 남았습니다`;

    return (
        <>
            {displayText}
        </>
    )
}

export default DateCalculator;