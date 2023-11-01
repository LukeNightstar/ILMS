import {Preview} from "@/components/preview";
import {DoTask, DoTaskAttachment} from "@prisma/client";
import {DoAttachmentList} from "@/app/(dashboard)/(routes)/tasks/[taskId]/doTask/_components/do-attachment-list";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PenSquare} from "lucide-react";
import {UpdatedDate} from "@/components/updated-date";
import {CreatedDate} from "@/components/created-date";

interface DoTaskViewPageProps {
    userId: string;
    taskId: string;
    doTaskId: string;
    doTask: DoTask;
    doTaskAttachment: DoTaskAttachment[];
}

const DoTaskViewPage = ({
                            userId,
                            taskId,
                            doTaskId,
                            doTask,
                            doTaskAttachment
                        }: DoTaskViewPageProps) => {

    const isAuthor = doTask.userId === userId;

    return (
        <div className="mt-6 border-t border-b border-gray-300">
            <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dt className="font-medium leading-6 text-gray-900">제출 내용</dt>
                    <dd className="mt-1 leading-6 text-gray-700 sm:col-span-4 sm:mt-0 flex flex-col">
                        <div className="p-0">
                            <Preview value={doTask.description}/>
                        </div>
                    </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dt className="font-medium leading-6 text-gray-900">첨부 파일</dt>
                    <dd className="mt-1 leading-6 text-gray-700 sm:col-span-4 sm:mt-0">
                        <DoAttachmentList items={doTaskAttachment}/>
                    </dd>
                </div>
                <div className="flex flex-1 p-2 items-center justify-end gap-4">
                    <div className="flex flex-col text-sm items-center gap-1 text-muted-foreground">
                        <div className="flex flex-1 items-center">
                            <p>과제 제출일 :</p><CreatedDate createdAt={doTask.createdAt}/>
                        </div>
                        <div className="flex flex-1 items-center">
                            <p>최종 수정일 :</p><UpdatedDate updatedAt={doTask.updatedAt}/>
                        </div>
                    </div>
                    <Button disabled={!isAuthor} variant="outline" className="py-1 px-3">
                        <Link href={`/tasks/${taskId}/doTask/update/${doTaskId}`} className="flex items-center">
                            <PenSquare className="h-4 w-4 mr-2"/>
                            <p>수정</p>
                        </Link>
                    </Button>
                </div>
            </dl>
        </div>
    );
}

export default DoTaskViewPage;