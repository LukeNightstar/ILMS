import Link from "next/link"
import {Button} from "@/components/ui/button"

import * as React from "react"

import Banner from "@/app/(landing)/_components/Banner";
import ILMSlogo from "@/app/(landing)/_components/ILMSlogo";
import {Separator} from "@/components/ui/separator";
import Footer from "@/app/(landing)/_components/Footer";
import {Home} from "lucide-react";
import LandingMenu from "@/app/(landing)/_components/landing-menu";
import {auth, currentUser, SignOutButton} from "@clerk/nextjs";

export default async function AuthenticationPage() {

    const {user} = auth();

    // 현재 로그인한 유저 정보 가져오기
    const loginUser = await currentUser();

    return (
        <div id="root">
            <div className="relative">

                <Banner/>
                <div className="left-0">
                    <div className="header bg-[#111827] h-[80px] flex items-center justify-between relative">
                        <div className="container items-center transition-all flex">
                            <div className="flex-grow flex items-center justify-start gap-[80px] text-white">
                                <ILMSlogo/>
                                <LandingMenu/>
                            </div>
                            <div className="flex-grow flex items-center justify-end gap-[20px] ">
                                {!loginUser ? (
                                    <Link href="/sign-in">
                                        <Button
                                            className="relative flex overflow-hidden rounded-lg transition duration-200 items-center gap-1.5 bg-[#3994FF] text-white hover:bg-[#0076FF] active:bg-opacity-40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-default text-base px-4 py-2">
                                            <div className="flex-grow justify-center max-w-full">
                                                <span
                                                    className="transition duration-200 whitespace-nowrap truncate block w-full text-center">로그인</span>
                                            </div>
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button
                                        className="relative flex overflow-hidden rounded-lg transition duration-200 items-center gap-1.5 bg-[#3994FF] text-white hover:bg-[#0076FF] active:bg-opacity-40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-default text-base px-4 py-2">
                                        <div className="flex-grow justify-center max-w-full">
                                            <span
                                                className="transition duration-200 whitespace-nowrap truncate block w-full text-center">
                                                <SignOutButton>
                                                    로그아웃
                                                </SignOutButton>
                                            </span>
                                        </div>
                                    </Button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                <Separator className="bg-gray-700"/>

                <div className="w-full relative z-1 min-h-[800px] flex"
                     style={{background: "linear-gradient(rgb(19, 21, 31) -4.84%, rgb(29, 28, 47) 34.9%, rgb(33, 32, 54) 48.6%, rgb(51, 40, 62) 66.41%, rgb(98, 61, 83) 103.41%, rgb(140, 81, 102) 132.18%)"}}>
                    <div className="min-h-full w-full flex items-center justify-start">
                        <div
                            className="mx-auto w-full max-w-[1240px] px-6 lg:px-10 py-6 lg:py-10 pt-10 lg:pt-24 lg:py-36">
                            <div
                                className="w-full text-center md:w-3/5 md:mx-auto lg:mx-0 lg:text-left rtl:lg:text-right lg:w-3/5">
                                <h1 className="text-[#F2F4FB] min-h-[127px] font-bold lg:text-6xl text-left text-6xl md:text-left sm:text-center">
                                    새로운 경험을<br/>제공합니다<br/>ILMS
                                </h1>

                                <p className="text-[#9195AB] text-base mt-7 mb-10 whitespace-pre-line md:text-left sm:text-center">
                                    LMS의 기본 시스템의 구현과 더 나아가 사용자 친화적인, 상호작용 할 수 있는 요소가 충분한 것을 목표로 했습니다. 부족한 부분이 많지만
                                    기회가 있다면 더 많은 것을 추가할 예정입니다.
                                </p>

                                <div
                                    className="flex md:flex-row sm:flex-col justify-start items-stretch gap-4 max-w-[168px] lg:max-w-none m-auto">


                                    <button
                                        className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center bg-[#3994FF] text-white hover:bg-[#0076FF] active:bg-opacity-40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-default undefined text-base px-4 py-3">
                                        <div className="flex grow justify-center max-w-full">
                                            <Link href="/home">
                                                <div className="flex items-center justify-center">
                                                    <Home className="mr-2"/>
                                                    <p className="">홈으로 이동하기</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </button>
                                    <button
                                        className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center  gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 active:text-opacity-60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-opacity-10 undefined text-base px-6 py-3">
                                        <div className="flex grow justify-center max-w-full"><span
                                            className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">See features</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Separator className="bg-gray-700"/>
                <Footer/>
            </div>

        </div>
    )
}
