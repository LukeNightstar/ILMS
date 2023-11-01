import {DoTaskAttachment} from "@prisma/client";
import {
    DoAttachmentCard
} from "@/app/(dashboard)/(routes)/teacher/tasks/score/doTask/[doTaskId]/_components/do-attachment-card";

interface AttachmentListProps {
    items: DoTaskAttachment[];
}

export const DoAttachmentList = ({
                                     items
                                 }: AttachmentListProps) => {
    return (
        <div className="grid sm:grid-rows-1 md:grid-rows-1 gap-2">
            {items.map((item) => (
                <DoAttachmentCard
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
}