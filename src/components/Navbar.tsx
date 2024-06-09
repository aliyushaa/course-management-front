import React, {useContext, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../config/pages-url.config";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {authService} from "../services/auth.service";
import {IUser, UserRoles} from "../types/auth.types";
import {containsRole} from "../App";
import AdminNavbar from "./AdminNavbar";
import TeacherNavbar from "./TeacherNavbar";
import StudentNavbar from "./StudentNavbar";
import Cookies from "js-cookie";
import {EnumTokens} from "../services/auth-token.services";
import {FaChevronDown} from "react-icons/fa";

export default observer(function Navbar() {
    const context = useContext(Context)
    const navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    async function logout() {
        await authService.logout()
        context.store.setAuth(false)
        context.store.setUser({} as IUser)
        Cookies.remove('user');
        navigate(ROUTES.HOME)
    }

    if (containsRole(UserRoles.ADMIN)) {
        return <AdminNavbar logout={logout}/>
    } else if (containsRole(UserRoles.TEACHER)) {
        return <TeacherNavbar logout={logout}/>
    } else if (containsRole(UserRoles.STUDENT)) {
        return <StudentNavbar logout={logout}/>
    } else
        return (
            <nav className="bg-blue-600 py-4 fixed top-0 w-screen z-10">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to={ROUTES.HOME}>
                            <span className="text-white text-xl font-bold hover:text-gray-400">Diploma project</span>
                        </Link>
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
})
