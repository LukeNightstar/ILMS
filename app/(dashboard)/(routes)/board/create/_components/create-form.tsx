"use client";

import {Separator} from "@/components/ui/separator";
import {SetStateAction, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {BoardSelector} from "@/app/(dashboard)/(routes)/board/_components/board-selector";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import {FileState, MultiFileDropzone} from "@/components/multi-file-dropzone";
import {useEdgeStore} from "@/lib/edgestore";
import {ConfirmModal} from "@/components/modals/confirm-modal";

interface CreateFormTestProps {
    options: {
        label: string;
        value: string
    }[];
}

const CreateForm = ({
                        options,
                    }: CreateFormTestProps) => {
    // 값들을 전부 상태로 관리
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [files, setFiles] = useState<FileState[]>([]);
    const [urls, setUrls] = useState<string[]>([]);


    const {edgestore} = useEdgeStore();
    const router = useRouter();

    const isSubmitDisabled = () => {
        return !title || !selectedCategory || !content;
    };

    const handleCategoryChange = (value: SetStateAction<string>) => {
        setSelectedCategory(value);
    };

    // 글 작성
    const onSubmit = async () => {
        if (isSubmitDisabled()) {
            toast.error("제목, 카테고리, 내용을 모두 입력해주세요.");
            return;
        }
        try {
            const response = await axios.post(
                "/api/board/post",
                {
                    board: selectedCategory,
                    title,
                    content,
                    urls,
                });
            router.push(`/board/post/${response.data.id}`);
            toast.success("글 작성 완료")
        } catch (e) {
            console.error(e)
            toast.error("오류: 문제가 있습니다.");
        }
    }

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

    const clearFiles = () => {
        setFiles([]); // 파일 배열 초기화
        setUrls([]); // URL 배열 초기화
    };

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

    // 데이터 확인용
    // useEffect(() => {
    //     console.log(files);
    //     console.log(urls)
    // }, [files, urls]);


    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">새 글 작성</h1>
            <Separator className=""/>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }} className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                        <h2 className="text-2xl font-semibold mb-2">제목</h2>
                        <Input
                            type="text"
                            placeholder="예시) 새 글 제목"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <p className="text-sm mt-1 text-muted-foreground pl-1">제목을 작성해주세요</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">카테고리</h2>
                        <BoardSelector
                            options={options}
                            onChange={(value) => handleCategoryChange(value)}
                        />
                        <p className="text-sm mt-1 text-muted-foreground pl-1">게시판을 선택해주세요</p>
                    </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                        <h2 className="text-2xl font-semibold mb-2">내용</h2>
                        <Textarea
                            className="w-full h-[450px] border rounded-lg"
                            value={content}
                            placeholder="내용을 입력해주세요"
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <p className="text-sm mt-1 text-muted-foreground pl-1">타인에게 불쾌감을 주는 게시물은 제재를 받을 수 있습니다</p>
                    </div>
                    <div className="">
                        <div className="grid grid-cols-2">
                            <h2 className="text-2xl font-semibold mb-2">첨부파일</h2>
                            <div className="flex items-center justify-end">
                                <ConfirmModal onConfirm={clearFiles}>
                                    <button type="button" className="-mb-2 pr-1">
                                        <p className="text-sm">파일 전체 삭제</p>
                                    </button>
                                </ConfirmModal>
                            </div>
                        </div>

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
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <Button
                        type="submit"
                        disabled={isSubmitDisabled()}
                        onClick={async () => {
                            for (const url of urls) {
                                await edgestore.publicFiles.confirmUpload({
                                    url,
                                });
                            }
                        }}
                    >
                        작성 완료
                    </Button>
                </div>
            </form>
        </div>
    )
};

export default CreateForm;