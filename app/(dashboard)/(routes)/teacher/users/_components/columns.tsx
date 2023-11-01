"use client"

import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal, Pencil} from "lucide-react"

import {Button} from "@/components/ui/button";

import {User} from "@prisma/client";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {EmailInfoCell} from "@/app/(dashboard)/(routes)/teacher/users/_components/email-info-cell";

export const columns: ColumnDef<User>[] = [

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

    // userName
    {
        id: "username",
        accessorKey: "username",
        header: ({column}) => {
            return (
                <Button
                    className="text-slate-600"
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    유저명
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            return (
                <div className="flex">
                    <span className="w-[110px] line-clamp-1 font-medium">
                        {row.getValue("username")}
                    </span>
                </div>
            )
        },
    },

    // 유저 ID
    {
        id: "externalId",
        accessorKey: "externalId",
        header: ({column}) => {
            return (
                <div className="w-30">
                    <Button
                        className="text-slate-600"
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        유저 ID
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            )
        },
        cell: ({row}) => {
            return (
                <div className="w-[290px] line-clamp-1 font-medium">
                    {row.getValue("externalId")}
                </div>
            );
        },
    },

    // email
    {
        id: "email",
        accessorKey: "externalId",
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
            const userId = row.getValue("externalId") as string;
            return (
                <div className="">
                    <span>
                        <EmailInfoCell userId={userId}/>
                    </span>
                </div>
            );
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
                        <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2"/>
                            수정
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]
