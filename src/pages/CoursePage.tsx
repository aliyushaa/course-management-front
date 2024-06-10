import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom"
import {ICourseResponse} from "../types/course.types"
import {courseService} from "../services/course.service"
import {CreateModuleForm} from "../components/module/CreateModuleForm"
import {containsRole} from "../App"
import {Modal} from "../components/Modal"
import {UserRoles} from "../types/auth.types"
import {FaRegFileExcel, FaRegFilePdf, FaRegFileWord, FaTrash} from "react-icons/fa"
import {moduleService} from "../services/module.service"
import {fileService} from "../services/file.service"
import {MdAssignment, MdOutlineAddToPhotos, MdOutlineFolderZip} from "react-icons/md";
import {CiFileOn, CiImageOn} from "react-icons/ci";
import {BsFiletypeTxt} from "react-icons/bs";
import {CreateSubmissionBoxForm} from "../components/submission/CreateSubmissionBoxForm";
import {ROUTES} from "../config/pages-url.config";

const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    const classes = 'text-[1.65rem] mb-2'
    switch (extension) {
        case 'txt':
            return <BsFiletypeTxt className={classes}/>
        case 'pdf':
            return <FaRegFilePdf className={classes}/>
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
            return <CiImageOn className={classes}/>
        case 'doc':
        case 'docx':
            return <FaRegFileWord className={classes}/>
        case 'xls':
        case 'xlsx':
            return <FaRegFileExcel className={classes}/>
        case 'zip':
        case 'rar':
            return <MdOutlineFolderZip className={classes}/>
        default:
            return <CiFileOn className={classes}/>
    }
}

export default function CoursePage() {
    const [course, setCourse] = useState<ICourseResponse | null>(null)
    const [found, setFound] = useState(false)
    const [createModuleModal, setCreateModuleModal] = useState(false)
    const [createSubmissionBoxModal, setCreateSubmissionBoxModal] = useState(false)
    const [moduleId, setModuleId] = useState<number | null>(null)

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

    const deleteHandler = async (id: number, courseId: number) => {
        try {
            const response = await moduleService.delete(id, courseId)
        } catch (error) {
            console.error('Failed to delete module:', error)
        }
    }

    const downloadFileHandler = async (id: number, fileName: string) => {
        try {
            const response = await fileService.downloadFile(id)

            const blob = new Blob([response])
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')

            link.href = url
            link.setAttribute('download', fileName)
            document.body.appendChild(link)

            link.click()

            window.URL.revokeObjectURL(url)
            document.body.removeChild(link)
        } catch (error) {
            console.error('Failed to download file:', error)
        }
    }

    return (
        <div className="container h-full mt-20 px-52">
            {!found ? (
                <p className="text-red-600 text-lg">Course not found!</p>
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-4">{course?.title}</h1>
                    <p className="text-gray-600 mb-6">{course?.description}</p>
                    <hr/>

                    {/* ADMIN/TEACHER/MODERATOR PERMISSION */}
                    {(containsRole(UserRoles.ADMIN) || containsRole(UserRoles.TEACHER)) && (
                        <>
                            <button onClick={() => setCreateModuleModal(true)}
                                    className="border bg-gray-800 border-gray-800 text-white font-bold py-2 px-4 rounded m-4 hover:bg-white hover:text-gray-800">
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

                            {(createSubmissionBoxModal && moduleId != null) &&
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <Modal title="Create submission box"
                                           onClose={() => setCreateSubmissionBoxModal(false)}>
                                        <CreateSubmissionBoxForm
                                            moduleId={moduleId}
                                            onClose={() => setCreateSubmissionBoxModal(false)}
                                        />
                                    </Modal>
                                </div>
                            }

                        </>
                    )}

                    <>
                        {course?.modules.map(module => (
                            <div key={module.id} className="mb-8 bg-white shadow-md p-4 rounded-md">
                                <h3 className="font-semibold mb-4">

                                    {(containsRole(UserRoles.ADMIN) || containsRole(UserRoles.TEACHER)) ?
                                        <div className="flex justify-between items-center">
                                            <div>{module.title}</div>
                                            <div>
                                                <button className='mr-3 p-2 rounded hover:bg-black hover:text-white'
                                                        onClick={() => {
                                                            setCreateSubmissionBoxModal(true)
                                                            setModuleId(module.id)
                                                        }}>
                                                    <MdOutlineAddToPhotos className='size-5'/>
                                                </button>

                                                <button
                                                    className='p-2 rounded text-red-600 hover:text-white hover:bg-red-600'
                                                    onClick={() => {
                                                        deleteHandler(module.id, course?.id)
                                                        window.location.reload()
                                                    }}>
                                                    <FaTrash className='size-5'/>
                                                </button>
                                            </div>
                                        </div>
                                        :
                                        <>{module.title}</>
                                    }

                                </h3>
                                <ul className="list-disc ml-6 text-sm">
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

                                {/* SUBMISSION BOXES DISPLAYING */}
                                {module.submissionBoxes.length > 0 && (
                                    <>
                                        <hr className='mt-4 mb-4'/>
                                        <ul className="list-disc">
                                            {module.submissionBoxes.map((box) => (
                                                <Link to={`${ROUTES.SUBMISSIONS_PAGE}/${box.id}`}
                                                      key={box.id}
                                                      state={{course: course}}>
                                                    <li key={box.id}
                                                        className="mb-2 flex items-center hover:underline hover:cursor-pointer">
                                                        <MdAssignment className="mr-2 size-5"/>
                                                        <span className='text-sm'>{box.title}</span>
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {/*FILES DISPLAYING*/}
                                {module.files.length > 0 && (
                                    <>
                                        <hr className='mt-4 mb-4'/>
                                        <div className="flex flex-col items-start space-y-1">
                                            {module.files.map(file => (
                                                <a onClick={() => downloadFileHandler(file.id, file.originalName)}
                                                   key={file.id}>
                                                    <div
                                                        className="flex items-center hover:cursor-pointer hover:opacity-60 hover:underline">
                                                        {getFileIcon(file.name)}
                                                        <p className="ml-2 text-sm">{file.originalName}</p>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </>
                </>
            )}
        </div>
    )
}