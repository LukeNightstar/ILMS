import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {SearchInput} from "@/components/search-input";
import {TasksList} from "@/app/(dashboard)/(routes)/tasks/_components/tasks-list";
import {getTasks} from "@/actions/get-tasks";

interface TaskPageProps {
    searchParams: {
        title: string;
    }
}

const TaskPage = async ({
                            searchParams
                        }: TaskPageProps) => {
    const {userId} = auth();
    if (!userId) {
        return redirect("/");
    }

    const tasks = await getTasks({
        ...searchParams,
    })

    return (
        <div>
            <div className="md:hidden pb-6 md:pb-0">
                <SearchInput/>
            </div>
            <div className="">
                <TasksList items={tasks} userId={userId}/>
            </div>
        </div>
    );
}

export default TaskPage;