import React, {useContext} from 'react'
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

export default observer(function Navbar() {
    const context = useContext(Context)
    const navigate = useNavigate()

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

                    {context.store.isAuth
                        ? <Link to={ROUTES.HOME} onClick={logout} className='text-white hover:text-gray-400'>Log
                            out</Link>
                        : <Link className='text-white hover:text-gray-400' to={ROUTES.LOGIN}>Log in</Link>
                    }
                </div>
            </nav>
        )
})
