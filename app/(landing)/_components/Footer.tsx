import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#272934] mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
            <div className="border-t border-slate-900/5 py-5 flex flex-col md:flex-row">
                {/* 왼쪽 컨텐츠 */}
                <div className="relative flex-1 text-center md:text-left flex text-white">
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
                            d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
                        />
                    </svg>
                    <span className="text-lg font-semibold">Acme Inc</span>
                    <p className="absolute mt-6 text-sm text-center leading-6 text-slate-500">© 2023 Tailwind Labs Inc. All rights reserved.</p>
                </div>

                {/* 오른쪽 상단 컨텐츠 */}
                <div className="lg:flex-1 flex justify-end text-right text-sm font-semibold leading-6 text-slate-700">
                    <a href="/privacy-policy">Privacy policy</a>
                    <div className="h-4 w-px bg-slate-500/20 mx-2"></div>
                    <a href="/changelog">Changelog</a>
                </div>
            </div>
        </footer>






    );
};

export default Footer;
