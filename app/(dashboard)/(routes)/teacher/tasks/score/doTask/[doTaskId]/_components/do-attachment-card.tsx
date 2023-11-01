import {File} from "lucide-react";
import Link from "next/link";
import {CreatedDate} from "@/components/created-date";
import {Separator} from "@/components/ui/separator";

interface DoAttachmentCardProps {
    id: string;
    name: string;
    url: string;
    createdAt: Date;
}

export const DoAttachmentCard = ({
                                     id,
                                     name,
                                     url,
                                     createdAt
                                 }: DoAttachmentCardProps) => {

    return (
        <>
            {/* target="_blank" > 새창에서 열기 */}
            <Link key={id} href={url} target="_blank">
                <div className="shadow-sm hover:shadow-md transition-all border rounded-lg p-4 h-full
                flex flex-1 items-center">
                    <div className="flex flex-1 items-center">
                        {/* TODO 파일의 상태에 따라 로고 변경 */}
                        {/* 좌우 스크롤 조정 */}
                        <File size="24" className="mr-2 text-sky-500"/>
                        <p>{name}</p>
                    </div>
                    <div className="flex text-sm text-muted-foreground justify-end">
                        <p>제출일 :&nbsp;</p><CreatedDate createdAt={createdAt}/>
                    </div>
                </div>
            </Link>
        </>
    )
}