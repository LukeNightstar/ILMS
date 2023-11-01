import {DoTask, DoTaskAttachment} from "@prisma/client";
import {Preview} from "@/components/preview";
import {
    DoAttachmentList
} from "@/app/(dashboard)/(routes)/teacher/tasks/score/doTask/[doTaskId]/_components/do-attachment-list";

interface DoTaskViewScoreProps {
    doTask: DoTask;
    doTaskAttachment: DoTaskAttachment[];
}

const DoTaskViewInScorePage = ({
                                   doTask,
                                   doTaskAttachment
                               }: DoTaskViewScoreProps) => {
    return (
        <div className="mt-2 border-t border-b border-gray-300">
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
            </dl>
        </div>
    )
}

export default DoTaskViewInScorePage;