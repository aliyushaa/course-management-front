import React, {useState} from "react"
import {useForm} from "react-hook-form"
import {moduleService} from "../../services/module.service"
import {ICreateModule} from "../../types/module.types"
import {getUser} from "../../services/auth-token.services"
import {fileService} from "../../services/file.service"

interface CreateModuleFormProps {
    onClose: () => void
    courseId: number
}

export function CreateModuleForm({onClose, courseId}: CreateModuleFormProps) {
    const [files, setFiles] = useState<File[]>([])
    const user = getUser()

    const {register, handleSubmit, formState: {errors}, reset} = useForm<ICreateModule>({
        mode: 'onChange'
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            setFiles(Array.from(files))
        }
    }

    const onSubmit = async (data: ICreateModule) => {
        try {
            data.fileIds = []
            if (files.length > 0) {
                const formData = new FormData()
                files.forEach(file => formData.append('files', file))
                const userId = user && user.id ? user.id : 0
                const response = await fileService.uploadList(formData, userId)
                response.forEach(file => data.fileIds.push(file.id))
            }

            // todo kludge
            data.attachments[0].attachmentType = 'TEXT'
            const response = await moduleService.create(data, courseId)
            reset()
            onClose()
            window.location.reload()
        } catch (error) {
            console.error('Failed to create module:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                className="border py-2 px-4 mt-4 w-full outline-0"
                placeholder="Title"
                {...register('title', {
                    required: 'Fill in the title'
                })}
            />
            {errors.title && (
                <div className="text-red-600 text-sm">{errors.title.message}</div>
            )}

            <textarea
                className="border py-2 px-4 mt-4 w-full outline-0 resize-none h-40"
                placeholder="Text"
                {...register('attachments.0.attachmentText', {
                    required: 'Fill in the text'
                })}
            />
            {(errors.attachments && errors.attachments[0]?.attachmentText) && (
                <div className="text-red-600 text-sm">{errors.attachments[0].attachmentText.message}</div>
            )}


            <label htmlFor="files" className="block mb-1 mt-4 font-bold text-gray-700">
                Select files to upload:
            </label>
            <input
                type="file"
                className="appearance-none w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleFileChange}
                multiple
            />
            {/* Display selected files */}
            {files.map((file, index) => (
                <div key={index} className="mt-2">
                    {file.name}
                </div>
            ))}

            <div className="flex justify-center mt-4">
                <button type="submit" className="py-2 bg-green-500 hover:bg-green-700 text-white px-4 border">
                    Create
                </button>
            </div>
        </form>
    )
}
