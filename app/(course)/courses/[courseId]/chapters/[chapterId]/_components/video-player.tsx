"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import {useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";

import {cn} from "@/lib/utils";
import {useConfettiStore} from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
    playbackId: string;
    courseId: string;
    chapterId: string;
    nextChapterId?: string;
    completeOnEnd: boolean;
    title: string;
}

export const VideoPlayer = ({
                                playbackId,
                                courseId,
                                chapterId,
                                nextChapterId,
                                completeOnEnd,
                                title,
                            }: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    const confetti = useConfettiStore();

    const onEnd = async () => {
        try {
            if (completeOnEnd) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isCompleted: true,
                });

                // 완료 시 이펙트 기능 비활성화 - 문제 있음
                /*if (!nextChapterId) {
                    confetti.onOpen();
                }*/

                toast.success("강의 진척도가 업데이트되었습니다");
                router.refresh();

                if (nextChapterId) {
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
                }
            }
        } catch {
            toast.error("오류: 문제가 있습니다");
        }
    }

    return (
        <div className="relative aspect-video">
            <MuxPlayer
                title={title}
                className={cn(
                    !isReady && "hidden"
                )}
                onCanPlay={() => setIsReady(true)}
                onEnded={onEnd}
                autoPlay
                playbackId={playbackId}
            />
        </div>
    )
}