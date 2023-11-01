"use client";

import {useState} from "react";
import {FileUpload} from "@/components/file-upload";
import * as z from "zod";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import axios from "axios";

interface PostFileUploadProps {
    userId: string;
}

export const PostFileUpload = ({
                                   userId,
                               }: PostFileUploadProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingid] = useState<string | null>(null);

    const router = useRouter();

    // 파일 추가
    const onSubmit = async () => {
        try {
            await axios.post(`/api/courses/${userId}/attachments`);
            toast.success("첨부 파일 추가 완료");
            router.refresh();
        } catch {
            toast.error("오류: 문제가 있습니다.");
        }
    };

    // 파일 삭제

    return (
        <div>
            <FileUpload
                endpoint={"postAttachment"}
                onChange={(url) => {
                    if (url) {
                        onSubmit();
                    }
                }}
            />
        </div>
    )
}