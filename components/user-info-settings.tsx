"use client";

import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {UserIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {UserProfile} from "@clerk/nextjs";

export default function UserInfoSettings() {
    const [showModal, setShowModal] = useState(false)

    function handleButtonClick() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    return (
        <>
            <Button onClick={handleButtonClick} variant="link" className="text-white text-xl font-semibold p-0">
                <UserIcon className="w-6 h-6 mr-2"/>개인정보
            </Button>

            <Transition.Root show={showModal} as={Fragment}>
                <Dialog as="div" onClose={setShowModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel
                                    className="bg-white overflow-y-auto overflow-x-hidden scrollbar-hide max-h-[700px] rounded-lg bg-opacity-0">
                                    {/* TODO: 대충 만들어서 수정해야함 매우 비효율적인 방식임*/}
                                    <div className="-mb-5 w-full fixed bg-white">&nbsp;</div>
                                    <div className="-mx-7">
                                        <UserProfile/>
                                    </div>
                                    <div className="-mt-5 w-full fixed bg-white">&nbsp;</div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}