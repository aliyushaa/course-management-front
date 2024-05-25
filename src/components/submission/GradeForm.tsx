import {getUser} from "../../services/auth-token.services";
import {useForm} from "react-hook-form";
import {ICreateGrade, IGrade} from "../../types/submission.types";
import {submissionService} from "../../services/submission.service";
import {useEffect} from "react";

const user = getUser()

interface GradeProps {
    submissionId: number
    grade?: IGrade
}

export function GradeForm({submissionId, grade}: GradeProps) {
    const {register, handleSubmit, reset, formState: {errors}, setValue} = useForm<ICreateGrade>()

    useEffect(() => {
        if (grade) {
            setValue('grade', grade.grade)
            setValue('comment', grade.comment)
        }
    }, [])

    const onSubmit = async (data: ICreateGrade) => {
        try {
            if (user != null) {
                data.gradedById = user.id
                await submissionService.setGrade(data, submissionId)
            }

            reset()
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mt-2 text-sm mx-auto">
            <div className="text-center">
                <label className="block text-gray-700">Grade</label>
                <input id="title" type="number"
                       {...register("grade", {required: true, min: 0, max: 100})}
                       className="mt-1 p-2 w-full border rounded-md"/>
            </div>
            {errors.grade && errors.grade.type === "required" && (
                <span className="text-red-500 text-sm">This field is required</span>
            )}
            {errors.grade && (errors.grade.type === "min" || errors.grade.type === "max") && (
                <span className="text-red-500 text-sm">Grade must be between 0 and 100</span>
            )}

            <div className="mt-4 mb-2 text-center">
                <label className="block text-gray-700">Feedback</label>
                <textarea id="feedback"
                          {...register("comment")}
                          className="mt-1 p-2 w-full border rounded-md resize-none h-32"/>
            </div>

            <div className="text-center">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Grade</button>
            </div>

        </form>
    )
}
