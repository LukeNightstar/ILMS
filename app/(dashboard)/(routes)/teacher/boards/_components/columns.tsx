"use client"

import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal} from "lucide-react"

import {Button} from "@/components/ui/button";

import {Post} from "@prisma/client";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {CategoryInfoCell} from "@/app/(dashboard)/(routes)/teacher/boards/_components/category-info-cell";
import Link from "next/link";
import {format} from "date-fns";

export const columns: ColumnDef<Post>[] = [
    // title
    {
        id: "title",
        accessorKey: "title",
        header: ({column}) => {
            return (
                <Button
                    className="text-slate-600 line-clamp-1"
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    글 제목
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            return (
                <div className="flex">
                    <span className="max-w-[180px] line-clamp-1 font-medium">
                        {row.getValue("title")}
                    </span>
                </div>
            )
        },
    },

    // 카테고리
    {
        id: "boardId",
        accessorKey: "boardId",
        header: ({column}) => {
            return (
                <div className="">
                    <Button
                        className="text-slate-600"
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        카테고리
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            )
        },
        cell: ({row}) => {
            const boardId = row.getValue("boardId") as string;
            return (
                <div className="pl-2.5">
                    <CategoryInfoCell boardId={boardId}/>
                </div>
            );
        },
    },

    // 생성 날짜
    {
        id: "createdAt",
        accessorKey: "createdAt",
        header: ({column}) => {
            return (
                <Button
                    className="text-slate-600"
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
                >
                    생성 날짜
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const createdDate = row.getValue("createdAt")
            //@ts-ignore
            const formattedCreatedDate = createdDate ? format(new Date(createdDate), "yyyy년 MM월 dd일 HH시 mm분") : "날짜 없음";

            return (
                <div className="w-[190px]">
                    <span>
                        {formattedCreatedDate}
                    </span>
                </div>
            );
        },
    },

    // 조회수
    {
        id: "views",
        accessorKey: "views",
        header: ({column}) => {
            return (
                <div className="w-30">
                    <Button
                        className="text-slate-600"
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        조회수
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            )
        },
        cell: ({row}) => {
            const views = row.getValue("views") as number;
            const formattedViews = views.toLocaleString();
            return (
                <span className="">{formattedViews}</span>
            );
        },
    },

    // 등록 여부
    {
        id: "isPublished",
        accessorKey: "isPublished",
        header: ({column}) => {
            return (
                <Button
                    className="text-slate-600"
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
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
                        <Button variant="ghost" className="h-4 w-8 p-0">
                            <span className="sr-only"/>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/teacher/boards/post/${id}`}>
                            <DropdownMenuItem>
                                글 보기
                            </DropdownMenuItem>
                        </Link>
                        <Link href={`#`}>
                            <DropdownMenuItem>
                                등록 해제
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>
                            삭제
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]
