import React, {useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {IProfileResponse, userService} from "../../services/user.service";

interface UpdateUserFormProps {
    onClose: () => void
    user: IProfileResponse
}

export function UpdateProfile({onClose, user}: UpdateUserFormProps) {
    const {register, handleSubmit, formState: {errors}, setValue, reset, control} = useForm<IProfileResponse>({
        mode: 'onChange'
    })


    useEffect(() => {
        setValue('id', user.id)
        setValue('name', user.name)
        setValue('email', user.email)
        setValue('receiveEmailNotification', user.receiveEmailNotification)
        setValue('receiveTgNotification', user.receiveTgNotification)
    }, [])

    const onSubmit: SubmitHandler<IProfileResponse> = async data => {
        try {
            const response = await userService.updateProfile(data)
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
                placeholder="name"
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

            <label className="block mb-2 text-sm mt-2">Receive email notifications</label>
            <select
                className="border py-2 px-4 w-full outline-0 rounded"
                defaultValue={user.receiveEmailNotification ? 'true' : 'false'}
                {...register('receiveEmailNotification', {
                    setValueAs: value => value === 'true'
                })}
            >
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>

            <label className="block mb-2 text-sm mt-2">Receive telegram notifications</label>
            <select
                className="border py-2 px-4 w-full outline-0 rounded"
                defaultValue={user.receiveTgNotification ? 'true' : 'false'}
                {...register('receiveTgNotification', {
                    setValueAs: value => value === 'true'
                })}
            >
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>


            <div className="flex justify-center mt-4">
                <button type="submit" className=" py-2 bg-green-500 hover:bg-green-700 text-white px-4 border">
                    Update
                </button>
            </div>

        </form>
    )
}