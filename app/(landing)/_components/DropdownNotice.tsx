import React from 'react';

const DropdownNotice = () => {
    return (
        <div
            className="bg-[#1F2129] w-screen absolute left-0 top-[calc(100%+1px)] z-10 shadow-lg">
            <div className="px-10 mx-auto max-w-[1240px] grid grid-cols-5">

                <div
                    className=" w-full h-full col-span-3 pt-8 pb-9 pr-8 grid grid-cols-2 gap-8">
                    <div>
                        <ul className="text-gray-700 grid grid-cols-1 gap-6 mt-5 pl-2">
                            <a href="/en/plugins/management"
                               className="flex items-start justify-start gap-3 cursor-pointer group transition-all duration-200">
                                <svg width="24" height="24" viewBox="0 0 18 19"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="text-[#C6C8D7] group-hover:text-[#EEF0F7] transition-all duration-200 w-5 min-w-[1.25rem]">
                                    <path
                                        d="M8.727 18.065a.974.974 0 01-.429-.1C-.349 13.502.432 3.505.445 3.405a.958.958 0 01.693-.832L8.475.58a.818.818 0 01.492 0l7.336 1.992c.391.1.681.453.694.87.012.403.353 10.046-7.829 14.496a.932.932 0 01-.454.114l.013.012zM2.297 4.211c-.012 2.068.442 8.446 6.405 11.825 5.56-3.328 6.303-9.732 6.391-11.825L8.714 2.484l-6.416 1.74V4.21z"
                                        fill="currentColor"></path>
                                    <path
                                        d="M8.588 4.388L4.063 5.61c.176 2.13 1.008 5.875 4.488 8.257l.037-9.48z"
                                        fill="currentColor"></path>
                                </svg>
                                <div>
                                    <div
                                        className="text-[#C6C8D7] text-base font-semibold group-hover:text-[#EEF0F7] transition-all duration-200">Moderation &amp; Server
                                        Management
                                    </div>
                                    <p className="text-sm font-medium text-[#656A83] mt-1 group-hover:text-[#9195AB] transition-all duration-200">Welcome
                                        Plugin, Custom Commands, Reaction Roles,
                                        Moderator...</p></div>
                            </a><a href="/en/plugins/utilities"
                                   className="flex items-start justify-start gap-3 cursor-pointer group transition-all duration-200">
                            <svg width="24" height="24" viewBox="0 0 20 22"
                                 fill="none" xmlns="http://www.w3.org/2000/svg"
                                 className="text-[#C6C8D7] group-hover:text-[#EEF0F7] transition-all duration-200 w-5 min-w-[1.25rem]">
                                <path
                                    d="M9.666 1h.646a3.79 3.79 0 011.068.145c.34.098.647.243.907.426s.466.4.607.64c.14.24.213.496.213.756v1.051H6.893v-1.05c0-.523.292-1.023.812-1.392S8.931 1 9.666 1v0z"
                                    stroke="currentColor" stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path
                                    d="M10 21c4.97 0 9-3.914 9-8.742 0-4.829-4.03-8.743-9-8.743S1 7.43 1 12.258C1 17.086 5.03 21 10 21z"
                                    stroke="currentColor" stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path
                                    d="M10.135 11l-.135.06-3.78-3.4 2.423 4.406a1.607 1.607 0 00-.083.503c0 .305.094.603.268.857.175.253.423.45.713.566.29.117.61.146.917.086a1.6 1.6 0 00.811-.424c.221-.216.371-.491.431-.79.06-.3.027-.61-.094-.89a1.55 1.55 0 00-.588-.69 1.618 1.618 0 00-.883-.254V11z"
                                    stroke="currentColor" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </svg>
                            <div>
                                <div
                                    className="text-[#C6C8D7] text-base font-semibold group-hover:text-[#EEF0F7] transition-all duration-200">Utilities
                                </div>
                                <p className="text-sm font-medium text-[#656A83] mt-1 group-hover:text-[#9195AB] transition-all duration-200">Embeds,
                                    Search anything, Record, Timers, Statistics,
                                    Temporary channels...</p></div>
                        </a><a href="/en/plugins/social-connectors"
                               className="flex items-start justify-start gap-3 cursor-pointer group transition-all duration-200">
                            <svg width="24" height="24" viewBox="0 0 18 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="text-[#C6C8D7] group-hover:text-[#EEF0F7] transition-all duration-200 w-5 min-w-[1.25rem]">
                                <path
                                    d="M9 1v1.005M6.01 15.903c1.987.224 3.993.224 5.98 0a3.451 3.451 0 01-.09.574l-.082.334a2.867 2.867 0 01-2.114 2.106c-.463.11-.945.11-1.408 0a2.867 2.867 0 01-2.114-2.106l-.082-.334a3.453 3.453 0 01-.09-.574zm-2.982-9.27a6.303 6.303 0 014.13-4.33c1.235-.4 2.577-.402 3.81.005a6.145 6.145 0 014.011 4.28l.584 2.223.467 2.117c.144.651.34 1.322.443 1.981a2.239 2.239 0 01-1.76 2.548l-.368.075a26.772 26.772 0 01-10.69 0l-.367-.075a2.239 2.239 0 01-1.76-2.548c.102-.66.298-1.33.442-1.982l.468-2.116.59-2.178z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                            </svg>
                            <div>
                                <div
                                    className="text-[#C6C8D7] text-base font-semibold group-hover:text-[#EEF0F7] transition-all duration-200">Social
                                    Alerts
                                </div>
                                <p className="text-sm font-medium text-[#656A83] mt-1 group-hover:text-[#9195AB] transition-all duration-200">Twitch,
                                    Twitter, YouTube, RSS, Reddit, and Instagram
                                    alerts for your server</p>
                            </div>
                        </a><a href="/en/plugins/engagement-and-fun"
                               className="flex items-start justify-start gap-3 cursor-pointer group transition-all duration-200">
                            <svg width="24" height="24" viewBox="0 0 18 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="text-[#C6C8D7] group-hover:text-[#EEF0F7] transition-all duration-200 w-5 min-w-[1.25rem]">
                                <path
                                    d="M13.2 5.008H4.631C2.626 5.008 1 6.65 1 8.678v6.65c0 2.027 1.626 3.67 3.631 3.67h8.57c2.005 0 3.63-1.643 3.63-3.67v-6.65c0-2.027-1.625-3.67-3.63-3.67z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path d="M9.905 5.008H7.926v13.99h1.98V5.008z" fill="currentColor"></path>
                                <path d="M17 12.998v-2H1.168v2H17z" fill="currentColor"></path>
                                <path
                                    d="M8.866 4.298s-1.652.69-2.622-.13-1.375-1.98-.89-2.68c.485-.7 1.652-.64 2.632.14.98.78.88 2.67.88 2.67zM9.104 4.298s1.652.64 2.622-.13 1.375-2 .9-2.68c-.474-.68-1.652-.64-2.632.14-.98.78-.89 2.67-.89 2.67z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </svg>
                            <div>
                                <div
                                    className="text-[#C6C8D7] text-base font-semibold group-hover:text-[#EEF0F7] transition-all duration-200">Games &amp; Fun
                                </div>
                                <p className="text-sm font-medium text-[#656A83] mt-1 group-hover:text-[#9195AB] transition-all duration-200">Levels,
                                    Birthdays, Giveaways, Music Quiz and
                                    Economy</p></div>
                        </a></ul>
                    </div>
                    <div>
                        <ul className="grid grid-cols-1 gap-6 mt-5 pl-2"><a
                            href="/en/custom-bot"
                            className="flex items-start justify-start gap-3 cursor-pointer group transition-all duration-200">
                            <svg width="24" height="24" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="text-[#C6C8D7] group-hover:text-[#EEF0F7] transition-all duration-200 w-5 min-w-[1.25rem]">
                                <path d="M10 18.5a8.5 8.5 0 100-17 8.5 8.5 0 000 17z" stroke="currentColor"
                                      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path
                                    d="M7.5 8.2a1 1 0 11-2 0 1 1 0 012 0zM14.5 8.2a1 1 0 11-2 0 1 1 0 012 0zM7.65 13.49h0l-.002-.007a2.27 2.27 0 01-.148-.82h0v-.003a.5.5 0 01.5-.5h4a.5.5 0 01.5.498 2.5 2.5 0 01-4.85.831z"
                                    fill="currentColor" stroke="currentColor"></path>
                            </svg>

                            <div>
                                <div
                                    className="text-[#C6C8D7] text-base font-semibold group-hover:text-[#EEF0F7] transition-all duration-200">Bot
                                    Personalizer
                                </div>
                                <p className="text-sm font-medium text-[#656A83] mt-1 group-hover:text-[#9195AB] transition-all duration-200">Customize
                                    your bot by changing its avatar, name,
                                    AI-based backstory and activity</p>
                            </div>
                        </a><a href="/en/premium"
                               className="flex items-start justify-start gap-3 cursor-pointer group transition-all duration-200">
                            <svg width="21" height="20" viewBox="0 0 20 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="text-[#C6C8D7] group-hover:text-[#EEF0F7] transition-all duration-200 w-5 min-w-[1.25rem]">
                                <path
                                    d="M4.225 8.076a3.388 3.388 0 01-2.161-.848A3.01 3.01 0 011.056 5.24C.685 2.161 2.143 1.861 4 3M15.776 8.076a3.388 3.388 0 002.16-.848 3.01 3.01 0 001.009-1.987C19.316 2.161 17.858 1.861 16 3M13.713 15.063h-2.188V12H8.32v3.063H6.246a1.391 1.391 0 00-.907.383c-.233.23-.354 1.746-.337 2.054h9.997a1.042 1.042 0 00-.08-.456c-.06-.146-.153-1.497-.273-1.61a1.327 1.327 0 00-.424-.269 1.462 1.462 0 00-.51-.101z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path
                                    d="M5.478 1H14.5c.398 0 .78.147 1.06.408.282.261.44.616.44.985v4.044c0 .732-.155 1.457-.458 2.134a5.557 5.557 0 01-1.304 1.807 6.042 6.042 0 01-1.95 1.204 6.39 6.39 0 01-2.3.418v0c-1.587 0-3.11-.586-4.234-1.63C4.631 9.328 4 7.913 4 6.438V2.393c0-.366.155-.717.431-.978.277-.26.653-.41 1.047-.415z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </svg>
                            <div>
                                <div
                                    className="text-[#C6C8D7] text-base font-semibold group-hover:text-[#EEF0F7] transition-all duration-200">Premium
                                    Subscription
                                </div>
                                <p className="text-sm font-medium text-[#656A83] mt-1 group-hover:text-[#9195AB] transition-all duration-200">Upgrade
                                    to Premium and unlock all features of MEE6
                                    on your server</p></div>
                        </a><a href="/en/ai"
                               className="flex items-start justify-start gap-3 cursor-pointer group transition-all duration-200">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="text-[#C6C8D7] group-hover:text-[#EEF0F7] transition-all duration-200 w-5 min-w-[1.25rem]">
                                <path
                                    d="M3.316 8.324a6.72 6.72 0 015.008-5.008 11.948 11.948 0 015.457 0 6.72 6.72 0 015.008 5.008 11.947 11.947 0 010 5.457 6.72 6.72 0 01-5.008 5.008 11.947 11.947 0 01-5.457 0 6.72 6.72 0 01-5.008-5.008 11.948 11.948 0 010-5.457z"
                                    fill="transparent"></path>
                                <path
                                    d="M3.316 13.781l.73-.171-.73.171zm0-5.457l.73.171-.73-.171zm15.473 0l.73-.171-.73.171zm0 5.457l.73.171-.73-.171zm-5.008 5.008l-.171-.73.171.73zm-5.457 0l-.171.73.171-.73zm0-15.473l-.171-.73.171.73zm5.457 0l.171-.73-.171.73zM20.47 21.53a.75.75 0 101.06-1.06l-1.06 1.06zM4.046 13.61a11.198 11.198 0 010-5.115l-1.46-.342a12.698 12.698 0 000 5.8l1.46-.343zm14.013-5.115a11.196 11.196 0 010 5.115l1.46.342a12.698 12.698 0 000-5.8l-1.46.343zm-4.45 9.564a11.196 11.196 0 01-5.114 0l-.342 1.46c1.907.448 3.892.448 5.8 0l-.343-1.46zM8.496 4.046a11.198 11.198 0 015.115 0l.342-1.46a12.698 12.698 0 00-5.8 0l.343 1.46zm0 14.013a5.97 5.97 0 01-4.45-4.45l-1.46.343a7.47 7.47 0 005.568 5.568l.342-1.46zm5.457 1.46a7.47 7.47 0 005.568-5.567l-1.46-.342a5.97 5.97 0 01-4.45 4.45l.342 1.46zM13.61 4.046a5.97 5.97 0 014.45 4.45l1.46-.343a7.47 7.47 0 00-5.568-5.567l-.342 1.46zm-5.457-1.46a7.47 7.47 0 00-5.567 5.567l1.46.342a5.97 5.97 0 014.45-4.45l-.343-1.46zm8.652 15.28l3.665 3.664 1.06-1.06-3.665-3.665-1.06 1.06z"
                                    fill="currentColor"></path>
                            </svg>
                            <div>
                                <div
                                    className="text-[#C6C8D7] text-base font-semibold group-hover:text-[#EEF0F7] transition-all duration-200">MEE6
                                    AI
                                </div>
                                <p className="text-sm font-medium text-[#656A83] mt-1 group-hover:text-[#9195AB] transition-all duration-200">Utilize
                                    the power of ChatGPT and Dall-E with your
                                    new creative assistant</p></div>
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
                            className="max-w-[176px] min-w-[176px] w-full h-full rounded-lg bg-cover bg-left">

                        </figure>
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

export default DropdownNotice;
