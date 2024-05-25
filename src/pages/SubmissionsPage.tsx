import React, {useEffect, useState} from 'react'
import {useLocation, useParams} from "react-router-dom"
import {submissionBoxService} from "../services/submission-box.service"
import {ICreateSubmission, IFullSubmissionBox, ISubmission, ISubmissionBox} from "../types/submission.types"
import {ICourseResponse} from "../types/course.types"
import {fileService} from "../services/file.service"
import {containsRole} from "../App"
import {UserRoles} from "../types/auth.types"
import {submissionService} from "../services/submission.service"
import {getUser} from "../services/auth-token.services"
import {useForm} from "react-hook-form";
import {FaEdit} from "react-icons/fa";
import {GradeForm} from "../components/submission/GradeForm";

interface LocationState {
    course: ICourseResponse
}

export function SubmissionsPage() {
    const [submissionBox, setSubmissionBox] = useState<IFullSubmissionBox | null>(null)
    const [studentSubmissionBox, setStudentSubmissionBox] = useState<ISubmissionBox | null>(null)
    const [studentSubmission, setStudentSubmission] = useState<ISubmission | null>(null)
    const [studentHaveSubmitted, setStudentHaveSubmitted] = useState(false)
    const [selectedFileNames, setSelectedFileNames] = useState<string[]>([])
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [found, setFound] = useState(false)
    const [isTimeUp, setIsTimeUp] = useState(false)
    const [gradeFormIsOpened, setGradeFormIsOpened] = useState(false)

    const params = useParams<{ boxId: string }>()
    const location = useLocation()
    const {course} = (location.state as LocationState) || {}
    const user = getUser()

    const {register, handleSubmit, formState: {errors}, reset} = useForm<ICreateSubmission>({
        mode: 'onChange'
    })

    const onSubmit = async (data: ICreateSubmission) => {
        try {
            data.fileIds = []
            if (params.boxId !== undefined) {
                if (selectedFiles.length > 0) {
                    const formData = new FormData()
                    selectedFiles.forEach(file => formData.append('files', file))
                    const response = await fileService.uploadList(formData, user!.id)
                    response.forEach(file => data.fileIds.push(file.id))
                }
                data.uploadedById = user!.id
                const response = await submissionService.create(data, parseInt(params.boxId))
            }
            reset()
            window.location.reload()
        } catch (error) {
            console.error('Failed to create submission:', error)
        }
    }

    useEffect(() => {
        async function fetchSubmissions() {
            try {
                if (params.boxId !== undefined) {
                    const response = await submissionBoxService.get(parseInt(params.boxId))

                    setSubmissionBox(response)
                    setFound(true)
                }
            } catch (e) {
                setFound(false)
                console.log(e)
            }
        }

        async function fetchStudentSubmissions() {
            try {
                if (params.boxId !== undefined) {
                    const response = await submissionBoxService.getShortInfo(parseInt(params.boxId))

                    setStudentSubmissionBox(response)
                    setFound(true)

                    try {
                        const submissionResponse = await submissionService.get(parseInt(params.boxId), getUser()!.id)
                        setStudentSubmission(submissionResponse)
                        setStudentHaveSubmitted(true)
                    } catch (e) {
                        setStudentHaveSubmitted(false)
                    }
                }

            } catch (e) {
                setFound(false)
                console.log(e)
            }
        }

        if (containsRole(UserRoles.ADMIN) || containsRole(UserRoles.TEACHER)) {
            fetchSubmissions()
        } else {
            fetchStudentSubmissions()
        }
    }, [])

    useEffect(() => {
        if (studentSubmissionBox) {
            const now = new Date().getTime()
            const due = new Date(studentSubmissionBox.dueDate).getTime()
            const timeDiff = due - now

            if (timeDiff <= 0) {
                setIsTimeUp(true)
            } else {
                setIsTimeUp(false)
            }

        }
    }, [studentSubmissionBox])

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

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const fileArray = Array.from(files);
            const fileNames = Array.from(files).map(file => file.name)
            setSelectedFileNames(fileNames)
            setSelectedFiles(fileArray)
        }
    }

    const handleDelete = async (submissionId: number) => {
        try {
            await submissionService.delete(submissionId)
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'EARLY_SUBMISSION':
                return 'bg-green-100 text-green-800'
            case 'LATE_SUBMISSION':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusName = (status: string) => {
        switch (status) {
            case 'EARLY_SUBMISSION':
                return 'EARLY SUBMISSION'
            case 'LATE_SUBMISSION':
                return 'LATE SUBMISSION'
        }
    }

    const calculateTimeRemaining = (dueDate: Date) => {
        const now = new Date().getTime()
        const due = new Date(dueDate).getTime()
        const timeDiff = due - now

        if (timeDiff <= 0) {
            return 'Time is up'
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

        let timeString = ''
        if (days > 0) {
            timeString += `${days} days `
        }
        if (hours > 0) {
            timeString += `${hours} hours `
        }
        if (minutes > 0) {
            timeString += `${minutes} minutes `
        }
        if (seconds > 0) {
            timeString += `${seconds} seconds`
        }

        return timeString.trim()
    }


    function isPastDue(date: Date) {
        return new Date(date) < new Date()
    }


    if (!found) {
        return (
            <div className="container h-full mt-20 px-52">
                <p className="text-red-600 text-lg">Submissions not found!</p>
            </div>
        )
    }

    // ADMIN OR TEACHER VIEW
    if (containsRole(UserRoles.ADMIN) || containsRole(UserRoles.TEACHER)) {
        return (
            <div className="container h-full mt-20 px-52">
                {submissionBox != null &&
                    <>
                        <div className="text-3xl border p-3.5 shadow-md rounded-lg">
                            {course.title + ' | ' + course.instructor.name}
                        </div>
                        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
                            <div className="border-b-2 pb-4 mb-4">
                                <h2 className="text-2xl font-bold mb-2">{submissionBox.title}</h2>

                                <div className="text-sm font-bold">
                                    <p className='p-2'>
                                        Created: {new Date(submissionBox.createdDate).toLocaleString()}
                                    </p>
                                    <p className={`rounded p-2 max-w-xs 
                                ${isPastDue(new Date(submissionBox.dueDate)) ? 'bg-red-200' : `bg-green-200`}`}>
                                        Due: {new Date(submissionBox.dueDate).toLocaleString()}
                                    </p>
                                </div>

                                <p className="text-gray-700 mt-4">{submissionBox.description}</p>
                            </div>
                            {submissionBox.submissions.map((submission) => (
                                <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mb-5 mt-6">
                                    <div className="border-b-2 pb-4 mb-4 text-sm font-bold">
                                        <h2 className="text-2xl mb-2">{submission.uploadedBy.name}</h2>
                                        <p className="text-gray-700 mb-2">Upload
                                            date: {new Date(submission.uploadDate).toLocaleString()}</p>

                                        <p className="text-gray-700 mb-2">Last
                                            modified: {new Date(submission.updateDate).toLocaleString()}</p>

                                        <p className={`p-2 rounded ${getStatusClass(submission.status)}`}>
                                            Status: {getStatusName(submission.status)}</p>

                                        {submission.grade === null ?
                                            // HAS GRADE
                                            <>
                                                <div
                                                    className="flex rounded items-center justify-between mt-1 p-1 bg-yellow-50">
                                                    <p className="font-bold text-sm">
                                                        Grading status: not graded
                                                    </p>
                                                    <FaEdit
                                                        onClick={() => setGradeFormIsOpened(prevState => !prevState)}
                                                        className="size-5 text-red-500 cursor-pointer hover:text-red-600"/>
                                                </div>
                                                {gradeFormIsOpened && <GradeForm submissionId={submission.id}/>}
                                            </>
                                            :
                                            // WITHOUT GRADE
                                            <>
                                                <div
                                                    className="flex items-center justify-between mt-1 mb-1 p-1 bg-yellow-50">
                                                    <p className="text-sm font-bold">
                                                        Grade: {submission.grade.grade}
                                                    </p>
                                                    <FaEdit
                                                        onClick={() => setGradeFormIsOpened(prevState => !prevState)}
                                                        className="size-5 text-red-500 cursor-pointer hover:text-red-600"/>
                                                </div>

                                                {submission.grade.comment &&
                                                    <p className="text-sm pl-1 font-bold">
                                                        Feedback: {submission.grade.comment}
                                                    </p>
                                                }

                                                {gradeFormIsOpened && <GradeForm submissionId={submission.id}
                                                                                 grade={submission.grade}/>}
                                            </>
                                        }
                                    </div>

                                    <div className="text-sm">
                                        {submission.comment &&
                                            <>
                                                <h3 className="text-xl font-bold mb-2">Comments</h3>
                                                <p className="text-gray-700 mb-4">{submission.comment}</p>
                                            </>
                                        }

                                        <h3 className="text-xl font-bold mb-2">Files</h3>
                                        <ul>
                                            {submission.files.map(file => (
                                                <li key={file.id} className="mb-2 text-sm">
                                                    <a
                                                        key={file.id}
                                                        className="mr-2 mb-2 mt-2 text-blue-500 hover:opacity-60 underline cursor-pointer"
                                                        onClick={() => downloadFileHandler(file.id, file.originalName)}>
                                                        {file.originalName}
                                                    </a>(Uploaded: {new Date(file.uploadDate).toLocaleString()})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                }
            </div>

        )
    }

    // JUST REGULAR USER VIEW
    else {
        return (
            <div className="container h-full mt-20 px-52">
                {/* SUBMISSION BOX INFO */}
                {studentSubmissionBox != null &&
                    <>
                        <div className="text-3xl border p-3.5 shadow-md rounded-lg">
                            {course.title + ' | ' + course.instructor.name}
                        </div>
                        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
                            <div className="border-b-2 pb-4 mb-4">
                                <h2 className="text-2xl font-bold mb-2">{studentSubmissionBox.title}</h2>

                                <div className="text-sm font-bold">
                                    <p className='p-2'>
                                        Created: {new Date(studentSubmissionBox.createdDate).toLocaleString()}
                                    </p>
                                    <p className={`rounded p-2 max-w-xs`}>
                                        Due: {new Date(studentSubmissionBox.dueDate).toLocaleString()}
                                    </p>
                                    <p className={`p-2 rounded ${studentHaveSubmitted && `bg-green-100 text-green-800`}`}>
                                        Submission status: {studentHaveSubmitted ? 'Submitted' : 'Not submitted'}
                                    </p>
                                    <p className={`p-2 mt-2 rounded ${isTimeUp ? `bg-red-100 text-red-800`
                                        : `bg-green-100 text-green-800`}`}>
                                        Time remaining: {calculateTimeRemaining(studentSubmissionBox.dueDate)}
                                    </p>
                                </div>
                                <p className="text-gray-700 mt-4">{studentSubmissionBox.description}</p>
                            </div>
                        </div>
                    </>
                }
                {studentSubmission == null ?
                    // IF USER DOES NOT HAVE SUBMISSION
                    <>
                        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6 mb-40 text-center">
                            <p className="text-xl font-bold mb-6">You have not submitted anything yet</p>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div
                                    className="relative border-dashed border-2 border-gray-400 bg-gray-100 rounded-lg h-32 flex justify-center items-center">
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleFileSelect}
                                        multiple
                                    />
                                    {selectedFileNames.length === 0 ? (
                                        <p className="text-gray-600">Drag & Drop files here or click to upload</p>
                                    ) : (
                                        <ul>
                                            {selectedFileNames.map((fileName, index) => (
                                                <li key={index} className="text-sm">
                                                    {fileName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <textarea
                                    className="border py-2 px-4 mt-4 w-full outline-0 resize-none h-40"
                                    placeholder="Comment"
                                    {...register('comment')}
                                />

                                <div className="flex justify-center mt-4">
                                    <button type="submit"
                                            className="py-2 bg-gray-800 text-white hover:bg-white hover:text-gray-800 px-4 border border-gray-800">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                    :
                    // IF USER HAS SUBMISSION
                    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mb-40 mt-6">
                        <div className="border-b-2 pb-4 mb-4 text-sm font-bold">
                            <h2 className="text-2xl mb-2">Your submission</h2>
                            <p className="ml-2 text-gray-700 mb-2">Upload
                                date: {new Date(studentSubmission.uploadDate).toLocaleString()}</p>

                            <p className="ml-2 text-gray-700 mb-2">Last
                                modified: {new Date(studentSubmission.updateDate).toLocaleString()}</p>

                            <p className={`p-2 rounded ${getStatusClass(studentSubmission.status)}`}>
                                Status: {getStatusName(studentSubmission.status)}</p>

                            {studentSubmission.grade != null ?
                                <>
                                    <p className='mt-1 p-2 rounded bg-green-100 text-green-800'>
                                        Grading status: graded
                                    </p>
                                    <p className="ml-2 text-gray-700 mt-2">
                                        Grade: {studentSubmission.grade.grade}
                                    </p>
                                    {studentSubmission.grade.comment &&
                                        <p className="ml-2 text-gray-700 mt-2">
                                            Feedback: {studentSubmission.grade.comment}
                                        </p>
                                    }
                                    <p className="ml-2 text-gray-700 mt-2">
                                        Graded at: {new Date(studentSubmission.grade.gradedDate).toLocaleString()}
                                    </p>
                                </>
                                :
                                <p className='mt-1 p-2 rounded bg-gray-100 text-gray-800'>
                                    Grading status: not graded
                                </p>
                            }

                        </div>

                        <div className="text-sm">
                            {studentSubmission.comment &&
                                <>
                                    <h3 className="text-xl font-bold mb-2">Comments</h3>
                                    <p className="text-gray-700 mb-4">{studentSubmission.comment}</p>
                                </>
                            }

                            <h3 className="text-xl font-bold mb-2">Files</h3>
                            <ul>
                                {studentSubmission.files.map(file => (
                                    <li key={file.id} className="mb-2 text-sm">
                                        <a
                                            key={file.id}
                                            className="mr-2 mb-2 mt-2 text-blue-500 hover:opacity-60 underline cursor-pointer"
                                            onClick={() => downloadFileHandler(file.id, file.originalName)}>
                                            {file.originalName}
                                        </a>(Uploaded: {new Date(file.uploadDate).toLocaleString()})
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-center mt-4 space-x-4 text-sm">
                            {/*<button*/}
                            {/*    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900"*/}
                            {/*    onClick={handleUpdate}*/}
                            {/*>*/}
                            {/*    Update*/}
                            {/*</button>*/}
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => handleDelete(studentSubmission!.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

