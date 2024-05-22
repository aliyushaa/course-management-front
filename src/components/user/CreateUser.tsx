import React from "react";
import {ICreateUser} from "../../types/auth.types";
import {SubmitHandler, useForm} from "react-hook-form";
import {userService} from "../../services/user.service";

interface CreateUserProps {
    onClose: () => void
}

export function CreateUser({onClose}: CreateUserProps) {
    const roles = [
        {display: 'Admin', value: 'ADMIN'},
        {display: 'Student', value: 'STUDENT'},
        {display: 'Teacher', value: 'TEACHER'}
    ];

    const {register, handleSubmit, formState: {errors}, reset, control} = useForm<ICreateUser>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<ICreateUser> = async data => {
        try {
            const response = await userService.createUser(data);

            reset();
            onClose();
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                className="border py-2 px-4 mt-4 w-full outline-0"
                placeholder="Name"
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
                type="email"
                {...register('email', {
                    required: 'Fill in the email'
                })}
            />
            {errors.email?.message && (
                <div className="text-red-600 text-sm">{errors.email.message}</div>
            )}

            <input
                className="border py-2 px-4 mt-4 w-full outline-0"
                type="password"
                placeholder="Password"
                {...register('password', {
                    required: 'Fill in the password'
                })}
            />
            {errors.email?.message && (
                <div className="text-red-600 text-sm">{errors.email.message}</div>
            )}

            <select
                className="border py-2 px-4 mt-4 w-full outline-0"
                {...register('role', {
                    required: 'Select a role'
                })}
            >
                <option value="">Select a role</option>
                {roles.map((role, index) => (
                    <option key={index} value={role.value}>{role.display}</option>
                ))}
            </select>
            {errors.role?.message && (
                <div className="text-red-600 text-sm">{errors.role.message}</div>
            )}

            <div className="flex justify-center mt-4">
                <button type="submit" className=" py-2 bg-green-500 hover:bg-green-700 text-white px-4 border">
                    Create
                </button>
            </div>

        </form>
    )
}