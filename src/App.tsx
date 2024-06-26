import React, {useContext, useEffect} from 'react'
import Navbar from "./components/Navbar"
import {Route, Routes, useNavigate} from 'react-router-dom'
import MainPage from "./pages/MainPage"
import {ROUTES} from "./config/pages-url.config"
import SettingPage from "./pages/SettingPage"
import NotFoundPage from "./pages/NotFoundPage"
import LoginPage from "./pages/LoginPage"
import CoursesListPage from "./pages/CoursesListPage"
import CoursePage from "./pages/CoursePage"
import {getAccessToken, getUser} from "./services/auth-token.services"
import {Context} from "./index"
import {observer} from "mobx-react-lite"
import CourseManagementPage from "./pages/admin/CourseManagementPage"
import {UserRoles} from "./types/auth.types"
import UserManagementPage from "./pages/admin/UserManagementPage"
import {SubmissionsPage} from "./pages/SubmissionsPage"
import UserTopPage from "./pages/UserTopPage"
import ShopPage from "./pages/ShopPage"
import ProfilePage from "./pages/ProfilePage"

const unsecuredRoutes = [ROUTES.HOME, ROUTES.LOGIN]
const adminRoutes = [ROUTES.COURSE_MANAGEMENT, ROUTES.USER_MANAGEMENT]
const moderatorRoutes = [ROUTES.COURSE_MANAGEMENT, ROUTES.USER_MANAGEMENT]
const teacherRoutes = [ROUTES.COURSE_MANAGEMENT]

function isAuthenticated() {
    const user = getUser()
    const token = getAccessToken()
    return user && token
}

export function containsRole(role: string) {
    const user = getUser()
    return user?.roles.includes(role)
}

export default observer(function App() {
    const {store} = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        const user = getUser()
        const token = getAccessToken()
        if (user && token) {
            store.setAuth(true)
            store.setUser(user)
        }

        const currentPath = window.location.pathname
        if (!unsecuredRoutes.includes(currentPath) && !isAuthenticated()) {
            navigate(ROUTES.LOGIN);
        }

        if (teacherRoutes.includes(currentPath)) {
            if (containsRole(UserRoles.ADMIN) || containsRole(UserRoles.MODERATOR)) return
            else if (!containsRole(UserRoles.TEACHER)) navigate(ROUTES.NOT_FOUND)
        }
        if (moderatorRoutes.includes(currentPath)) {
            if (containsRole(UserRoles.TEACHER) && teacherRoutes.includes(currentPath)) return
            else if (containsRole(UserRoles.ADMIN)) return
            else if (!containsRole(UserRoles.MODERATOR)) navigate(ROUTES.NOT_FOUND)
        }
        if (adminRoutes.includes(currentPath)) {
            if (teacherRoutes.includes(currentPath) && containsRole(UserRoles.TEACHER)) return
            else if (moderatorRoutes.includes(currentPath) && containsRole(UserRoles.MODERATOR)) return
            else if (!containsRole(UserRoles.ADMIN)) navigate(ROUTES.NOT_FOUND);
        }
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-grow">
                <Routes>
                    <Route path={ROUTES.HOME} element={<MainPage/>}/>
                    <Route path={ROUTES.TOP} element={<UserTopPage/>}/>
                    <Route path={ROUTES.SETTINGS} element={<SettingPage/>}/>
                    <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
                    <Route path={ROUTES.COURSE_LIST} element={<CoursesListPage/>}/>
                    <Route path={ROUTES.COURSE_PAGE_WITH_PARAM} element={<CoursePage/>}/>
                    <Route path={ROUTES.SUBMISSIONS_PAGE + '/:boxId'} element={<SubmissionsPage/>}/>
                    <Route path={ROUTES.SHOP_PAGE} element={<ShopPage/>}/>
                    <Route path={ROUTES.PROFILE} element={<ProfilePage/>}/>

                    <Route path={ROUTES.COURSE_MANAGEMENT} element={<CourseManagementPage/>}/>
                    <Route path={ROUTES.USER_MANAGEMENT} element={<UserManagementPage/>}/>

                    <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                </Routes>
            </main>
        </div>
    )
})