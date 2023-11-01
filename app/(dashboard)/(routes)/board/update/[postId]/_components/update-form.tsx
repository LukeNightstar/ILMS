"use client";

import * as z from "zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {SetStateAction, useState} from "react";
import {PostDeleteButton} from "@/app/(dashboard)/(routes)/board/_components/post-delete-button";
import Link from "next/link";
import {BoardSelector} from "@/app/(dashboard)/(routes)/board/_components/board-selector";
import {CheckSquare} from "lucide-react";

interface UpdateFormProps {
    initialData: {
        title: string;
        content: string;
        boardId: string;
    };
    options: {
        label: string;
        value: string;
    }[];
    postId: string;
}

const formSchema = z.object({
    title: z.string().min(1, {}),
    content: z.string().min(1, {}),
    boardCategory: z.string().min(1, {}),
});

const UpdateForm = ({
                        initialData,
                        options,
                        postId
                    }: UpdateFormProps) => {

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title,
            content: initialData?.content,
            boardCategory: initialData.boardId
        },
    })
    const {isSubmitting, isValid} = form.formState;
    const [selectedCategory, setSelectedCategory] = useState(''); // 선택한 카테고리를 상태로 관리

    // 선택한 카테고리가 변경될 때마다 해당 값을 업데이트
    const handleCategoryChange = (value: SetStateAction<string>) => {
        setSelectedCategory(value);
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.patch(
                `/api/board/update/${postId}`, {...values, board: selectedCategory});
            router.push(`/board/post/${response.data.id}`);
            toast.success("게시글 수정 완료");
        } catch {
            toast.error("오류: 문제가 있습니다.");
        }
    }

    return (
        <div className="justify-between items-center">
            <h1 className="text-3xl font-bold">게시글 수정</h1>
            <Separator className="mt-4 mb-4"/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {/* 글 제목 */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-xl font-semibold">글 제목</FormLabel>
                                    <FormControl>
                                        <Input{...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>

                        {/* 게시판 선택 */}
                        <FormField
                            control={form.control}
                            name="boardCategory"
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
                                            }}
                                        />
                                    </FormControl>
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
                                <FormItem>
                                    <FormLabel className="text-xl font-semibold">내용</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="h-80"
                                            disabled={isSubmitting}
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                    </div>

                    {/*<PostAttachment postId={postId}/>*/}
                    <div className="grid grid-cols-2 items-center">
                        <Link href={`/board/post/${postId}`}>
                            <Button>
                                뒤로가기
                            </Button>
                        </Link>
                        <div className="flex justify-end gap-x-2">
                            <div className="">
                                <Button type="submit"
                                        disabled={!isValid || isSubmitting}
                                        className="bg-emerald-500 hover:bg-emerald-500/90"
                                    // variant="confirm"
                                >
                                    <CheckSquare className="w-4 h-4 mr-2"/>
                                    수정 완료
                                    {/*<FcOk className="w-6 h-6"/>*/}
                                    {/*<FcCheckmark className="w-6 h-6"/>*/}
                                </Button>
                            </div>
                            <PostDeleteButton postId={postId}/>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default UpdateForm;