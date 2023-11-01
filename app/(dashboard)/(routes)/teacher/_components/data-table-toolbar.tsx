"use client";

import {Table} from "@tanstack/react-table"
import {Input} from "@/components/ui/input";
import * as React from "react";
import {Award, List, PlusCircle} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({
                                            table,
                                        }: DataTableToolbarProps<TData>) {

    const pathname = usePathname();

    const isCoursePage = pathname?.startsWith("/teacher/courses");
    const isTaskPage = pathname?.startsWith("/teacher/tasks/list");
    const isBoardPage = pathname?.startsWith("/teacher/boards");

    const isTaskScorePage = pathname?.startsWith("/teacher/tasks/score");

    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex flex-1 items-center space-x-2">
                {isCoursePage || isTaskPage || isBoardPage ? (
                    <Input
                        placeholder="검색하세요..."
                        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("title")?.setFilterValue(event.target.value)
                        }
                        className="w-[150px] md:w-[400px]"
                    />
                ) : (
                    // TODO : 유저 페이지 검색 기능 및 과제 페이지 세부 검색 기능 추후 추가
                    <></>
                )}


            </div>
            <div className="flex flex-1 space-x-2 justify-end">
                {isCoursePage && (
                    <Link href="/teacher/courses/create">
                        <Button>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            강의 추가
                        </Button>
                    </Link>
                )}
                {isTaskPage && (
                    <>
                        <Link href="/teacher/tasks/score">
                            <Button variant="outline" className="py-1 px-3">
                                <Award className="h-4 w-4 mr-2"/>
                                성적
                            </Button>
                        </Link>
                        <Link href="/teacher/tasks/create">
                            <Button>
                                <PlusCircle className="h-4 w-4 mr-2"/>
                                과제 추가
                            </Button>
                        </Link>
                    </>
                )}
                {isTaskScorePage && (
                    <>
                        <Link href="/teacher/tasks/list">
                            <Button variant="outline" className="py-1 px-3">
                                <List className="h-4 w-4 mr-2"/>
                                리스트
                            </Button>
                        </Link>
                        <Link href="/teacher/tasks/create">
                            <Button>
                                <PlusCircle className="h-4 w-4 mr-2"/>
                                과제 추가
                            </Button>
                        </Link>
                    </>
                )}

                {/*TODO 선택된 강의만 삭제하는 기능 추후 구현*/}
                {/*<Actions courseId={courseId} />*/}
            </div>
        </div>
    );
}