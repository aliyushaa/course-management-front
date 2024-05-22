import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {ICourseResponse} from "../../types/course.types";
import {courseService} from "../../services/course.service";
import Course from "../../components/course/Course";
import {Modal} from "../../components/Modal";
import {CreateCourse} from "../../components/course/CreateCourse";
import {AddStudentForm} from "../../components/course/AddStudentForm";
import {UpdateCourseForm} from "../../components/course/UpdateCourseForm";

async function deleteHandler(courseId: number) {
    try {
        const response = courseService.delete(courseId)
    } catch (e) {
        console.log(e)
    }
}

export default observer(function CourseManagementPage() {
    const [courses, setCourses] = useState<ICourseResponse[]>([])
    const [modal, setModal] = useState(false)
    const [addStudentModal, setAddStudentModal] = useState(false)
    const [updateCourseModal, setUpdateCourseModal] = useState(false)
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

    const openAddStudentModal = (courseId: number) => {
        setSelectedCourseId(courseId);
        setAddStudentModal(true);
    }

    const closeAddStudentModal = () => {
        setSelectedCourseId(null);
        setAddStudentModal(false);
    }

    const openUpdateCourseModal = (courseId: number) => {
        setSelectedCourseId(courseId);
        setUpdateCourseModal(true);
    }

    const closeUpdateCourseModal = () => {
        setSelectedCourseId(null);
        setUpdateCourseModal(false);
    }

    useEffect(() => {
        async function fetchCourses() {
            try {
                const courseData = await courseService.getAll();
                setCourses(courseData)
            } catch (e) {
                console.log(e)
            }
        }

        fetchCourses()
    }, [])


    return (
        <div className="h-auto mt-20 px-52">
            <h1 className="font-bold text-center text-3xl">All courses</h1>
            <button onClick={() => setModal(true)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4">
                Create Course
            </button>

            {modal &&
                <Modal title="Create new course" onClose={() => setModal(false)}>
                    <CreateCourse onClose={() => setModal(false)}/>
                </Modal>}

            {(selectedCourseId !== null && addStudentModal) &&
                <Modal title="Add new student" onClose={closeAddStudentModal}>
                    <AddStudentForm courseId={selectedCourseId} onClose={closeAddStudentModal}/>
                </Modal>
            }

            {(selectedCourseId !== null && updateCourseModal) &&
                <Modal title="Update course" onClose={closeUpdateCourseModal}>
                    <UpdateCourseForm courseId={selectedCourseId}
                                      course={courses.find(course => course.id == selectedCourseId)!}
                                      onClose={closeUpdateCourseModal}/>
                </Modal>
            }

            <div className="mb-20">
                {courses.map(course =>
                    <>
                        <Course
                            key={course.id}
                            course={course}
                            editMode={true}
                            deleteHandler={deleteHandler}
                            addUserModal={() => openAddStudentModal(course.id)}
                            updateCourseModal={() => openUpdateCourseModal(course.id)}
                        />
                    </>)}
            </div>

        </div>
    )
})
