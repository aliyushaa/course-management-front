import {useContext, useState} from "react"
import {observer} from "mobx-react-lite";
import StudentSidebar from "./StudentSidebar";
import {Context} from "../../index";
import AdminSidebar from "./AdminSidebar";
import {UserRoles} from "../../types/auth.types";

export default observer(function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const context = useContext(Context)

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    if (!context.store.isAuth) return <></>
    if (context.store.user.roles.includes(UserRoles.ADMIN)) return <AdminSidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
    else return <StudentSidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
})
