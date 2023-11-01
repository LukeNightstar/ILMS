"use client"

import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal, Pencil, Trash} from "lucide-react"

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";

import {Course} from "@prisma/client";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {CategoryInfoCell} from "@/app/(dashboard)/(routes)/teacher/courses/_components/category-info-cell";
import {format} from "date-fns";
import toast from "react-hot-toast";
import axios from "axios";
import {ConfirmModal} from "@/components/modals/confirm-modal";

// Define the onChange function
const onChange = (isChecked: boolean, courseId: string) => {
    // Handle changes here
    console.log(`Course ID: ${courseId}, Is Checked: ${isChecked}`);
};

const onDelete = async (id: string) => {
    try {
        await axios.delete(`/api/courses/${id}`);
        toast.success("강의 삭제 완료");
    } catch {
        toast.error("오류: 문제가 있습니다.");
    }
};

export const columns: ColumnDef<Course>[] = [

// selected - 선택 옵션 제거 = 현재 구현 난이도 상
    /* {
         id: "select",
         header: ({table}) => (
             <Checkbox
                 checked={table.getIsAllPageRowsSelected()}
                 onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                 aria-label="Select all"
                 className="translate-y-[1px]"
             />
         ),
         cell: ({row}) => {
             const isChecked : boolean = row.getIsSelected();
             const courseId = row.original.id;

             return (
                 <Checkbox
                     checked={isChecked}
                     onCheckedChange={(value) => {
                         row.toggleSelected(!!value);
                         // isChecked가 변경될 때 courseId를 부모로 전달
                         onChange(isChecked, courseId);
                     }}
                     aria-label="Select row"
                     className="translate-y-[1px]"
                 />
             )
         },
         enableSorting: false,
         enableHiding: false,
         //@ts-ignore
         // Object literal may only specify known properties, and {className} does not exist in type
         // className: "w-[48px]",
     },*/

    // title
    {
        id: "title",
        accessorKey: "title",
        header: ({column}) => {
            return (
                <Button
                    className="text-slate-600"
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    강의명
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            return (
                <div className="flex">
                    <span className="w-[170px] line-clamp-1 font-medium">
                        {row.getValue("title")}
                    </span>
                </div>
            )
        },
        //@ts-ignore
        // Object literal may only specify known properties, and {className} does not exist in type
        // className: "md:w-[180px] bg-red-400 ",
    },

    // 카테고리
    {
        id: "categoryId",
        accessorKey: "categoryId",
        header:
            ({column}) => {
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
        cell:
            ({row}) => {
                const categoryId = row.getValue("categoryId") as string;
                return (
                    // lg:max-w-[calc(100vw-300px)]
                    <div className="w-[120px]">
                    <span>
                        <CategoryInfoCell categoryId={categoryId}/>
                    </span>
                    </div>
                );
            },
//@ts-ignore
// Object literal may only specify known properties, and {className} does not exist in type
// className: "bg-yellow-400 ",
    },

// 강의 생성일
    {
        id: "createdAt",
        accessorKey:
            "createdAt",
        header:
            ({column}) => {
                return (
                    <div className="w-30">
                        <Button
                            className="text-slate-600"
                            variant="link"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            강의 생성일
                            <ArrowUpDown className="ml-2 h-4 w-4"/>
                        </Button>
                    </div>
                )
            },
        cell:
            ({row}) => {
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
    }
    ,

// description
    {
        id: "description",
        accessorKey:
            "description",
        header:
            ({column}) => {
                return (
                    <Button
                        className="text-slate-600"
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        강의 설명
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
        cell:
            ({row}) => {
                return (
                    <div className="flex">
                    <span className="line-clamp-1 font-medium">
                        {row.getValue("description")}
                    </span>
                    </div>
                )
            },
    }
    ,

// 등록 여부
    {
        id: "isPublished",
        accessorKey:
            "isPublished",
        header:
            ({column}) => {
                return (
                    <Button
                        className="text-slate-600"
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        등록됨
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
        cell:
            ({row}) => {
                const isPublished = row.getValue("isPublished") || false;
                return (
                    <Badge className={cn("bg-slate-500 -ml-2", isPublished && "bg-sky-700")}>
                        {isPublished ? "등록됨" : "미등록"}
                    </Badge>
                )
            },
        //@ts-ignore
        // Object literal may only specify known properties, and {className} does not exist in type
        // className: "justify-end md:w-[140px] bg-red-400 ",
    }
    ,

// 옵션
    {
        id: "actions",
        cell:
            ({row}) => {
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
                            <Link href={`/teacher/courses/${id}`}>
                                <DropdownMenuItem>
                                    <Pencil className="h-4 w-4 mr-2"/>
                                    수정
                                </DropdownMenuItem>
                            </Link>
                                <Link href={`#`} onClick={(e) => {
                                    e.preventDefault(); // 기본 링크 동작 방지
                                    onDelete(id).then(() => {
                                        // 비동기 작업 완료 후 페이지 리프레시 또는 다른 작업 수행
                                    });
                                }}>
                                    <DropdownMenuItem>
                                        <Trash className='h-4 w-4 mr-2'/>
                                        삭제
                                    </DropdownMenuItem>
                                </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        //@ts-ignore
        // Object literal may only specify known properties, and {className} does not exist in type
        // className: "md:w-10 p-0 bg-blue-300 items-center justify-center",
    }
]
