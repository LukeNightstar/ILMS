import Link from "next/link";
import {File, FileDown} from "lucide-react";

interface TaskAttachmentCardProps {
    id: string;
    name: string;
    url: string;
    createdAt: Date;
}

export const TaskAttachmentCard = ({
                                       id,
                                       name,
                                       url,
                                       createdAt
                                   }: TaskAttachmentCardProps) => {
    return (
        <>
            <div className="shadow-sm hover:shadow-md transition-all border rounded-lg p-4 h-full
                flex flex-1 items-center">
                <div className="flex flex-1 items-center">
                    <File size="24" className="mr-2 text-slate-400"/>
                    <p>{name}</p>
                </div>
                <Link key={id} href={url} target="_blank">
                    <div className="flex flex-1 items-center justify-end text-[#4F46E5] w-fit">
                        <p className="font-medium">Download</p>
                    </div>
                </Link>
            </div>
        </>
    )
}