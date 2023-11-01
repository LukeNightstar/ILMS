import React from 'react';

const DropdownFAQ = () => {
    /* eslint-disable-next-line react/no-unescaped-entities */
    return (

<div
    className="bg-[#1F2129] w-screen absolute left-0 top-[calc(100%+1px)] z-10 shadow-lg">
    <div className="px-10 mx-auto max-w-[1240px] grid grid-cols-5">
        <div
            className="w-full h-full col-span-3 pt-8 pb-9 pr-8 grid grid-cols-2 gap-8">
            <div><p
                className="text-[#656A83] text-sm font-medium">Support</p>
                <ul className="grid grid-cols-1 gap-6 mt-5 pl-2"><a
                    href="/en/tutorials"
                    className="flex items-start justify-start gap-3 cursor-pointer group transition-all duration-200">
                    <svg width="24" height="24" viewBox="0 0 24 24"
                         fill="none" xmlns="http://www.w3.org/2000/svg"
                         className="text-[#C6C8D7] group-hover:text-[#EEF0F7] transition-all duration-200 w-5 min-w-[1.25rem]">
                        <path
                            d="M8.95 20.647a7.511 7.511 0 01-5.597-5.597 13.354 13.354 0 010-6.1A7.511 7.511 0 018.95 3.353c2.006-.47 4.094-.47 6.1 0a7.511 7.511 0 015.597 5.597c.47 2.006.47 4.094 0 6.1a7.511 7.511 0 01-5.597 5.597c-2.006.47-4.094.47-6.1 0z"
                            stroke="currentColor"
                            strokeWidth="1.5"></path>
                        <circle cx="12" cy="15.5" r="1"
                                fill="currentColor"
                                stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"></circle>
                        <path
                            d="M10 10v-.5a2 2 0 012-2v0a2 2 0 012 2v.121c0 .563-.223 1.102-.621 1.5L12 12.5"
                            stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"></path>
                    </svg>
                    <div>
                        <div
                            className="text-[#C6C8D7] text-base font-semibold group-hover:text-[#EEF0F7] transition-all duration-200">Tutorials
                        </div>
                        <p className="text-sm font-medium text-[#656A83] mt-1 group-hover:text-[#656A83] transition-all duration-200">Consult
                            our documentation to get more details about
                            how to use MEE6 on Discord</p></div>
                </a><a
                    href="https://help.mee6.xyz/" target="_blank"
                    className="flex items-start justify-start gap-3 cursor-pointer group transition-all duration-200">
                    <svg width="24" height="24" viewBox="0 0 20 20"
                         fill="none" xmlns="http://www.w3.org/2000/svg"
                         className="text-[#C6C8D7] group-hover:text-[#EEF0F7] transition-all duration-200 w-5 min-w-[1.25rem]">
                        <path
                            d="M6.696 7.058h6.032m-6.032 3.456h3.839m.576 6.413h1.061c2.887 0 5.398-2.077 6.076-5.025a9.955 9.955 0 000-4.455l-.09-.386c-.652-2.841-2.781-5.049-5.494-5.698l-.381-.092a9.853 9.853 0 00-4.593 0l-.224.054c-2.81.672-5.014 2.959-5.69 5.901-.37 1.61-.367 3.303.003 4.912.687 2.989 2.708 5.476 5.419 6.635l.118.05c1.173.502 2.517-.102 2.998-1.333a.866.866 0 01.797-.563z"
                            stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round"></path>
                    </svg>
                    <div>
                        <div
                            className="text-[#C6C8D7] text-base font-semibold group-hover:text-[#EEF0F7] transition-all duration-200">Support
                            Portal
                        </div>
                        <p className="text-sm font-medium text-[#656A83] mt-1 group-hover:text-[#656A83] transition-all duration-200">Knowledgebase
                            and helpful materials in the palm of your
                            hand</p></div>
                </a><a
                    href="https://discord.gg/mee6" target="_blank"
                    className="flex items-start justify-start gap-3 cursor-pointer group transition-all duration-200">
                    <svg width="24" height="24" viewBox="0 0 18 13"
                         fill="none" xmlns="http://www.w3.org/2000/svg"
                         className="text-[#C6C8D7] group-hover:text-[#EEF0F7] transition-all duration-200 w-5 min-w-[1.25rem]">
                        <path
                            d="M15.248 1.089A15.431 15.431 0 0011.534 0a9.533 9.533 0 00-.476.921 14.505 14.505 0 00-4.12 0A9.582 9.582 0 006.461 0a15.54 15.54 0 00-3.717 1.091C.395 4.405-.242 7.636.076 10.821A15.269 15.269 0 004.631 13c.369-.473.695-.974.975-1.499a9.896 9.896 0 01-1.536-.699c.13-.089.255-.18.377-.27 1.424.639 2.979.97 4.553.97 1.574 0 3.129-.331 4.553-.97.123.096.25.188.377.27a9.94 9.94 0 01-1.54.7c.28.525.607 1.026.976 1.498a15.2 15.2 0 004.558-2.178c.373-3.693-.639-6.895-2.676-9.733zM6.01 8.862c-.888 0-1.621-.767-1.621-1.712 0-.944.708-1.718 1.618-1.718.91 0 1.638.774 1.623 1.718-.016.945-.715 1.712-1.62 1.712zm5.98 0c-.889 0-1.62-.767-1.62-1.712 0-.944.708-1.718 1.62-1.718.912 0 1.634.774 1.618 1.718-.015.945-.713 1.712-1.618 1.712z"
                            fill="currentColor"></path>
                    </svg>
                    <div>
                        <div
                            className="text-[#C6C8D7] text-base font-semibold group-hover:text-[#EEF0F7] transition-all duration-200">Discord
                            Server
                        </div>
                        <p className="text-sm font-medium text-[#656A83] mt-1 group-hover:text-[#656A83] transition-all duration-200">Join
                            our Discord Server to get all help you may
                            ever need</p></div>
                </a></ul>
            </div>
            <div><p
                className="text-[#656A83] text-sm font-medium">Company</p>
                <ul className="grid grid-cols-1 gap-6 mt-5 pl-2"><a
                    href="/en/careers"
                    className="flex items-start justify-start gap-3 cursor-pointer group transition-all duration-200">
                    <svg width="24" height="24" viewBox="0 0 24 24"
                         fill="none" xmlns="http://www.w3.org/2000/svg"
                         className="text-[#C6C8D7] group-hover:text-[#EEF0F7] transition-all duration-200 w-5 min-w-[1.25rem]">
                        <path
                            d="M3 18.433a4.074 4.074 0 013.432-4.023l.178-.029a15.163 15.163 0 014.78 0l.178.029A4.074 4.074 0 0115 18.433c0 .865-.702 1.567-1.567 1.567H4.567A1.567 1.567 0 013 18.433zM12.5 7.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"
                            fill="transparent"></path>
                        <path
                            d="M3 18.433a4.074 4.074 0 013.432-4.023l.178-.029a15.163 15.163 0 014.78 0l.178.029A4.074 4.074 0 0115 18.433c0 .865-.702 1.567-1.567 1.567H4.567A1.567 1.567 0 013 18.433zM12.5 7.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"
                            stroke="currentColor"
                            strokeWidth="1.5"></path>
                        <path
                            d="M15 11a3.5 3.5 0 100-7m2.39 16h2.043c.865 0 1.567-.702 1.567-1.567a4.074 4.074 0 00-3.432-4.023v0a2.28 2.28 0 00-.359-.029h-.968"
                            stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round"></path>
                    </svg>
                    <div>
                        <div
                            className="text-[#C6C8D7] text-base font-semibold group-hover:text-[#EEF0F7] transition-all duration-200">Careers
                            <div
                                className="inline-block relative rounded-full transition-all duration-200 bg-[#3892FA] bg-brand-default bg-opacity-20 text-[#3892FA] text-brand-default ltr:ml-2 rtl:mr-2 text-xs px-2 py-0.5 font-medium">
                                <div

                                    className="max-w-max flex items-center justify-start"> We're
                                    hiring!
                                </div>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-[#656A83] mt-1 group-hover:text-[#656A83] transition-all duration-200">Join
                            MEE6 and build tools to manage amazing
                            communities worldwide</p></div>
                </a><a

                    href="https://mee6.notion.site/Bug-bounty-program-47c17360a9ce498d8caf37035004cf80"
                    target="_blank"
                    className="flex items-start justify-start gap-3 cursor-pointer group transition-all duration-200">
                    <svg width="24" height="24" viewBox="0 0 24 24"
                         fill="none" xmlns="http://www.w3.org/2000/svg"
                         className="text-[#C6C8D7] group-hover:text-[#EEF0F7] transition-all duration-200 w-5 min-w-[1.25rem]">
                        <path
                            d="M15.875 19.487l.18-.124c.566-.391.849-.587 1.101-.796a7.495 7.495 0 002.603-4.476c.056-.323.086-.664.144-1.346l.03-.353A17.996 17.996 0 0019.906 9l-.036-.349a5.75 5.75 0 00-3.205-4.574 10.642 10.642 0 00-9.328 0A5.75 5.75 0 004.13 8.65l-.036.35a17.993 17.993 0 00-.029 3.391l.03.353c.06.682.089 1.023.145 1.346a7.495 7.495 0 002.603 4.476c.253.21.535.405 1.1.796l.18.124c.769.532 1.153.797 1.538.982a5.41 5.41 0 004.676 0c.385-.185.77-.45 1.537-.982z"
                            fill="transparent" stroke="currentColor"
                            strokeWidth="1.5"></path>
                        <path d="M9.25 11.75l2 2 3.5-3.75"
                              stroke="currentColor" strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"></path>
                    </svg>
                    <div>
                        <div
                            className="text-[#C6C8D7] text-base font-semibold group-hover:text-[#EEF0F7] transition-all duration-200">Bug
                            Bounty Program
                        </div>
                        <p className="text-sm font-medium text-[#656A83] mt-1 group-hover:text-[#656A83] transition-all duration-200">Hack
                            your way through to some nice rewards</p>
                    </div>
                </a><a                                                                      href="mailto:hi@mee6bot.com"
                                                                                            className="flex items-start justify-start gap-3 cursor-pointer group transition-all duration-200">
                    <svg width="24" height="24" viewBox="0 0 24 24"
                         fill="none" xmlns="http://www.w3.org/2000/svg"
                         className="text-[#C6C8D7] group-hover:text-[#EEF0F7] transition-all duration-200 w-5 min-w-[1.25rem]">
                        <path
                            d="M19.45 8.85a1.14 1.14 0 00-1.73.13L15 12.4l-.12-.27 2.54-5.9a1.64 1.64 0 00-.65-2.09 1.34 1.34 0 00-1.87.73l-2.15 5-.4-.2L14 3.17a1.62 1.62 0 00-1-1.95 1.41 1.41 0 00-1.74 1.1L9.49 9.41l-.37.11.59-6.08a1.43 1.43 0 00-1.15-1.61 1.35 1.35 0 00-1.45 1.29l-.85 8.76h-.15l-.26.1-1-3.23a1.32 1.32 0 00-1.64-1l-.17.06a1.56 1.56 0 00-.75 1.93l1.74 5.74a4 4 0 00.13.74 3.38 3.38 0 003 2.67 4.9 4.9 0 002 1.27c2.64.82 5.37-.9 6.11-3.85a.43.43 0 000-.11l4.23-5.42a1.5 1.5 0 00-.05-1.93z"
                            stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"></path>
                        <path
                            d="M18.28 2a3.58 3.58 0 012.31 2.11M19.28 1a2.37 2.37 0 011.6 1.47M3.67 20.07a3.56 3.56 0 01-2.1-2.32M2.57 21a2.39 2.39 0 01-1.45-1.62"
                            stroke="currentColor" strokeMiterlimit="10"
                            strokeLinecap="round"></path>
                    </svg>
                    <div>
                        <div
                            className="text-[#C6C8D7] text-base font-semibold group-hover:text-[#EEF0F7] transition-all duration-200">Contact
                            us
                        </div>
                        <p className="text-sm font-medium text-[#656A83] mt-1 group-hover:text-[#656A83] transition-all duration-200">We are
                            nice and friendly!</p></div>
                </a></ul>
            </div>
        </div>
        <div
            className="col-span-2 h-full w-full relative pt-8 pb-9 ltr:pl-8 rtl:pr-8 z-1">
            <p
                className="text-[#9195AB] text-sm font-medium">Spotlight</p>
            <section className="grid grid-cols-1 gap-6 mt-5"><a
                className="flex items-start justify-start gap-5 group"
                href="/en/tutorials/how-to-start-using-moderation-tools-on-your-discord">
                <figure
                    className="max-w-[176px] min-w-[176px] w-full h-full rounded-lg bg-cover bg-left"
                ></figure>
                <div><p
                    className="text-[#C6C8D7] font-semibold text-base group-hover:text-[#EEF0F7] transition-all duration-200">How
                    to start using Moderation tools on y...</p><p
                    className="text-sm font-medium text-[#656A83] mt-1 group-hover:text-[#9195AB] transition-all duration-200">The
                    MEE6 Moderator plugin is an essential tool for your
                    Discord community. It au...</p>
                    <button
                        className="bg-transparent flex items-center justify-start gap-3 text-[#0561CB] mt-1 group-hover:text-[#327DD6] transition-all duration-200">Read
                        article
                        <svg width="25" height="25" viewBox="0 0 25 25"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg"
                             className="w-3 text-brand-hover group-hover:text-brand-default transition-all duration-200">
                            <path d="M9.5 7l5 5-5 5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"></path>
                        </svg>

                    </button>
                </div>
            </a><a
                className="flex items-start justify-start gap-5 group"
                href="/en/tutorials/how-to-enable-intents-for-your-bot-personalizer">
                <figure
                    className="max-w-[176px] min-w-[176px] w-full h-full rounded-lg bg-cover bg-left"
                ></figure>
                <div><p
                    className="text-[#C6C8D7] font-semibold text-base group-hover:text-[#EEF0F7] transition-all duration-200">How
                    to enable intents for your Custom Bo...</p><p
                    className="text-sm font-medium text-[#656A83]  mt-1 group-hover:text-[#9195AB] transition-all duration-200">The
                    intents are essential to make your Custom Bot
                    perform all MEE6 functions on ...</p>
                    <button
                        className="bg-transparent flex items-center justify-start gap-3 text-[#0561CB] mt-1 group-hover:text-[#327DD6] transition-all duration-200">Read
                        article
                        <svg width="25" height="25" viewBox="0 0 25 25"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg"
                             className="w-3 text-brand-hover group-hover:text-brand-default transition-all duration-200">
                            <path d="M9.5 7l5 5-5 5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"></path>
                        </svg>
                    </button>
                </div>
            </a><a
                className="text-brand-default text-[#327DD6] text-base flex items-center justify-start gap-2"
                href="/en/tutorials">All tutorials
                <svg width="24" height="24" viewBox="0 0 24 24"
                     fill="none" xmlns="http://www.w3.org/2000/svg"
                     className="w-5">
                    <path d="M9.5 7l5 5-5 5" stroke="currentColor"
                          strokeWidth="1.5" strokeLinecap="round"
                          strokeLinejoin="round"></path>
                </svg>

            </a></section>

            <div className="absolute top-0 ltr:left-0 rtl:right-0 w-screen h-full bg-[#17181E] -z-[1] "></div>

        </div>
    </div>
</div>
    );
};


export default DropdownFAQ;