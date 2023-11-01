"use client";

import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {FileState, MultiFileDropzone} from "@/components/multi-file-dropzone";
import {useEdgeStore} from "@/lib/edgestore";
import {Editor} from "@/components/editor";
import {ConfirmModal} from "@/components/modals/confirm-modal";

interface TaskSubmitFormProps {
    taskId: string;
}

const TaskSubmitForm = ({
                            taskId
                        }: TaskSubmitFormProps) => {
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState<FileState[]>([]);
    const [urls, setUrls] = useState<string[]>([]);

    const {edgestore} = useEdgeStore();
    const router = useRouter();

    const isSubmitDisabled = () => {
        return !description;
    };

    // 글 작성
    const onSubmit = async () => {
        if (isSubmitDisabled()) {
            toast.error("내용을 입력해주세요.");
            return;
        }
        try {
            const response = await axios.post(
                `/api/tasks/${taskId}/dotask`,
                {
                    description,
                    urls,
                    isCompleted: true,
                });
            router.push(`/tasks/${taskId}/doTask/view/${response.data.id}`);
            toast.success("과제 작성 완료");
            router.refresh();
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

    const clearFiles = () => {
        setFiles([]); // 파일 배열 초기화
        setUrls([]); // URL 배열 초기화
    };

    // 데이터 확인용
    // useEffect(() => {
    //     console.log(files);
    //     console.log(urls)
    // }, [files, urls]);

    return (
        <div className="mt-6 border-t border-b border-gray-300">
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }} className="flex flex-col">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                        <dt className="font-medium leading-6 text-gray-900">제출 내용</dt>
                        <dd className="mt-1 leading-6 text-gray-700 sm:col-span-4 sm:mt-0 flex flex-col">
                            <div>
                                <Editor
                                    value={description}
                                    onChange={(newContent) => setDescription(newContent)}
                                />
                                <p className="text-sm mt-1 text-muted-foreground pl-1">
                                    기간 안에 과제를 제출하세요
                                </p>
                            </div>
                            <div className="flex flex-1 items-center justify-end">
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
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                        <dt className="font-medium leading-6 text-gray-900">첨부 파일</dt>
                        <dd className="leading-6 text-gray-700 sm:col-span-4">
                            <div className="flex items-center justify-end">
                                <ConfirmModal onConfirm={clearFiles}>
                                    <button type="button" className="mb-1 mr-1">
                                        <p className="text-sm">파일 전체 삭제</p>
                                    </button>
                                </ConfirmModal>
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
                        </dd>
                    </div>
                </dl>
            </form>
        </div>
    );
};

export default TaskSubmitForm;