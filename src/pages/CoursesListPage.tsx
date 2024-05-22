import React, {useEffect, useState} from 'react';
import {courseService} from "../services/course.service";
import {ICourseResponse} from "../types/course.types";
import Course from "../components/course/Course";
import {observer} from "mobx-react-lite";
import {getUser} from "../services/auth-token.services";

export default observer(function CoursesListPage() {
    const [courses, setCourses] = useState<ICourseResponse[]>([])

    useEffect(() => {
        async function fetchCourses(ids: number[]) {
            try {
                const courseData = await courseService.getByIds(ids);
                setCourses(courseData)
            } catch (e) {
                console.log(e)
            }
        }

        const user = getUser();
        if (user!.courseIds.length != 0) {
            fetchCourses(user!.courseIds)
        }
    }, [])


    return (
        <div className="h-screen mt-20 px-52">
            {courses.length > 0 && <h1 className="font-bold text-center text-3xl">My courses</h1>}
            {courses.map(course => <Course key={course.id} course={course} editMode={false}/>)}

            {courses.length == 0 &&
                <div className="flex justify-center items-center h-2/3">
                    <div className="text-2xl">Courses not found</div>
                </div>}
        </div>
    )
})
