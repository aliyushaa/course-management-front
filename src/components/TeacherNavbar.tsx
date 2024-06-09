import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {ROUTES} from "../config/pages-url.config";
import SidebarElement from "./sidebars/SidebarElement";
import {FaGraduationCap} from "react-icons/fa6";
import {Context} from "../index";
import { observer } from 'mobx-react-lite';
import {FaChevronDown, FaTrophy} from "react-icons/fa";

interface AdminNavbarProps {
    logout: () => void;
}


const TeacherNavbar: React.FC<AdminNavbarProps> = ({logout}) => {
    const context = useContext(Context)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    return (
        <nav className="bg-blue-600 py-4 fixed top-0 w-screen z-10">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Link to={ROUTES.HOME}>
                        <span className="text-white text-xl font-bold hover:text-gray-400">Diploma project</span>
                    </Link>
                    <SidebarElement route={ROUTES.COURSE_MANAGEMENT} value={'All courses'}
                                    icon={<FaGraduationCap className="ml-10 mr-2 size-5"/>}/>
                    <SidebarElement route={ROUTES.TOP} value={'Top students'}
                                    icon={<FaTrophy className="ml-6 mr-2 size-5"/>}/>
                </div>

                {context.store.isAuth ? (
                    <div className="relative">
                        <button onClick={toggleDropdown} className="text-white flex items-center hover:text-gray-400 focus:outline-none">
                            <span>Menu</span>
                            <FaChevronDown className="ml-2" />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-20">
                                <Link to={ROUTES.PROFILE} onClick={toggleDropdown} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Profile</Link>
                                <button onClick={logout} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">Log out</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link className='text-white hover:text-gray-400' to={ROUTES.LOGIN}>Log in</Link>
                )}
            </div>
        </nav>
    )
};

export default observer(TeacherNavbar);
