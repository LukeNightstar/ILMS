import {Menu} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import Sidebar from "@/app/(dashboard)/_components/sidebar";

// 모바일 UI 구현
const MobileSidebar = () => {

    return (
        <Sheet>
            <SheetTrigger className="lg:hidden hover:opacity-75 transition">
                <Menu className="mr-4"/>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[300px]">
                <Sidebar/>
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar;