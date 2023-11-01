"use client";

import * as z from "zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import axios from "axios";
import {format} from "date-fns";
import {cn} from "@/lib/utils";
import React, {useState} from "react";
import {Task} from "@prisma/client";
import {Pencil} from "lucide-react";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

interface DeadlineFormProps {
    initialData: Task;
    taskId: string;
}

const formSchema = z.object({
    deadline: z.string().min(1, {
        message: "마감 기한을 설정해주세요"
    }),
});

export const DeadlineForm = ({
                                 initialData,
                                 taskId
                             }: DeadlineFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });
    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const deadline = values.deadline;
            const deadlineDate = new Date(deadline).toISOString();
            const formattedValues = {...values, deadline: deadlineDate};

            await axios.patch(`/api/tasks/${taskId}`, formattedValues);
            toast.success("과제 수정 완료");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("오류: 문제가 있습니다.");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                제출 마감일 설정
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>취소</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            날짜 변경
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn("text-sm mt-2",
                    !initialData.deadline && "text-slate-500 italic")}>
                    {initialData.deadline ? (
                        <>
                            {format(new Date(initialData.deadline), "yyyy년 MM월 dd일 HH시 mm분")}
                        </>
                    ) : (
                        "날짜 선택되지 않음"
                    )}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="deadline"
                            render={({field}) => (
                                <>
                                    <FormItem>
                                        <FormControl>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateTimePicker
                                                    className="w-full"
                                                    label="날짜와 시간을 선택하세요"
                                                    disablePast={true}
                                                    onChange={(date) => {
                                                        field.onChange(date ? date.toString() : null);
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                        <FormDescription className="ml-1">
                                            기한은 너무 급박하지 않는 것이 좋습니다.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                </>
                            )}/>
                        <div className="flex items-center gap-x-3">
                            <Button disabled={!isValid || isSubmitting} type="submit">
                                저장
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}
