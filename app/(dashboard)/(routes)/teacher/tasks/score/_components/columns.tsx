"use client"

import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal, Pencil} from "lucide-react"

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

import {DoTask} from "@prisma/client";
import {format} from "date-fns";
import {EmailInfoCell} from "@/app/(dashboard)/(routes)/teacher/tasks/score/_components/email-info-cell";
import {UserInfoCell} from "@/app/(dashboard)/(routes)/teacher/tasks/score/_components/user-info-cell";
import {TaskTitleCell} from "@/app/(dashboard)/(routes)/teacher/tasks/score/_components/task-title-cell";
import {ScoreCell} from "@/app/(dashboard)/(routes)/teacher/tasks/score/_components/score-cell";

export const columns: ColumnDef<DoTask>[] = [

    // title
    {
        id: "taskId",
        accessorKey: "taskId",
        header: ({column}) => {
            return (
                <Button
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    과제명
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const taskId = row.getValue("taskId") as string;
            return (
                <div className="">
                    <span>
                        <TaskTitleCell taskId={taskId}/>
                    </span>
                </div>
            );
        },
    },

    // 성적
    {
        id: "id",
        accessorKey: "id",
        header: ({column}) => {
            return (
                <Button
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    성적
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const id = row.getValue("id") as string;
            return (
                <div className="">
                    <span>
                        <ScoreCell id={id}/>
                    </span>
                </div>
            );
        },
    },

    // 제출자
    {
        id: "userId",
        accessorKey: "userId",
        header: ({column}) => {
            return (
                <div className="w-30">
                    <Button
                        className="text-slate-600"
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        제출자
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            )
        },
        cell: ({row}) => {
            const userId = row.getValue("userId") as string;
            return (
                <div className="">
                    <span>
                        <UserInfoCell userId={userId}/>
                    </span>
                </div>
            );
        },
    },

    // email
    {
        id: "userId",
        accessorKey: "userId",
        header: ({column}) => {
            return (
                <div className="w-30">
                    <Button
                        className="text-slate-600"
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            )
        },
        cell: ({row}) => {
            const userId = row.getValue("userId") as string;
            return (
                <div className="">
                    <span>
                        <EmailInfoCell userId={userId}/>
                    </span>
                </div>
            );
        },
    },

    // 과제 추가 날짜
    {
        id: "createdAt",
        accessorKey: "createdAt",
        header: ({column}) => {
            return (
                <div className="">
                    <Button
                        className="text-slate-600"
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        과제 제출일
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            )
        },
        cell: ({row}) => {
            const createdDate = row.getValue("createdAt")
            //@ts-ignore
            const formattedCreatedDate = createdDate ? format(new Date(createdDate), "yyyy년 MM월 dd일 HH시 mm분") : "날짜 없음";

            return (
                <div className="w-[190px] line-clamp-1">
                    <span>
                        {formattedCreatedDate}
                    </span>
                </div>
            )
        },
    },

    // 옵션
    {
        id: "actions",
        cell: ({row}) => {
            const {id} = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="link" className="h-4 w-8 p-0">
                            <span className="sr-only">메뉴</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/teacher/tasks/score/doTask/${id}`}>
                            <DropdownMenuItem>
                                <Pencil className="h-4 w-4 mr-2"/>
                                채점
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
