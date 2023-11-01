import {currentUser} from "@clerk/nextjs";
import {prisma} from "@/lib/db";
import {redirect} from "next/navigation";
import {Avatar} from "@radix-ui/themes";
import {UserInfoItem} from "@/components/user-info-item";
import UserInfoSettings from "@/components/user-info-settings";
import {UserSignOutButton} from "@/components/user-signout";

export const UserInfo = async () => {

    // 현재 로그인한 유저 정보 가져오기
    const loginUser = await currentUser();

    // null 방지
    if (!loginUser) {
        return redirect("/");
    }

    const user = await prisma.user.findMany({
        where: {
            externalId: loginUser.id,
        },
        include: {
            email: true,
        }
    });

    return (
        <div className="flex flex-col text-white">
            {user.map((user) => (
                <>
                    <div className="flex flex-1 justify-between">
                        <Avatar
                            className="ml-2"
                            size="7"
                            color="indigo"
                            radius="small"
                            src={user.profileImageUrl}
                            fallback="A"/>
                        <div className="flex flex-col mr-5 justify-center items-center">
                            <div className="flex items-center justify-center">
                                <UserInfoSettings/>
                            </div>
                            <div className="flex items-center justify-center">
                                <UserSignOutButton/>
                            </div>
                        </div>
                    </div>

                    <div key={user.id}>
                        <div className="">
                            <UserInfoItem
                                username={user.username}
                                email={user.email ? user.email[0].email_address : ""} // 이메일 정보 확인
                            />
                        </div>
                    </div>
                </>
            ))}
        </div>
    );
}