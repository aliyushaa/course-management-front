import {ICreateSubmissionBox} from "../../types/submission.types"
import {useForm} from "react-hook-form"
import {submissionBoxService} from "../../services/submission-box.service"
import {getUser} from "../../services/auth-token.services"

interface CreateSubmissionBoxFormProps {
    onClose: () => void
    moduleId: number
}

const user = getUser()

export function CreateSubmissionBoxForm({onClose, moduleId}: CreateSubmissionBoxFormProps) {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<ICreateSubmissionBox>()

    const onSubmit = async (data: ICreateSubmissionBox) => {
        try {
            if (user != null) {
                data.createdById = user.id
                const response = await submissionBoxService.create(data, moduleId)
            }
            reset()
            onClose()
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
            <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input id="title" type="text"
                       {...register("title", {required: true})}
                       className="mt-1 p-2 w-full border rounded-md"/>

                {errors.title && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea id="description"
                          {...register("description", {required: true})}
                          className="mt-1 p-2 w-full border rounded-md resize-none h-40"/>

                {errors.description && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Due date</label>
                <input id="dueDate" type="datetime-local"
                       {...register("dueDate", {required: true})}
                       className="mt-1 p-2 w-full border rounded-md"/>

                {errors.dueDate && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
        </form>
    )
}
