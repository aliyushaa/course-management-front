import React from 'react';
import {MdDashboard} from "react-icons/md";
import {ROUTES} from "../../config/pages-url.config";
import {FaGraduationCap} from "react-icons/fa6";
import {FaUser} from "react-icons/fa";
import SidebarElement from "./SidebarElement";

interface AdminSidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({isOpen, toggleSidebar}) => {
    return (
        <div className="flex">
            <div
                className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-60 transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4" style={{marginTop: 70, fontSize: 18}}>
                    <ul>
                        <SidebarElement clickAction={toggleSidebar} route={'#'} value={'Dashboard'}
                                        icon={<MdDashboard className="mr-2 size-8"/>}/>

                        <SidebarElement clickAction={toggleSidebar} route={ROUTES.COURSE_MANAGEMENT} value={'All courses'}
                                        icon={<FaGraduationCap className="mr-2 size-8"/>}/>

                        <SidebarElement clickAction={toggleSidebar} route={'#'} value={'Users'}
                                        icon={<FaUser className="mr-2 size-8"/>}/>
                    </ul>
                </div>
            </div>

            <button onClick={toggleSidebar} className="fixed top-0 left-0 m-4 text-white focus:outline-none z-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/>
                    )}
                </svg>
            </button>
        </div>
    )
};

export default AdminSidebar;
