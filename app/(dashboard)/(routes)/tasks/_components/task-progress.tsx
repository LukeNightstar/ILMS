import {LuXCircle} from "react-icons/lu";
import {BsCheck2Circle} from "react-icons/bs";
import {CSSProperties} from "react";

interface TaskProgressProps {
    isCompleted: Boolean;
}

export const TaskProgress = ({
                                 isCompleted
                             }: TaskProgressProps) => {

    const Icon = isCompleted ? BsCheck2Circle : LuXCircle;
    const label = isCompleted ? "완료됨" : "미제출";
    const iconColor = isCompleted ? "green" : "red";

    const iconStyle: CSSProperties = {
        color: iconColor,
    };

    return (
        <div>
            <div className="flex items-center">
                <Icon size="20" style={iconStyle} className="mr-1"/>
                <p className="text-xl font-semibold">{label}</p>
            </div>
        </div>
    );
};
