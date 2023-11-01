import {File} from "lucide-react";
import Link from "next/link";
import {CreatedDate} from "@/components/created-date";

interface AttachmentCardProps {
    id: string;
    name: string;
    url: string;
    createdAt: Date;
}

export const AttachmentCard = ({
                                   id,
                                   name,
                                   url,
                                   createdAt
                               }: AttachmentCardProps) => {

    return (
        <>
            {/* target="_blank" > 새창에서 열기 */}
            <Link key={id} href={url} target="_blank">
                <div className="shadow-sm hover:shadow-md transition-all border rounded-lg p-3 h-full">
                    <div className="flex flex-col">
                        {/* TODO 파일의 상태에 따라 로고 변경 */}
                        {/* 좌우 스크롤 조정 */}
                        <File className="h-4 w-4 mr-2 mb-1 text-sky-500"/>
                        <p className="sm:h-[72px] md:h-[48px] line-clamp-3">{name}</p>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                        <CreatedDate createdAt={createdAt}/>
                    </div>
                </div>
            </Link>
        </>
    )
}