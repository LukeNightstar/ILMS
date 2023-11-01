import {CreatedDate} from "@/components/created-date";
import {Comment} from "@prisma/client";
import {ReplyEditForm} from "@/app/(dashboard)/(routes)/board/_components/reply-edit-form";

interface ReplyCardProps {
    userId: string;
    username: string;
    initialData: Comment;
}

export const ReplyCard = ({
                              userId,
                              username,
                              initialData
                          }: ReplyCardProps) => {
    return (
        <div>
            <div className="border rounded-lg py-2 px-3">
                <div className="flex flex-col">
                    <div className="flex flex-1 gap-x-2 items-center">
                        <p>{username}</p>|
                        <div className="text-sm text-muted-foreground">
                            <CreatedDate createdAt={initialData.createdAt}/>
                        </div>
                    </div>

                    <div className="mt-1">
                        <ReplyEditForm initialData={initialData} userId={userId}/>
                    </div>

                </div>
            </div>
        </div>
    )
};