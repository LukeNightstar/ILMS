"use client";

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Textarea} from "@/components/ui/textarea";

import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import {SetStateAction, useState} from "react";
import {BoardSelector} from "@/app/(dashboard)/(routes)/board/_components/board-selector";

interface CreateFormProps {
    options: {
        label: string;
        value: string
    }[];
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "제목이 필요합니다"
    }),
    content: z.string().min(1, {
        message: "내용이 필요합니다."
    }),
    board: z.string().min(1, {
        message: "카테고리를 선택하세요."
    }),
})

const CreateFormOld = ({
                           options,
                       }: CreateFormProps) => {
    const [selectedCategory, setSelectedCategory] = useState(''); // 선택한 카테고리를 상태로 관리

    // 선택한 카테고리가 변경될 때마다 해당 값을 업데이트
    const handleCategoryChange = (value: SetStateAction<string>) => {
        setSelectedCategory(value);
    };

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });
    const {isSubmitting, isValid} = form.formState;

    // 글 작성
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post(
                "/api/board/post", {...values, board: selectedCategory});
            router.push(`/board/post/${response.data.id}`);
            toast.success("글 작성 완료")
        } catch {
            toast.error("오류: 문제가 있습니다.");
        }
    }

    return (
        <div className="justify-between items-center">
            <h1 className="text-3xl font-bold">새 글 작성</h1>
            <Separator className="mt-4 mb-4"/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {/* 글 제목 */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-xl font-semibold">글 제목</FormLabel>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder="예시) 새 글 제목" {...field}/>
                                    </FormControl>
                                    <FormDescription>
                                        제목을 작성해주세요
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}/>

                        {/* 게시판 선택 */}
                        <FormField
                            control={form.control}
                            name="board"
                            render={({field}) => (
                                <FormItem className="">
                                    <FormLabel className="text-xl font-semibold">카테고리</FormLabel>
                                    <FormControl>
                                        <BoardSelector
                                            {...field}
                                            options={options}
                                            onChange={(value) => {
                                                field.onChange(value);
                                                handleCategoryChange(value);
                                            }}/>
                                    </FormControl>
                                    <FormDescription>
                                        게시판을 선택해주세요
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                    </div>

                    {/* 글 내용 */}
                    <div>
                        <FormField
                            control={form.control}
                            name="content"
                            render={({field}) => (
                                <FormItem className="mt-4">
                                    <FormLabel className="text-xl font-semibold">내용</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            className="h-[450px]"
                                            disabled={isSubmitting}
                                            placeholder="새 글 내용 작성"
                                        />
                                        {/* TODO 추후 Editor로 교체 예정*/}
                                        {/*<Editor {...field}/>*/}
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                    </div>

                    {/*<PostAttachment postId={postId}/>*/}
                    <div className="grid grid-cols-2 items-center mt-2">
                        <div className="flex">
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                작성 완료
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>

            <form>
                <div>

                </div>
            </form>
        </div>
    )
};

export default CreateFormOld;