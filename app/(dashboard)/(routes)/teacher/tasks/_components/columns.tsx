"use client"

import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal, Pencil, Trash} from "lucide-react"

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

import {Task} from "@prisma/client";
import {format} from "date-fns";

export const columns: ColumnDef<Task>[] = [

    // title
    {
        id: "title",
        accessorKey: "title",
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
            return (
                <div className="flex">
                    <span className="max-w-[150px] line-clamp-1 font-medium">
                        {row.getValue("title")}
                    </span>
                </div>
            )
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
                        과제 생성일
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
        //@ts-ignore
        // Object literal may only specify known properties, and {className} does not exist in type
        // className: "bg-yellow-400 ",
    },

    // 과제 기한
    {
        id: "deadline",
        accessorKey: "deadline",
        header: ({column}) => {
            return (
                <div className="">
                    <Button
                        className="text-slate-600"
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        제출 마감일
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            )
        },
        cell: ({row}) => {
            const deadline = row.getValue("deadline");
            //@ts-ignore
            const formattedDeadline = deadline ? format(new Date(deadline), "yyyy년 MM월 dd일 HH시 mm분") : "날짜 없음";

            return (
                <div className="w-[190px]">
                  <span>
                         {formattedDeadline}
                  </span>
                </div>
            )
        },

    },

    // 과제 설명
    {
        id: "description",
        accessorKey: "description",
        header: ({column}) => {
            return (
                <div className="">
                    <Button
                        className="text-slate-600"
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        과제 설명
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            )
        },
        cell: ({row}) => {
            return (
                <div className="line-clamp-1">
                    <span>
                        {row.getValue("description")}
                    </span>
                </div>
            )
        },
        //@ts-ignore
        // Object literal may only specify known properties, and {className} does not exist in type
        // className: "bg-yellow-400 ",
    },

    // 등록 여부
    {
        id: "isPublished",
        accessorKey: "isPublished",
        header: ({column}) => {
            return (
                <Button
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    등록됨
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const isPublished = row.getValue("isPublished") || false;
            return (
                <Badge className={cn("bg-slate-500 -ml-2", isPublished && "bg-sky-700")}>
                    {isPublished ? "등록됨" : "미등록"}
                </Badge>
            )
        }
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
                        <Link href={`/teacher/tasks/${id}`}>
                            <DropdownMenuItem>
                                <Pencil className="h-4 w-4 mr-2"/>
                                수정
                            </DropdownMenuItem>
                        </Link>
                        <Link href={`#`}>
                            <DropdownMenuItem>
                                <Trash className="h-4 w-4 mr-2"/>
                                삭제
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
