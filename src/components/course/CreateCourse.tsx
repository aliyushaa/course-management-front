import React, {useEffect, useState} from 'react'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {ICreateCourse} from "../../types/course.types";
import ReactSelect from 'react-select';
import {IUser, UserRoles} from "../../types/auth.types";
import {userService} from "../../services/user.service";
import {courseService} from "../../services/course.service";

interface CreateCourseProps {
    onClose: () => void
}

export function CreateCourse({onClose}: CreateCourseProps) {
    const [instructors, setInstructors] = useState<IUser[]>([])

    const {register, handleSubmit, formState: {errors}, reset, control} = useForm<ICreateCourse>({
        mode: 'onChange'
    })

    useEffect(() => {
        async function fetchInstructors() {
            try {
                const response = await userService.getAllUsers([UserRoles.ADMIN]);
                setInstructors(response.list)
            } catch (e) {
                console.log(e)
            }
        }

        fetchInstructors();
    }, [])

    const onSubmit: SubmitHandler<ICreateCourse> = async data => {
        try {
            const response = await courseService.createCourse(data)
            reset()
            onClose()
            window.location.reload();
        } catch (e) {
            console.log(e)
        }
    }

    const instructorOptions = instructors.map(instructor => ({
        value: instructor.id,
        label: instructor.name
    }))

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
            {errors.title?.message && (
                <div className="text-red-600 text-sm">{errors.title.message}</div>
            )}

            <textarea
                className="border py-2 px-4 mt-4 w-full outline-0"
                placeholder="Description"
                {...register('description', {
                    required: 'Fill in the description'
                })}
            />
            {errors.description?.message && (
                <div className="text-red-600 text-sm">{errors.description.message}</div>
            )}

            <Controller name="instructorId" control={control}
                        rules={{required: 'Instructor must be selected'}}
                        render={({field: {value, onChange}, fieldState: {error}}) => (
                            <div>
                                <ReactSelect
                                    className="mt-4 w-full"
                                    placeholder="Instructor"
                                    options={instructorOptions}
                                    value={instructorOptions.find(o => o.value === value)}
                                    onChange={selectedOption => onChange(selectedOption ? selectedOption.value : null)}
                                />
                                {error && <div className="text-red-600 text-sm">{error.message}</div>}
                            </div>
                        )}
            />

            <div className="flex justify-center mt-4">
                <button type="submit" className=" py-2 bg-green-500 hover:bg-green-700 text-white px-4 border">
                    Create
                </button>
            </div>

        </form>
    )
}