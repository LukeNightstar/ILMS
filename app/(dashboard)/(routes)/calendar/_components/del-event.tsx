import React, {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {ExclamationTriangleIcon} from '@heroicons/react/20/solid';
import {CalendarPlus} from "lucide-react";

function DeleteEventDialog({
                               //@ts-ignore
                               showDeleteModal,
                               //@ts-ignore
                               setShowDeleteModal,
                               //@ts-ignore
                               handleDelete,
                               //@ts-ignore
                               handleCloseModal
                           }) {
    return (
        <Transition.Root show={showDeleteModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
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
                                        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                        <ExclamationTriangleIcon className="h-12 w-12 text-red-600"/>
                                    </div>
                                    <div className="text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="flex items-center justify-center text-xl font-semibold leading-6 text-gray-900">
                                            <p>일정 삭제</p>
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                정말 일정을 삭제하시겠습니까?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                    <button type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover-bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={handleDelete}>
                                        삭제
                                    </button>
                                    <button type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={handleCloseModal}>
                                        취소
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default DeleteEventDialog;
