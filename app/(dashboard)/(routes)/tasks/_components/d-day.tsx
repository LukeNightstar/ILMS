import {AlertTriangle, Clock, HelpCircle, XOctagon} from "lucide-react";

interface DDayProps {
    deadline: Date | null;
}

export const DDay = ({
                         deadline
                     }: DDayProps) => {

    // 날짜 변환
    const formatDate = (dateDate: Date) => {
        const currentDate = new Date();

        const differenceInTime = dateDate.getTime() - currentDate.getTime();
        return Math.ceil(differenceInTime / (1000 * 3600 * 24));
    }

    const getIcon = (daysRemaining: number) => {
        // 마감일이 지난 경우
        if (daysRemaining <= 0) {
            return (
                <div className="text-gray-500 font-bold text-xl flex flex-1 items-center">
                    <XOctagon className="h-[20px] w-[20px] mr-1"/>
                    만료됨
                </div>
            );
        } else if (daysRemaining <= 3) {
            // 3일 이하 남은 경우
            return (
                <div className="text-red-600 font-bold text-xl flex flex-1 items-center">
                    <AlertTriangle className="h-[24px] w-[24px] mr-2"/>
                    D-{daysRemaining}
                </div>
            );
        } else if (daysRemaining <= 7) {
            // 일주일 이하 남은 경우
            return (
                <div className="text-orange-400 font-bold text-xl flex flex-1 items-center">
                    <AlertTriangle className="h-[24px] w-[24px] mr-2"/>
                    D-{daysRemaining}
                </div>
            );
        } else {
            return (
                <div className="text-slate-800 font-bold text-xl flex flex-1 items-center">
                    <Clock className="h-[20px] w-[20px] mr-1"/>
                    D-{daysRemaining}
                </div>
            )
        }
    }

    const daysRemaining = deadline !== null ? formatDate(deadline) : null;

    return (
        <div>
            {daysRemaining !== null ? getIcon(daysRemaining) : <HelpCircle className="h-4 w-4"/>}
        </div>
    );
};
