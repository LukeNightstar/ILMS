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
import {Chapter} from "@prisma/client";
import {Editor} from "@/components/editor";
import {Preview} from "@/components/preview";

interface ChapterAccessFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    description: z.string().min(1),
});

export const ChapterAccessForm = ({
                                           initialData,
                                           courseId,
                                           chapterId
                                       }: ChapterAccessFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
        },
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("단원 수정 완료");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("오류: 문제가 있습니다.");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                단원 설명
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>취소</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            내용 수정
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <div className={cn("text-sm mt-2",
                    !initialData.description && "text-slate-500 italic")}>
                    {!initialData.description && "내용 없음"}
                    {initialData.description && (
                        <Preview value={initialData.description}/>
                    )}
                </div>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Editor {...field}/>
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
