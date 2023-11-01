"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Task, TaskAttachment} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {FileUpload} from "@/components/file-upload";
import {File, Loader2, PlusCircle, X} from "lucide-react";

interface AttachmentFormProps {
    initialData: Task & { taskAttachments: TaskAttachment[] };
    taskId: string;
}

const formSchema = z.object({
    url: z.string().min(1),
});

export const AttachmentForm = ({
                                   initialData,
                                   taskId
                               }: AttachmentFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    // 파일 추가
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/tasks/${taskId}/attachments`, values);
            toast.success("첨부 파일 추가 완료");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("오류: 문제가 있습니다.");
        }
    };

    // 파일 삭제
    const onDelete = async (id: string) => {
        try {
            setDeletingId(id);
            await axios.delete(`/api/tasks/${taskId}/attachments/${id}`);
            toast.success("첨부 파일 삭제 완료");
            router.refresh();
        } catch {
            toast.error("오류: 문제가 있습니다.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-bold flex items-center justify-between">
                과제 첨부 파일
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>취소</>
                    )}
                    {!isEditing && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            파일 추가
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <>
                    {initialData.taskAttachments.length === 0 && (
                        <p className="text-sm mt-2 text-slate-500 italic">
                            첨부파일이 없습니다
                        </p>
                    )}
                    {initialData.taskAttachments.length > 0 && (
                        <div className="space-y-2">
                            {initialData.taskAttachments.map((attachment) => (
                                <div key={attachment.id}
                                     className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                                >
                                    <File className="h-4 w-4 mr-2 flex-shrink-0"/>
                                    <p className="text-xs line-clamp-1">
                                        {attachment.name}
                                    </p>
                                    {deletingId === attachment.id && (
                                        <div>
                                            <Loader2 className="h-4 w-4 animate-spin"/>
                                        </div>
                                    )}
                                    {deletingId !== attachment.id && (
                                        <button onClick={() => onDelete(attachment.id)}
                                                className="ml-auto hover:opacity-75 transition">
                                            <X className="h-4 w-4"/>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {isEditing && (
                <div className="h-85">
                    <FileUpload
                        endpoint="taskAttachment"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({url: url});
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        과제 관련 첨부 파일
                    </div>
                </div>
            )}
        </div>
    );
}
