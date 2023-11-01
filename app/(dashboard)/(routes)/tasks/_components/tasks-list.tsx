import {DoTask, Task} from "@prisma/client";
import {TaskCard} from "@/app/(dashboard)/(routes)/tasks/_components/task-card";

type TasksWithProgressWithDoTasks = Task & {
    doTask: DoTask[];
}

interface TasksListProps {
    items: TasksWithProgressWithDoTasks[];
    userId: string;
}

export const TasksList = ({
                              items,
                              userId,
                          }: TasksListProps) => {
    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {items.map((item) => (
                    <TaskCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        description={item.description || "설명이 없습니다."}
                        createdAt={item.createdAt}
                        deadline={item.deadline}
                        userId={userId}
                        doTask={item.doTask}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-xl text-muted-foreground mt-10">
                    과제 없음
                </div>
            )}
        </div>
    )
}