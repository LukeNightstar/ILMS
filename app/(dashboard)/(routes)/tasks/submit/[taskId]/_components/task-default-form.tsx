import DateCalculator from "@/app/(dashboard)/(routes)/tasks/submit/[taskId]/_components/date-calculator";
import {Task, TaskAttachment} from "@prisma/client";
import {TaskAttachmentList} from "@/app/(dashboard)/(routes)/tasks/submit/[taskId]/_components/task-attachment-list";

interface TaskDefaultFormProps {
    task: Task;
    taskAttachment: TaskAttachment[];
    formattedCreatedAt: string;
    userEmail: string;
    formattedDeadline: string;
    username: string;
}

export const TaskDefaultForm = ({
                                    task,
                                    taskAttachment,
                                    formattedCreatedAt,
                                    userEmail,
                                    formattedDeadline,
                                    username,
                                }: TaskDefaultFormProps) => {
    return (
        <>
            <div className="px-4 sm:px-0">
                <h1 className="text-4xl font-semibold leading-7 text-gray-900">
                    {task.title}
                </h1>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">과제 생성일 : {formattedCreatedAt}</p>
            </div>
            <div className="mt-4 border-t border-b border-gray-300">
                <dl className="divide-y divide-gray-100">
                    {/*제출자 이름*/}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                        <dt className="font-medium leading-6 text-gray-900">이름</dt>
                        <dd className="leading-6 text-gray-700 sm:col-span-4 sm:mt-0">
                            {username}
                        </dd>
                    </div>
                    {/* 제출자 이메일*/}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                        <dt className="font-medium leading-6 text-gray-900">Email</dt>
                        <dd className="leading-6 text-gray-700 sm:col-span-4 sm:mt-0">
                            {userEmail}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                        <dt className="font-medium leading-6 text-gray-900">제출 마감일</dt>
                        <dd className="leading-6 text-gray-700 sm:col-span-4 sm:mt-0">
                            <p>{formattedDeadline}</p><p><DateCalculator taskId={task.id}/></p>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                        <dt className="font-medium leading-6 text-gray-900">과제 설명</dt>
                        <dd className="leading-6 text-gray-700 sm:col-span-4 sm:mt-0">
                            {task.description}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                        <dt className=" font-medium leading-6 text-gray-900">첨부파일</dt>
                        <dd className=" text-gray-900 sm:col-span-4 sm:mt-0">
                            <TaskAttachmentList items={taskAttachment}/>
                        </dd>
                    </div>
                </dl>
            </div>
        </>
    )
}