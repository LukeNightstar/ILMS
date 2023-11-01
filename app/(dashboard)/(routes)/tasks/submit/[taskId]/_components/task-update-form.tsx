"use client";

import {DoTaskAttachment} from "@prisma/client";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as React from "react";
import {useState} from "react";
import {FileState, MultiFileDropzone} from "@/components/multi-file-dropzone";
import {useEdgeStore} from "@/lib/edgestore";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Editor} from "@/components/editor";
import {Button} from "@/components/ui/button";
import {CheckSquare, File, Loader2, Trash2Icon} from "lucide-react";

interface TaskUpdateFormProps {
    initialData: {
        description: string;
    }
    taskId: string;
    doTaskId: string;
    doTaskAttachments: DoTaskAttachment[];

}

const formSchema = z.object({
    description: z.string().min(1),
});

const TaskUpdateForm = ({
                            initialData,
                            taskId,
                            doTaskId,
                            doTaskAttachments
                        }: TaskUpdateFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || "",
        },
    })
    const {isSubmitting, isValid} = form.formState;
    const [files, setFiles] = useState<FileState[]>([]);
    const [urls, setUrls] = useState<string[]>([]);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const {edgestore} = useEdgeStore();
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.patch(
                `/api/tasks/${taskId}/dotask/${doTaskId}`, {
                    ...values, urls
                });
            router.push(`/tasks/${taskId}/doTask/view/${response.data.id}`);
            toast.success("과제 수정 완료");
            router.refresh();
        } catch (e) {
            console.error(e)
            toast.error("오류: 문제가 있습니다.");
        }
    }

    // 파일 삭제
    const onDelete = async (id: string) => {
        try {
            setDeletingId(id);
            await axios.delete(`/api/tasks/${taskId}/dotask/${doTaskId}/attachments/${id}`);
            toast.success("첨부 파일 삭제 완료");
            router.refresh()
        } catch {
            toast.error("오류: 문제가 있습니다.");
        } finally {
            setDeletingId(null);
        }
    };

    function updateFileProgress(key: string, url: string, progress: FileState["progress"]) {
        setFiles((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find((fileState) => fileState.key === key);
            if (fileState) {
                fileState.url = url;
                fileState.progress = progress;
            }
            return newFileStates;
        });
    }

    const onDeleteFile = (fileUrl: string) => {
        // 파일을 찾아서 삭제
        const updatedFiles = files.filter((fileState) => fileState.url !== fileUrl);
        setFiles(updatedFiles);
        // console.log(updatedFiles);
        // console.log(fileUrl)

        // URL 배열에서도 해당 URL을 제외
        const updatedUrls = urls.filter((url) => url !== fileUrl);
        setUrls(updatedUrls);
    };

    return (
        <div className="mt-6 border-t border-b border-gray-300">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                            <dt className="font-medium leading-6 text-gray-900">제출 내용</dt>
                            <dd className="mt-1 leading-6 text-gray-700 sm:col-span-4 sm:mt-0 flex flex-col">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Editor {...field}/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}/>
                                </div>

                                {/* 수정 완료 버튼 */}
                                <div className="flex flex-1 items-center mt-4 justify-end">
                                    <div className="shadow-sm hover:shadow-lg">
                                        <Button
                                            disabled={!isValid || isSubmitting}
                                            className="bg-emerald-500 hover:bg-emerald-500/90 px-3 py-1"
                                            type="submit"
                                            onClick={async () => {
                                                for (const url of urls) {
                                                    await edgestore.publicFiles.confirmUpload({
                                                        url,
                                                    });
                                                }
                                            }}
                                        >
                                            <CheckSquare className="w-4 h-4 mr-2"/>
                                            완료
                                        </Button>
                                    </div>
                                </div>
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                            <dt className="font-medium leading-6 text-gray-900">첨부 파일</dt>
                            <dd className="leading-6 text-gray-700 sm:col-span-4">
                                <MultiFileDropzone
                                    className="w-auto"
                                    value={files}
                                    urls={urls}
                                    keys={files.map((file) => file.key)}
                                    onChange={(files) => {
                                        setFiles(files);
                                    }}
                                    onDeleteFile={onDeleteFile}
                                    onFilesAdded={async (addedFiles) => {
                                        setFiles([...files, ...addedFiles]);
                                        await Promise.all(
                                            addedFiles.map(async (addedFilesState) => {
                                                try {
                                                    const res = await edgestore.publicFiles.upload({
                                                        file: addedFilesState.file,
                                                        options: {
                                                            temporary: true,
                                                        },
                                                        onProgressChange: async (progress) => {
                                                            let url = "";
                                                            if (progress === 100) {
                                                                await new Promise((resolve) =>
                                                                    setTimeout(resolve, 1000)
                                                                );
                                                                url = res.url;
                                                                updateFileProgress(addedFilesState.key, url, "COMPLETE");
                                                            } else {
                                                                updateFileProgress(addedFilesState.key, "", progress);
                                                            }
                                                        },
                                                    });
                                                    setUrls((urls) => [...urls, res.url]);
                                                    // console.log(res)
                                                } catch (e) {
                                                    console.error("[FILE_UPLOAD]", e);
                                                    updateFileProgress(addedFilesState.key, "", "ERROR");
                                                }
                                            })
                                        )
                                    }}
                                />
                                {doTaskAttachments.length === 0 && (
                                    <p className="flex text-sm mt-4 text-slate-500 items-center justify-center">
                                        기존 첨부파일이 없습니다
                                    </p>
                                )}
                                {doTaskAttachments.length > 0 && (
                                    <div className="space-y-2 mt-2">
                                        <h2 className="text-base font-semibold">기존파일</h2>
                                        <div className="space-y-2 h-auto max-h-[175px] overflow-y-auto">
                                            {doTaskAttachments.map((attachment) => (
                                                <div key={attachment.id}
                                                     className="w-full flex h-16 w-96 max-w-[100vw] flex-col justify-center rounded border border-gray-300 px-3 py-1"
                                                >
                                                    <div
                                                        className="flex items-center gap-2 text-gray-500 dark:text-white">
                                                        <File size="30" className="flex-shrink-0"/>
                                                        <div className="text-sm">
                                                            <p className="line-clamp-1">
                                                                {attachment.name}
                                                            </p>
                                                            <p className="text-xs">
                                                                기존 파일
                                                            </p>
                                                        </div>
                                                        {deletingId === attachment.id && (
                                                            <div>
                                                                <Loader2 className="h-4 w-4 animate-spin"/>
                                                            </div>
                                                        )}
                                                        {deletingId !== attachment.id && (
                                                            <button
                                                                type="button"
                                                                onClick={async () => {
                                                                    await onDelete(attachment.id);
                                                                    // TODO 작동안함 아래 코드 서버의 링크까지 지우는 방법 필요
                                                                    for (const url of urls) {
                                                                        await edgestore.publicFiles.delete({
                                                                            url: url
                                                                        });
                                                                    }
                                                                }}
                                                                className="ml-auto hover:opacity-75 transition"
                                                            >
                                                                <Trash2Icon/>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </dd>
                        </div>
                    </dl>
                </form>
            </Form>
        </div>
    )
}

export default TaskUpdateForm;