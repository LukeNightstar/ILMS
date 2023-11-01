"use client";

// import {Avatar, AvatarImage} from "@/components/ui/avatar";

interface UserInfoItemProps {
    username: string;
    email: string;
}

export const UserInfoItem = ({
                                 username,
                                 email
                             }: UserInfoItemProps) => {

    return (
        <div className="flex flex-col text-white">
            <div className="flex flex-1 justify-between">
                {/*<Avatar className="p-0 shadow-lg">
                    <AvatarImage src={imageUrl}/>
                </Avatar>*/}
            </div>

            <div className="ml-2 mt-3">
                <div className="flex flex-col">
                    <div className="flex flex-1 mr-2 text-lg">
                        <div className="items-center">
                            <p className="font-bold">이름:&nbsp;</p>
                        </div>
                        <div className="overflow-hidden whitespace-nowrap">
                            <p className="flex font-semibold overflow-x-scroll scrollbar-hide">{username}</p>
                        </div>
                    </div>
                    {/*<p className="line-clamp-1">{email}</p>*/}
                    <div className="flex flex-1 mr-2 text-lg">
                        <div className="items-center">
                            <p className="font-bold">Email:&nbsp;</p>
                        </div>
                        <div className="overflow-hidden whitespace-nowrap">
                            <p className="flex font-semibold overflow-x-scroll scrollbar-hide">{email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}