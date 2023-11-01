"use client";

import * as z from "zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {SetStateAction, useEffect, useState} from "react";
import {PostDeleteButton} from "@/app/(dashboard)/(routes)/board/_components/post-delete-button";
import {BoardSelector} from "@/app/(dashboard)/(routes)/board/_components/board-selector";
import {CheckSquare, File, Loader2, Trash2Icon} from "lucide-react";
import {PostAttachment} from "@prisma/client";
import {FileState, MultiFileDropzone} from "@/components/multi-file-dropzone";
import {useEdgeStore} from "@/lib/edgestore";

interface UpdateFormProps {
    initialData: {
        title: string;
        content: string;
        boardId: string;
    };
    options: {
        label: string;
        value: string;
    }[];
    postId: string;
    postAttachments: PostAttachment[];
}

const formSchema = z.object({
    title: z.string().min(1, {}),
    content: z.string().min(1, {}),
    boardCategory: z.string().min(1, {}),
});

const UpdateForm = ({
                        initialData,
                        options,
                        postId,
                        postAttachments
                    }: UpdateFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title,
            content: initialData?.content,
            boardCategory: initialData.boardId
        },
    })
    const {isSubmitting, isValid} = form.formState;
    const [selectedCategory, setSelectedCategory] = useState(''); // 선택한 카테고리를 상태로 관리
    const [files, setFiles] = useState<FileState[]>([]);
    const [urls, setUrls] = useState<string[]>([]);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const {edgestore} = useEdgeStore();
    const router = useRouter();

    // 선택한 카테고리가 변경될 때마다 해당 값을 업데이트
    const handleCategoryChange = (value: SetStateAction<string>) => {
        setSelectedCategory(value);
    };

    // 초기 카테고리 선택 값을 설정
    useEffect(() => {
        setSelectedCategory(initialData.boardId);
    }, [initialData.boardId]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.patch(
                `/api/board/update/${postId}`, {
                    ...values, board: selectedCategory, urls
                });
            router.push(`/board/post/${response.data.id}`);
            toast.success("게시글 수정 완료");
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
            await axios.delete(`/api/board/post/${postId}/attachments/${id}`);
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
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">게시글 수정</h1>
            <Separator className=""/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                            {/* 글 제목 */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-2xl font-semibold">제목</FormLabel>
                                        <FormControl>
                                            <Input{...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                        </div>
                        <div>
                            {/* 게시판 선택 */}
                            <FormField
                                control={form.control}
                                name="boardCategory"
                                render={({field}) => (
                                    <FormItem className="">
                                        <FormLabel className="text-2xl font-semibold">카테고리</FormLabel>
                                        <FormControl>
                                            <BoardSelector
                                                {...field}
                                                options={options}
                                                onChange={(value) => {
                                                    field.onChange(value);
                                                    handleCategoryChange(value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                            {/* 글 내용 */}
                            <div className="">
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-2xl font-semibold">내용</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    className="h-[450px]"
                                                    disabled={isSubmitting}
                                                    {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <p className="text-sm mt-1 text-muted-foreground pl-1">
                                    타인에게 불쾌감을 주는 게시물은 제재를 받을 수 있습니다
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col h-full">
                            {/*TODO: 첨부파일 시스템 개선*/}
                            {/* 첨부 파일 */}
                            <h2 className="text-2xl font-semibold mb-2">첨부파일</h2>
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
                                                let url = "";
                                                const res = await edgestore.publicFiles.upload({
                                                    file: addedFilesState.file,
                                                    options: {
                                                        temporary: true,
                                                    },
                                                    onProgressChange: async (progress) => {
                                                        if (progress === 100) {
                                                            await new Promise((resolve) =>
                                                                setTimeout(resolve, 3000)
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
                            {postAttachments.length === 0 && (
                                <p className="flex text-sm mt-4 text-slate-500 items-center justify-center">
                                    기존 첨부파일이 없습니다
                                </p>
                            )}
                            {postAttachments.length > 0 && (
                                <div className="space-y-2 mt-2">
                                    <h2 className="text-base font-semibold">기존파일</h2>
                                    <div className="space-y-2 h-auto max-h-[175px] overflow-y-auto">
                                        {postAttachments.map((attachment) => (
                                            <div key={attachment.id}
                                                 className="w-full flex h-16 w-96 max-w-[100vw] flex-col justify-center rounded border border-gray-300 px-3 py-1"
                                            >
                                                <div className="flex items-center gap-2 text-gray-500 dark:text-white">
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
                                                                // for (const url of urls) {
                                                                //     await edgestore.publicFiles.delete({
                                                                //         url: url
                                                                //     });
                                                                // }
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
                        </div>
                    </div>
                    <div className="col-span-2 flex justify-end gap-x-2">
                        <div className="shadow-sm hover:shadow-lg">
                            <Button type="submit"
                                    disabled={!isValid || isSubmitting}
                                    className="bg-emerald-500 hover:bg-emerald-500/90 px-3 py-1"
                                    onClick={async () => {
                                        for (const url of urls) {
                                            await edgestore.publicFiles.confirmUpload({
                                                url,
                                            });
                                        }
                                    }}
                                // variant="confirm"
                            >
                                <CheckSquare className="w-4 h-4 mr-2"/>
                                완료
                                {/*<FcOk className="w-6 h-6"/>*/}
                                {/*<FcCheckmark className="w-6 h-6"/>*/}
                            </Button>
                        </div>
                        <PostDeleteButton postId={postId}/>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default UpdateForm;