import React from 'react';
import Link from "next/link";

const ILMSlogo = () => {
    return (
<div className="logo flex text-2xl font-bold left-40">
    <Link href="/" className="flex items-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-4 h-6 w-6"
        >
            <path
                d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>
        </svg>
        Acme Inc
    </Link>
</div>
);
}
export default ILMSlogo;