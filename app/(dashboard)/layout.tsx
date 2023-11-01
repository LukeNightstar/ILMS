// Dashboard Layout
import Navbar from "@/app/(dashboard)/_components/navbar";
import Sidebar from "@/app/(dashboard)/_components/sidebar";
import {ConfettiProvider} from "@/components/providers/confetti-provider";

const DashboardLayout = ({
                             children
                         }: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex grow h-screen w-screen top-0 z-0 fixed">

            {/*전체 화면 세팅 - 사이드바와 메인 분리*/}
            <div className="min-w-[300px] transform -translate-x-full absolute lg:!translate-x-0 left-0 top-0
            lg:relative h-screen
            ">
                {/*사이드바*/}
                <div className="h-full md:flex md:w-[300px] md:flex-col md:fixed md:inset-y-0">
                    <Sidebar/>
                </div>
            </div>

            {/*class="!overflow-hidden max-w-screen max-w-full lg:max-w-[calc(100vw-300px)] flex flex-col grow relative"*/}
            {/*메인영역*/}
            <div
                className="flex flex-col overflow-hidden bg-white max-w-screen max-w-full lg:max-w-[calc(100vw-300px)] grow relative">
                <div>
                    <Navbar/>
                </div>

                <div
                    className="flex flex-col overflow-y-auto bg-white max-w-screen max-w-full p-10 lg:max-w-[calc(100vw-300px)] grow">
                    <ConfettiProvider/>
                    {children}
                </div>
            </div>

        </div>
    );
}

export default DashboardLayout;