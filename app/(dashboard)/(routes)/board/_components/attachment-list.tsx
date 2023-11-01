import {PostAttachment} from "@prisma/client";
import {AttachmentCard} from "@/app/(dashboard)/(routes)/board/_components/attachment-card";

interface AttachmentListProps {
    items: PostAttachment[];
}

export const AttachmentList = ({
                                   items
                               }: AttachmentListProps) => {
    return (
        <div className="grid sm:grid-cols-4 md:grid-cols-4 h-[150px] md:h-[125px] gap-4 overflow-y-auto">
            {items.map((item) => (
                <AttachmentCard
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