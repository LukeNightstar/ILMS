"use client"

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"
import {useRouter} from "next/navigation";

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";


const formSchema = z.object({
    title: z.string().min(1, {
        message: "제목이 필요합니다"
    }),
})

// 강의 생성 페이지
const CreatePage = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("강의가 추가되었습니다")
        } catch {
            toast.error("오류: 문제가 있습니다.");
        }
    }

    return (
        <div className="flex md:items-start md:justify-start h-full max-w-5xl">
            <div>
                <h1 className="text-4xl font-bold">
                    강의를 추가하세요
                </h1>
                <p className="mt-4 text-md">
                    강의 재목을 정하기 어려우신가요?<br/>
                    걱정하지마세요. 언제든지 바꾸실 수 있답니다.
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>강의 제목</FormLabel>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder="예시) 'Next.js 기초 강의'" {...field}/>
                                    </FormControl>
                                    <FormDescription>
                                        이 강의에서 무엇을 가르치실 건가요?
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <div className="flex items-center gap-x-3">
                            <Link href="/teacher/courses">
                                <Button type="button" value="ghost">취소</Button>
                            </Link>
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                계속
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CreatePage;