import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {CalendarPlus} from 'lucide-react';
import {Input} from "@/components/ui/input";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

interface Interface {
    showModal: () => void;
    onConfirm: () => void;
}

export const AddEventDialog = ({
                                   //@ts-ignore
                                   showModal,
                                   //@ts-ignore
                                   setShowModal,
                                   //@ts-ignore
                                   handleSubmit,
                                   //@ts-ignore
                                   newEvent,
                                   //@ts-ignore
                                   handleChange,
                                   //@ts-ignore
                                   handleCloseModal
                               }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState();
    const router = useRouter();

    const onSumbit = async () => {
        try {

            toast.success("일정 추가 완료");
            router.refresh();
        } catch (e) {
            console.error(e);
            toast.error("오류: 문제가 있습니다.");
        }
    }

    return (
        <Transition.Root show={showModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setShowModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div>
                                    <div
                                        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                        <CalendarPlus size="40" className="text-green-500"/>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                                            새 일정
                                        </Dialog.Title>
                                        <form action="submit" onSubmit={handleSubmit}>
                                            <div className="mt-4">
                                                <Input
                                                    type="text"
                                                    value={newEvent.title}
                                                    placeholder="새 일정을 추가하세요"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div
                                                className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                <button
                                                    onClick={onSumbit}
                                                    type="submit"
                                                    className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                                                    disabled={newEvent.title === ''}
                                                >
                                                    추가
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                                    onClick={handleCloseModal}
                                                >
                                                    취소
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

