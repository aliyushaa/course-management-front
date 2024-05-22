import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ICourseResponse} from "../types/course.types";
import {courseService} from "../services/course.service";
import {CreateModuleForm} from "../components/module/CreateModuleForm";
import {containsRole} from "../App";
import {Modal} from "../components/Modal";

export default function CoursePage() {
    const [course, setCourse] = useState<ICourseResponse | null>(null)
    const [found, setFound] = useState(false)
    const [createModuleModal, setCreateModuleModal] = useState(false)

    const params = useParams<{ courseId: string }>()

    useEffect(() => {
        async function fetchCourse() {
            try {
                if (params.courseId !== undefined) {
                    const course = await courseService.get(parseInt(params.courseId))

                    setCourse(course)
                    setFound(true)
                }
            } catch (e) {
                setFound(false)
                console.log(e)
            }
        }

        fetchCourse()
    }, [])

    return (
        <div className="container h-full mt-20 px-52">
            {!found ? (
                <p className="text-red-600 text-lg">Course not found!</p>
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-4">{course?.title}</h1>
                    <p className="text-gray-600 mb-6">{course?.description}</p>
                    <hr/>

                    {containsRole('ADMIN') && (
                        <>
                            <button onClick={() => setCreateModuleModal(true)}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4">
                                Create module
                            </button>

                            {createModuleModal &&
                                <Modal title="Create module" onClose={() => setCreateModuleModal(false)}>
                                    <CreateModuleForm
                                        courseId={course!.id}
                                        onClose={() => setCreateModuleModal(false)}
                                    />
                                </Modal>
                            }
                        </>
                    )}

                    <div>
                        {course?.modules.map(module => (
                            <div key={module.id} className="mb-8 bg-white shadow-md p-4 rounded-md">
                                <h2 className="text-lg font-semibold mb-4">{module.title}</h2>
                                <ul className="list-disc ml-6">
                                    {module.attachments.map(attachment => (
                                        <li key={attachment.id} className="mb-2">
                                            {attachment.attachmentType === 'TEXT' ? (
                                                <p>{attachment.attachmentText}</p>
                                            ) : (
                                                <p className="text-red-600">Attachment type not supported</p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}