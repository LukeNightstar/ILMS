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
import {cn} from "@/lib/utils";
import {Course} from "@prisma/client";
import {Combobox} from "@/components/ui/combobox";

interface CategoryFormProps {
    initialData: Course;
    courseId: string;
    options: { label: string; value: string; } [];
}

const formSchema = z.object({
    categoryId: z.string().min(1),
});

export const CategoryForm = ({
                                 initialData,
                                 courseId,
                                 options,
                             }: CategoryFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || ""
        },
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("강의 수정 완료");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("오류: 문제가 있습니다.");
        }
    }

    const selectedOption = options.find((
        option) => option.value === initialData.categoryId);

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                강의 카테고리
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>취소</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            카테고리 수정
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn("text-sm mt-2",
                    !initialData.categoryId && "text-slate-500 italic")}>
                    {selectedOption?.label || "카테고리 없음"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Combobox options={...options} {...field} />
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
