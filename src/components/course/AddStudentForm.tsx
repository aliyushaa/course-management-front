import React, {useEffect, useState} from 'react';
import {IUser, UserRoles} from "../../types/auth.types";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IAddStudentToCourse} from "../../types/course.types";
import {userService} from "../../services/user.service";
import {courseService} from "../../services/course.service";
import ReactSelect from "react-select";

interface AddStudentFormProps {
    onClose: () => void
    courseId: number
}

export function AddStudentForm({onClose, courseId}: AddStudentFormProps) {
    const [students, setStudents] = useState<IUser[]>([])

    const {register, handleSubmit, formState: {errors}, reset, control} = useForm<IAddStudentToCourse>({
        mode: 'onChange'
    })

    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await userService.getAllUsers([UserRoles.STUDENT]);
                setStudents(response.list)
            } catch (e) {
                console.log(e)
            }
        }

        fetchStudents();
    }, [])

    const onSubmit: SubmitHandler<IAddStudentToCourse> = async data => {
        try {
            const response = await courseService.addStudent(courseId, data.studentIds)
            reset()
            onClose()
        } catch (e) {
            console.log(e)
        }
    }

    const studentOptions = students.map(student => ({
        value: student.id,
        label: student.name
    }))

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller name="studentIds" control={control}
                        rules={{required: 'Students must be selected'}}
                        render={({field: {value, onChange}, fieldState: {error}}) => (
                            <div>
                                <ReactSelect
                                    className="mt-4 w-full"
                                    isMulti={true}
                                    placeholder="Students"
                                    options={studentOptions}
                                    value={studentOptions.filter(option => value && value.includes(option.value))}
                                    onChange={selectedOptions => onChange(selectedOptions ? selectedOptions.map(option => option.value) : [])}
                                />
                                {error && <div className="text-red-600 text-sm">{error.message}</div>}
                            </div>
                        )}
            />

            <div className="flex justify-center mt-4">
                <button type="submit" className=" py-2 bg-green-500 hover:bg-green-700 text-white px-4 border">
                    Add
                </button>
            </div>

        </form>
    )
}
