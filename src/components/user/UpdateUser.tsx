import React, {useEffect} from "react";
import {IUser} from "../../types/auth.types";
import {SubmitHandler, useForm} from "react-hook-form";
import {userService} from "../../services/user.service";

interface UpdateUserFormProps {
    onClose: () => void
    user: IUser
}

export function UpdateUser({onClose, user}: UpdateUserFormProps) {
    const {register, handleSubmit, formState: {errors}, setValue, reset, control} = useForm<IUser>({
        mode: 'onChange'
    })

    const roles = [
        {display: 'Admin', value: 'ADMIN'},
        {display: 'Student', value: 'STUDENT'},
        {display: 'Teacher', value: 'TEACHER'}
    ];

    useEffect(() => {
        setValue('name', user.name)
        setValue('email', user.email)
        setValue('roles', user.roles)
        setValue('id', user.id)
    }, [])

    const onSubmit: SubmitHandler<IUser> = async data => {
        try {
            const roles = Array.isArray(data.roles) ? data.roles : [data.roles];

            const updatedData = { ...data, roles };

            const response = await userService.updateUser(updatedData)
            reset()
            onClose()
            window.location.reload();
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                className="border py-2 px-4 mt-4 w-full outline-0"
                placeholder="Title"
                {...register('name', {
                    required: 'Fill in the name'
                })}
            />
            {errors.name?.message && (
                <div className="text-red-600 text-sm">{errors.name.message}</div>
            )}

            <input
                className="border py-2 px-4 mt-4 w-full outline-0"
                placeholder="Email"
                {...register('email', {
                    required: 'Fill in the email'
                })}
            />
            {errors.email?.message && (
                <div className="text-red-600 text-sm">{errors.email.message}</div>
            )}

            <select
                className="border py-2 px-4 mt-4 w-full outline-0"
                {...register('roles', {
                    required: 'Select a role'
                })}
                multiple={false}
            >
                <option value="">Select a role</option>
                {roles.map((role, index) => (
                    <option key={index} value={role.value}>{role.display}</option>
                ))}
            </select>
            {errors.roles?.message && (
                <div className="text-red-600 text-sm">{errors.roles.message}</div>
            )}


            <div className="flex justify-center mt-4">
                <button type="submit" className=" py-2 bg-green-500 hover:bg-green-700 text-white px-4 border">
                    Update
                </button>
            </div>

        </form>
    )
}