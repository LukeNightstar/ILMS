import {TaskAttachment} from "@prisma/client";
import {TaskAttachmentCard} from "@/app/(dashboard)/(routes)/tasks/submit/[taskId]/_components/task-attachment-card";

interface TaskAttachmentList {
    items: TaskAttachment[];
}

export const TaskAttachmentList = ({
                                       items
                                   }: TaskAttachmentList) => {
    return (
        <div className="grid sm:grid-rows-1 md:grid-rows-1 gap-2">
            {items.map((item) => (
                <TaskAttachmentCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    url={item.url}
                    createdAt={item.createdAt}
                />
            ))}
            {items.length === 0 && (
                <p className="text-sm mt-2 text-slate-500 italic">
                    첨부파일이 없습니다
                </p>
            )}
        </div>
    )
};