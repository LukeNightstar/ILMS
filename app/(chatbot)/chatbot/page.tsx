"use client";
import React, {useEffect, useRef, useState} from 'react';
import Header from "@/app/(chatbot)/chatbot/_components/header";
import {Bot, ChevronLeft, ChevronRight} from 'lucide-react';


const Chatbot: React.FC = () => {
    const [chatHistory, setChatHistory] = useState<{
        showIcon: boolean;
        text: string;
        sender: 'user' | 'bot';
    }[]>([]);


    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false); // 추가: 로딩 상태를 관리
    const [showAccountButtons, setShowAccountButtons] = useState(false);
    const [showLoginButtons, setShowLoginButtons] = useState(false);
    const [showLectureButtons, setShowLectureButtons] = useState(false);
    const [showEtcButtons, setShowEtcButtons] = useState(false);
    const [showEndButtons, setShowEndButtons] = useState(false);
    const [selectedMainButton, setSelectedMainButton] = useState<string>(''); // 현재 선택된 메인 버튼
    const botResponses: string[] = [];

    const handleButtonClick = (buttonText: string) => {
        // 사용자가 버튼을 클릭한 내용을 대화 기록에 추가
        const userMessage = {text: buttonText, sender: 'user'};
        // @ts-ignore
        setChatHistory([...chatHistory, userMessage]);

        // 추가: 로딩 시작
        setIsLoading(true);

        // 초기화
        setShowAccountButtons(false);
        setShowLoginButtons(false);
        setShowLectureButtons(false);
        setShowEtcButtons(false);
        setShowEndButtons(false);


        // 버튼 클릭에 대한 챗봇 응답 로직
        // 챗봇 응답을 1초 후에 설정
        setTimeout(() => {

            function handleMainButtonClick(buttonText: string, showButtonsCallback: () => void) {
                botResponses.push(`${buttonText} 선택하셨습니다.`);
                botResponses.push('문의 사항을 선택해주세요.');

                setTimeout(showButtonsCallback, 2000); // 예: 2초 후에 버튼을 나타냄
            }

            // '계정', '로그인', '강의', '기타' 중에서 선택한 메인 버튼에 따라 다른 로직 수행
            if (buttonText === '계정') {
                setSelectedMainButton('계정');
                handleMainButtonClick('계정을', () => setShowAccountButtons(true));
            } else if (buttonText === '로그인') {
                setSelectedMainButton('로그인');
                handleMainButtonClick('로그인을', () => setShowLoginButtons(true));
            } else if (buttonText === '강의') {
                setSelectedMainButton('강의');
                handleMainButtonClick('강의', () => setShowLectureButtons(true));
            } else if (buttonText === '기타') {
                setSelectedMainButton('기타');
                handleMainButtonClick('기타를', () => setShowEtcButtons(true));
            }


            function handleAllButtonClick(buttonText: string) {
                const responses: Record<string, string> = {
                    '계정 등록 절차': '어쩌구 저쩌구 설명하기',
                    '새 계정 생성 방법': '이라구라어가미ㅓ이마아다러아 설명',
                    '학번/비밀번호 분실': '설명명명며염움우웅라아러ㅏㅇ멀ㄷ',
                    '개인정보 수정(이메일 등)': '아아라라라라탕타아탕ㅇ타탕탕타앝아탕명',
                    '로그인1': '로ㅁㄴㅇㄻㄴㅇㅁㄹ그인ㅇㅁㄴㄹ설명',
                    '로그인2': '로ㅇㅁㄴㄻㄴㄹ그인2 ㅁㄴㅇㄹ설명',
                    '로그인3': '로ㅁㅇㄴㄻㄴㄹ그인3ㅁㄴㅇㄻㄴㄹ 설명',
                    '로그인4': '로ㄹㄹㄹㄹㄹㄹㄹ그인4 설ㄴㄴㄴ명ㅇㅇㅇㅇㅇㅇㅇㅇ',
                    '강의1': '강ㅁㅇㄹㄴㅁㅇㄻㄴㅇㄹ의1 설ㄹㅇㄴㅁㄹ명',
                    '강의2': '강의ㅁㄴㅇㄻㄴㄹ2 설명ㅁㄴㅇㄹ',
                    '강의3': '강의ㅇㅁㄴㄻㄴㄹㄴㄹ3 설명',
                    '강의4': '강의4 ㅇㄹㄴㅁㄹㄴㅁㄹ설명',
                    '기타1': '기타ㅇㄴㄻㄴㅇㄹ1 설명',
                    '기타2': '기타2ㄴㅁㅇㄹㄴㅁㅇㄹ 설명',
                    '기타3': '기타3 ㅇㄴㄻㄴㅇㄹ설명',
                    '기타4': '기타4ㅁㄴㅇㄻㄴ 설명',
                };


                if (responses[buttonText]) {
                    botResponses.push(responses[buttonText]);
                    setTimeout(() => {
                        setShowEndButtons(true);
                    }, 1000); // 예: 1초 후에 버튼을 나타냄
                }
            }

            // 예시 버튼 텍스트를 사용하여 함수 호출
            handleAllButtonClick(buttonText);

            // 응답을 여러 개의 말풍선으로 분리하여 대화 기록에 추가
            const newChatHistory = [...chatHistory, {text: `${buttonText}`, sender: 'user'}];
            let isFirstResponse = true; // 첫 번째 응답 메시지 여부를 나타내는 변수

            const addBotResponsesWithDelay = () => {
                if (botResponses.length > 0) {
                    const responseText = botResponses.shift() || '';
                    const botResponse = {
                        text: responseText,
                        sender: 'bot',
                        showIcon: isFirstResponse // 첫 번째 응답 메시지에만 아이콘 표시
                    };
                    isFirstResponse = false; // 첫 번째 응답 이후에는 아이콘을 표시하지 않음
                    newChatHistory.push(botResponse);
                    // @ts-ignore
                    setChatHistory([...newChatHistory]);
                    if (botResponses.length > 0) {
                        setTimeout(addBotResponsesWithDelay, 1000); // 다음 응답 추가를 위한 시간차 설정 (1초)
                    } else {
                        // 모든 응답 추가가 완료되면 로딩 감추기
                        setIsLoading(false);
                    }
                }
            };


            // 첫 번째 응답 추가
            addBotResponsesWithDelay();

            // 대화 기록 및 로딩 상태 업데이트
            // @ts-ignore
            setChatHistory(newChatHistory);
            setIsLoading(false);
        }, 1000); // 1초 지연 예시, 필요에 따라 조정
    };


    // 버튼과 대화 기록이 업데이트될 때마다 채팅창 스크롤을 맨 아래로 이동
    useEffect(() => {
        if ((showAccountButtons || showLoginButtons || showLectureButtons || showEtcButtons || showEndButtons) || chatHistory.length > 0) {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }
    }, [showAccountButtons, showLoginButtons, showLectureButtons, showEtcButtons, showEndButtons, chatHistory]);


    const handleScrollLeft = () => {
        const container = document.querySelector('.button-wrapper');
        if (container) {
            container.scrollLeft -= 300; // 스크롤할 양을 조절할 수 있습니다.
        }
    };

    const handleScrollRight = () => {
        const container = document.querySelector('.button-wrapper');
        if (container) {
            container.scrollLeft += 300; // 스크롤할 양을 조절할 수 있습니다.
        }
    };

    const mainButtonOptions = ['계정', '로그인', '강의', '기타'];

    const handleAddQButtonClick = (mainButton: string) => {
        // "추가 질문" 버튼을 숨깁니다.
        setShowEndButtons(false);

        // 해당 메인 버튼에 대한 관련 버튼을 표시합니다.
        setTimeout(() => {
            if (mainButton === '계정') {
                setShowAccountButtons(true);
            } else if (mainButton === '로그인') {
                setShowLoginButtons(true);
            } else if (mainButton === '강의') {
                setShowLectureButtons(true);
            } else if (mainButton === '기타') {
                setShowEtcButtons(true);
            }
        }, 1000); // 1초 뒤에 이전 버튼들을 표시합니다.
    };

    const handleStartButtonClick = (buttonText: string) => {
        // "시작" 버튼을 눌렀을 때 챗봇 대화 초기화 코드를 실행
        setChatHistory([]);
        setIsLoading(false);
        setShowAccountButtons(false);
        setShowLoginButtons(false);
        setShowLectureButtons(false);
        setShowEtcButtons(false);
        setShowEndButtons(false);

    };


    const handleFinishButtonClick = (buttonText: string) => {
        // 버튼을 나타내지 않음
        setShowEndButtons(false);

        // 버튼 문구를 responseText에 설정
        const userMessage = { text: buttonText, sender: 'user' };
        const botResponse = '상담을 종료합니다. 이용해주셔서 감사합니다.';
        const botResponseWithIcon = { text: botResponse, sender: 'bot', showIcon: true };

        // 로딩 시작
        setIsLoading(true);

        // 사용자 메시지를 먼저 추가하고, 1초 뒤에 로딩을 중지하고 '상담을 종료합니다' 메시지를 추가
        const updatedChatHistory = [...chatHistory, userMessage];
        // @ts-ignore
        setChatHistory(updatedChatHistory);

        setTimeout(() => {
            setIsLoading(false);
            // @ts-ignore
            setChatHistory([...updatedChatHistory, botResponseWithIcon]);
        }, 1000);
    };


    return (
        <div className="">
            <div className="flex-col w-[582px] h-[592px] border border-gray-300 p-4 overflow-y-auto"
                 ref={chatContainerRef}>

                <Header/>

                <div className="chat-history  flex items-start gap-3 mt-1.5">
                    <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                        <Bot
                            className="w-[28px] h-[28px] text-current stroke-[1.5] stroke-linecap-[round] stroke-linejoin-[round]"
                        />
                    </div>

                    <div className="flex-col gap-3">
                        <p className="bg-[#F2F2F2] rounded-lg p-2 mb-2" style={{display: 'inline-block'}}>
                            안녕하세요! 어떤 도움이 필요하신가요?
                        </p>
                        <p className="bg-[#F2F2F2] rounded-lg p-2" style={{display: 'table'}}>
                            카테고리를 선택해주세요.
                        </p>
                    </div>
                </div>

                <div className="input-container flex mt-7">
                    <button onClick={() => handleScrollLeft()} className="scroll-button left">
                        <ChevronLeft/>
                    </button>


                    <div className="button-wrapper relative flex w-[500px] overflow-hidden">
                        <div className="button-group flex space-x-3">
                            {['계정', '로그인', '강의', '기타'].map((buttonText, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleButtonClick(buttonText)}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-36 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-70"
                                >
                                    {buttonText}
                                </button>
                            ))}
                        </div>

                    </div>

                    <button onClick={() => handleScrollRight()} className="scroll-button right">
                        <ChevronRight/>
                    </button>
                </div>


                <div className="chat-history flex flex-col space-y-3 mt-7">
                    {chatHistory.map((chat, index) => (
                        <div
                            key={index}
                            className={`flex items-center ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {chat.sender === 'bot' && chat.showIcon && (
                                <div
                                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center p-1 mr-3">
                                    <Bot
                                        className="w-[28px] h-[28px] text-current stroke-[1.5] stroke-linecap-[round] stroke-linejoin-[round]"
                                    />
                                </div>

                            )}
                            {chat.sender === 'bot' && !chat.showIcon &&
                                <div className="w-10 h-10 mr-3"/>} {/* 여백을 만드는 부분 */}
                            <div
                                className={`chat-message p-2 rounded-md ${chat.sender === 'user' ? 'bg-yellow-200 self-end' : 'bg-[#F2F2F2] self-start max-w-[75%] break-words'}`}>
                                {chat.text}
                            </div>


                        </div>


                    ))}
                    {showAccountButtons && (
                        <div
                            className="button-wrapper relative flex-col w-[250px] justify-start self-end overflow-hidden"> {/* self-end 추가 */}
                            <div className="button-group flex-col space-y-3">
                                <button
                                    onClick={() => handleButtonClick('계정 등록 절차')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    계정 등록 절차
                                </button>
                                <button
                                    onClick={() => handleButtonClick('새 계정 생성 방법')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    새 계정 생성 방법
                                </button>
                                <button
                                    onClick={() => handleButtonClick('학번/비밀번호 분실')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    학번/비밀번호 분실
                                </button>
                                <button
                                    onClick={() => handleButtonClick('개인정보 수정(이메일 등)')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    개인정보 수정(이메일 등)
                                </button>
                            </div>
                        </div>


                    )}
                    {showLectureButtons && (
                        <div
                            className="button-wrapper relative flex-col w-[250px] justify-start self-end overflow-hidden"> {/* self-end 추가 */}
                            <div className="button-group flex-col space-y-3">
                                <button
                                    onClick={() => handleButtonClick('강의1')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    강의1
                                </button>
                                <button
                                    onClick={() => handleButtonClick('강의2')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    강의2
                                </button>
                                <button
                                    onClick={() => handleButtonClick('강의3')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    강의3
                                </button>
                                <button
                                    onClick={() => handleButtonClick('강의4')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    강의4
                                </button>
                            </div>
                        </div>
                    )}

                    {showLoginButtons && (
                        <div
                            className="button-wrapper relative flex-col w-[250px] justify-start self-end overflow-hidden"> {/* self-end 추가 */}
                            <div className="button-group flex-col space-y-3">
                                <button
                                    onClick={() => handleButtonClick('로그인1')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    로그인1
                                </button>
                                <button
                                    onClick={() => handleButtonClick('로그인2')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    로그인2
                                </button>
                                <button
                                    onClick={() => handleButtonClick('로그인3')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    로그인3
                                </button>
                                <button
                                    onClick={() => handleButtonClick('로그인4')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    로그인4
                                </button>
                            </div>
                        </div>
                    )}
                    {showEtcButtons && (
                        <div
                            className="button-wrapper relative flex-col w-[250px] justify-start self-end overflow-hidden"> {/* self-end 추가 */}
                            <div className="button-group flex-col space-y-3">
                                <button
                                    onClick={() => handleButtonClick('기타1')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    기타1
                                </button>
                                <button
                                    onClick={() => handleButtonClick('기타2')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    기타2
                                </button>
                                <button
                                    onClick={() => handleButtonClick('기타3')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    기타3
                                </button>
                                <button
                                    onClick={() => handleButtonClick('기타4')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    기타4
                                </button>
                            </div>
                        </div>
                    )}
                    {showEndButtons && (
                        <div
                            className="button-wrapper relative flex-col w-[250px] justify-start self-end overflow-hidden"> {/* self-end 추가 */}
                            <div className="button-group flex-col space-y-3">

                                <button
                                    onClick={() => handleAddQButtonClick(selectedMainButton)} // Reusing handleButtonClick
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-70"
                                >
                                    추가 질문
                                </button>


                                <button
                                    onClick={() => handleStartButtonClick('처음으로 돌아가기')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    처음으로 돌아가기
                                </button>

                                <button
                                    onClick={() => handleFinishButtonClick('상담 종료')}
                                    className="text-[#5966FF] font-bold border border-[#5966FF] w-full p-2 h-12 rounded-full transition duration-300 hover:bg-[#5966FF] hover:text-white hover:opacity-80"
                                >
                                    상담 종료
                                </button>
                            </div>
                        </div>
                    )}


                    {isLoading && (
                        <div className="flex items-center justify-start">
                            <div
                                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center p-1 mr-3">
                                ...
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chatbot;