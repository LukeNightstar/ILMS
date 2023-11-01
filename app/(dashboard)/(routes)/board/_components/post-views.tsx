"use client";

import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface PostViewsProps {
    postId: string;
    userId: string;
}

// 쿠키 기반으로 조회수 구현
const PostViews = ({
                       postId,
                       userId
                   }: PostViewsProps) => {
    const [views, setViews] = useState(0);

    useEffect(() => {
        // 사용자 ID를 포함한 쿠키 이름 생성
        const cookieName = `viewed_${postId}_${userId}`;


        // 쿠키에서 해당 게시물의 조회 여부를 확인
        // 해당 게시물을 이미 조회한 경우, 쿠키에서 조회수 가져오기
        const hasViewed = Cookies.get(cookieName);
        if (hasViewed) {
            // 이미 조회한 경우, 조회수를 가져오지 않음
            setViews(Number(hasViewed));
            return;
        }

        // 서버 엔드포인트로 조회수 업데이트 요청 보내기
        axios
            .patch(`/api/board/views/${postId}`)
            .then((response) => {
                const {views} = response.data;
                setViews(views);

                // 조회 여부를 쿠키에 저장 (사용자 별로 구분)
                Cookies.set(cookieName, views, {expires: 1});
            })
            .catch((error) => {
                console.error("Error updating views:", error);
            });
    }, [postId, userId]);

    return (
        <></>
    )
};

export default PostViews;
