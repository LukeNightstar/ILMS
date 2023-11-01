"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Course} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {FileUpload} from "@/components/file-upload";
import {ImageIcon, Pencil, PlusCircle} from "lucide-react";

interface ImageFormProps {
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "이미지가 필요합니다"
    }),
});

export const ImageForm = ({
                              initialData,
                              courseId
                          }: ImageFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("강의 수정 완료");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("오류: 문제가 있습니다.");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-bold flex items-center justify-between">
                강의 이미지
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>취소</>
                    )}
                    {!isEditing && !initialData.imageUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            이미지 추가
                        </>
                    )}
                    {!isEditing && initialData.imageUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            이미지 수정
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-80 bg-slate-200 rounded-md mt-2">
                        <ImageIcon className="h-10 w-10 text-slate-500"/>
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="Upload"
                            fill
                            className="object-cover rounded-md"
                            src={initialData.imageUrl}
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div className="h-85">
                    <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({imageUrl: url});
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 비율을 권장합니다
                    </div>
                </div>
            )}
        </div>
    );
}
