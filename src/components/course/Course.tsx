import {ICourseResponse} from "../../types/course.types";
import {format} from "date-fns"
import {Link} from "react-router-dom";
import {ROUTES} from "../../config/pages-url.config";
import {FaPencil} from "react-icons/fa6";
import {FaTrash} from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";

interface CourseProps {
    course: ICourseResponse
    editMode: boolean
    deleteHandler?: (id: number) => void
    addUserModal?: () => void
    updateCourseModal?: () => void
}

export default function Course({course, editMode, deleteHandler, addUserModal, updateCourseModal}: CourseProps) {
    return (
        <Link to={ROUTES.COURSE_PAGE + "/" + course.id}>
            <div className="mt-10 p-2 rounded border-2 border-gray-800">
                <div className="flex">
                    <div className="flex-1">
                        <h1 className="text-2xl">{course.title ? course.title.toLocaleUpperCase() : "unknown course"}</h1>
                        <p>{course.instructor ? course.instructor.name : "unknown description"}</p>
                    </div>
                    <div className="flex items-center justify-center">
                        {editMode &&
                            <>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    addUserModal && addUserModal()
                                }} className='p-4 rounded hover:bg-gray-300'>
                                    <FaUserPlus className ="size-5"/>
                                </button>
                                <button onClick = {(e) => {
                                    e.preventDefault()
                                    updateCourseModal && updateCourseModal()
                                }} className='p-4 rounded hover:bg-gray-300'>
                                    <FaPencil/>
                                </button>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    deleteHandler && deleteHandler(course.id)
                                    window.location.reload()
                                }}
                                        className='mr-1 p-4 rounded text-red-600 hover:text-white hover:bg-red-600'>
                                    <FaTrash/>
                                </button>
                            </>
                        }
                        <p className="text-gray-500">Start date: {course.createDate
                            ? format(new Date(course.createDate), "dd.MM.yyyy")
                            : "unknown date"}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}