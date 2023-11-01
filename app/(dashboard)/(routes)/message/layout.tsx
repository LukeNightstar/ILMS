import React from "react";

export default function MessageLayout({
                                          children
                                      }: {
    children: React.ReactNode;
}) {

    return (
        <>
            <div className="items-center justify-center flex text-5xl font-bold">
                작업 중입니다.
            </div>
            {/*<div className="-m-10 h-screen w-screen flex">
                <div className="w-[300px] p-4 border-r">
                    <UserList/>
                </div>

                <div className="p-4">
                    {children}
                </div>
            </div>*/}
        </>
    );
}
