import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {ROUTES} from "../config/pages-url.config";
import SidebarElement from "./sidebars/SidebarElement";
import {FaGraduationCap} from "react-icons/fa6";
import {Context} from "../index";
import { observer } from 'mobx-react-lite';

interface AdminNavbarProps {
    logout: () => void;
}


const TeacherNavbar: React.FC<AdminNavbarProps> = ({logout}) => {
    const context = useContext(Context)
    return (
        <nav className="bg-gray-800 py-4 fixed top-0 w-screen z-10">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Link to={ROUTES.HOME}>
                        <span className="text-white text-xl font-bold hover:text-gray-400">Diploma project</span>
                    </Link>
                    <SidebarElement route={ROUTES.COURSE_MANAGEMENT} value={'All courses'}
                                    icon={<FaGraduationCap className="ml-10 mr-2 size-5"/>}/>
                </div>

                {context.store.isAuth
                    ? <Link to={ROUTES.HOME} onClick={logout} className='text-white hover:text-gray-400'>Log out</Link>
                    : <Link className='text-white hover:text-gray-400' to={ROUTES.LOGIN}>Log in</Link>
                }
            </div>
        </nav>
    )
};

export default observer(TeacherNavbar);
