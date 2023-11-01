import {NavbarRoutes} from "@/components/navbar-routes";
import MobileSidebar from "@/app/(dashboard)/_components/mobile-sidebar";

//bg-grey-630 flex items-center h-[80px] px-6 lg:px-10 sticky z-30 top-0 right-0 undefined

const Navbar = async () => {
    return (
        <div className="bg-white flex items-center h-[80px] px-6 border-b shadow-sm">
            <MobileSidebar/>
            <NavbarRoutes/>
        </div>
    );
}

export default Navbar;
