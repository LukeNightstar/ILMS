"use client";

import {usePathname, useRouter} from "next/navigation";
import {SearchInput} from "@/components/search-input";
import {Button} from "@/components/ui/button";
import {LogOut} from "lucide-react";
import Link from "next/link";

export const NavbarRoutes = () => {

    const router = useRouter();

    const pathname = usePathname();

    const isCoursePage = pathname?.startsWith("/courses");
    const isTaskPage = pathname?.endsWith("/tasks");
    const isDoTaskSubmitPage = pathname?.includes("/tasks/submit");
    const isDoTaskPage = pathname?.includes("/doTask/view/")
    const isDoTaskEditPage = pathname?.includes("/doTask/update");
    const isDoTaskScorePage = pathname?.includes("teacher/tasks/score/doTask");
    const isBoardPage = pathname?.endsWith("/board");
    const isPostPage = pathname?.includes("/board/post/");
    const isPostCreatePage = pathname?.includes("/board/create");
    const isPostEditPage = pathname?.includes("/board/update");
    const isTeacherBoardPage = pathname?.includes("/teacher/boards/");
    const isPlayerPage = pathname?.includes("/chapter");

    return (
        <div className="flex flex-1 gap-x-6">
            {/*고쳐야 함 hidden 제대로 작동안함*/}
            <div className="flex-1 invisible md:visible">
                {isCoursePage || isTaskPage || isBoardPage ? <SearchInput/> : null}
            </div>

            {/* 과제 */}
            {isDoTaskPage || isDoTaskSubmitPage ? (
                <Button className="bg-white text-black shadow-sm" variant="outline">
                    <Link href="/tasks" onClick={router.refresh} className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2"/>
                        <p>목록으로</p>
                    </Link>
                </Button>
            ) : (
                <></>
            )}
            {isDoTaskEditPage && (
                <Button className="bg-white text-black shadow-sm" variant="outline">
                    <Link href={'#'} onClick={() => {
                        router.back();
                        router.refresh();
                    }} className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2"/>
                        <p>뒤로가기</p>
                    </Link>
                </Button>
            )}
            {isDoTaskScorePage && (
                <Button className="bg-white text-black shadow-sm" variant="outline">
                    <Link href="/teacher/tasks/score" onClick={router.refresh} className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2"/>
                        <p>목록으로</p>
                    </Link>
                </Button>
            )}

            {/* 게시판 */}
            {isPostPage || isPostCreatePage ? (
                <Button className="bg-white text-black shadow-sm" variant="outline">
                    <Link href="/board" onClick={router.refresh} className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2"/>
                        <p>뒤로가기</p>
                    </Link>
                </Button>
            ) : (
                <></>
            )}
            {isPostEditPage && (
                <Button className="bg-white text-black shadow-sm" variant="outline">
                    <Link href={'#'} onClick={() => {
                        router.back();
                        router.refresh();
                    }} className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2"/>
                        <p>뒤로가기</p>
                    </Link>
                </Button>
            )}

            {/* 관리자 페이지에서의 열람시 표시 */}
            {isTeacherBoardPage && (
                <Button className="bg-white text-black shadow-sm" variant="outline">
                    <Link href="/teacher/boards" onClick={router.refresh} className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2"/>
                        <p>뒤로가기</p>
                    </Link>
                </Button>
            )}
            {/*<div className="flex items-center">
                <UserButton afterSignOutUrl="/"/>
            </div>*/}
        </div>
    );
};