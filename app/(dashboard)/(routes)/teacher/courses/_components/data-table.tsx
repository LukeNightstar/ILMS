"use client"

import * as React from "react"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {DataTableToolbar} from "@/app/(dashboard)/(routes)/teacher/_components/data-table-toolbar";
import {DataTablePagination} from "@/app/(dashboard)/(routes)/teacher/_components/data-table-pagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                         }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    return (
        <div>
            {/* 상단 부분 */}
            <div>
                <DataTableToolbar table={table}/>
            </div>

            <div className="border rounded-md">
                <Table>

                    {/* 목록 분류 항목 */}
                    <TableHeader className="bg-slate-300">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="h-12">
                                {headerGroup.headers
                                    // .filter((header) => header.id === 'select') // Filter by the 'title' ID
                                    .map((header) => {
                                        //@ts-ignore
                                        // type 에러 뜨는거 정상임, 원래는 없는 값을 억지로 추가해서 받아왔기 때문
                                        // type 오류 없이 만드려면 각 header.id 값으로 가져온 부분마다 적용해야해서 코드가 길어짐
                                        // const {className} = header.column.columnDef

                                        const columnId: any = header.column.id;

                                        // Define classNames for specific columns
                                        const classNames: any = {
                                            // select: "w-12 rounded-tl",
                                            title: "w-[200px] p-0 rounded-tl",
                                            categoryId: "w-[150px] p-0",
                                            createdAt: "w-[220px] p-0",
                                            description: "p-0",
                                            isPublished: "w-[100px] p-0",
                                            actions: "w-[48px] rounded-tr",
                                            // Add more columns as needed
                                        };

                                        return (
                                            <TableHead
                                                className={classNames[columnId] || ""}
                                                key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    {/* 목록 항목 */}
                    <TableBody className="">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells()
                                        .map((cell) => {
                                            return (
                                                <TableCell key={cell.id} className="flex-col">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            )
                                        })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-xl">
                                    결과 없음
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </div>

            {/* 하단부 페이징 */}
            <div className="py-4">
                <DataTablePagination table={table}/>
            </div>
        </div>
    )
}
