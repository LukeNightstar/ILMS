"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Chapter, MuxData} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {FileUpload} from "@/components/file-upload";
import {Pencil, PlusCircle, VideoIcon} from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";


interface ChapterVideoFormProps {
    initialData: Chapter & { muxData?: MuxData | null };
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
                                     initialData,
                                     courseId,
                                     chapterId
                                 }: ChapterVideoFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("단원 수정 완료");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("오류: 문제가 있습니다.");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-bold flex items-center justify-between">
                단원 영상
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>취소</>
                    )}
                    {!isEditing && !initialData.videoUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            영상 추가
                        </>
                    )}
                    {!isEditing && initialData.videoUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            영상 수정
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-80 bg-slate-200 rounded-md mt-2">
                        <VideoIcon className="h-10 w-10 text-slate-500"/>
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <MuxPlayer
                            playbackId={initialData?.muxData?.playbackId || ""}
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div className="h-85">
                    <FileUpload
                        endpoint="chapterVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({videoUrl: url});
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        영상을 추가하세요
                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    업로드 되는데 시간이 소요됩니다. 영상이 보이지 않는다면 새로고침하세요
                </div>
            )}
        </div>
    );
}
