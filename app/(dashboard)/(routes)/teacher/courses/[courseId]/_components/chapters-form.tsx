"use client";

import * as z from "zod";
import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Chapter, Course} from "@prisma/client";

import {useState} from "react";
import {Loader2, PlusCircle} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {ChaptersList} from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/chapters-list";

interface ChaptersFormProps {
    initialData: Course & {
        chapters: Chapter[]
    };
    courseId: string;
}

const formSchema = z.object({
    title: z.string().min(1),
});

export const ChaptersForm = ({
                                 initialData,
                                 courseId
                             }: ChaptersFormProps) => {

    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const toggleCreating = () => {
        setIsCreating((current) => !current);
    }

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const {isSubmitting, isValid} = form.formState;

    // 챕터 생성
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/chapters`, values);
            toast.success("단원 생성 완료");
            toggleCreating();
            router.refresh();
        } catch {
            toast.error("오류: 문제가 있습니다.");
        }
    }

    // 단원 부분
    const onReorder = async (updateData: {
        id: string;
        position: number
    }[]) => {
        try {
            setIsUpdating(true);

            await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
                list: updateData,
            });
            toast.success("단원 수정 완료")
            router.refresh();
        } catch {
            toast.error("오류: 문제가 있습니다.");
        } finally {
            setIsUpdating(false);
        }
    }

    const onEdit = (id: string) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`);
    }

    return (
        <div className="relative mt-6 border bg-slate-100 rounded-md p-4">

            {/* 업데이트 로딩 기능*/}
            {isUpdating && (
                <div
                    className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
                    <Loader2 className="animate-spin h-6 w-6 text-sky700"/>
                </div>
            )}

            {/* 상단부 버튼 기능*/}
            <div className="font-medium flex items-center justify-between">
                단원
                <Button onClick={toggleCreating} variant="ghost">
                    {isCreating ? (
                        <>취소</>
                    ) : (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            단원 추가
                        </>
                    )}
                </Button>
            </div>

            {/*강의 단원 추가 파트 기본틀*/}
            {isCreating && (
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
                                            placeholder="e.g. 단원 설명"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <Button disabled={!isValid || isSubmitting} type="submit">
                            생성
                        </Button>
                    </form>
                </Form>
            )}

            {/* Drag&Drop 기능*/}
            {!isCreating && (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.chapters.length && "text-slate-500 italic"
                )}>
                    {!initialData.chapters.length && "단원 없음"}
                    <ChaptersList
                        onEdit={onEdit}
                        onReorder={onReorder}
                        items={initialData.chapters || []}
                    />
                </div>
            )}

            {/*하단부 설명*/}
            {!isCreating && (
                <p className="text-xs text-muted-foreground mt-4">
                    마우스를 드래그하여 단원의 순서를 바꿀 수 있습니다.
                </p>
            )}
        </div>
    );
}
