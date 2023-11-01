"use client";

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {Button} from "@/components/ui/button";
import {Pencil} from "lucide-react";
import axios from "axios";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

interface TitleFormProps {
    initialData: {
        title: string;
    };
    taskId: string;
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "제목이 필요합니다"
    }),
});

export const TitleForm = ({
                              initialData,
                              taskId
                          }: TitleFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    })

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/tasks/${taskId}`, values);
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
                과제명
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>취소</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            제목 수정
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className="text-sm mt-2">
                    {initialData.title}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Advanced web development'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
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
