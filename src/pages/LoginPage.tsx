import React, {useContext} from 'react'
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuthForm} from "../types/auth.types";
import {authService} from "../services/auth.service";
import styles from './login.module.css'
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../config/pages-url.config";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Flip, toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {errorCatch} from "../api/error";

export default observer(function LoginPage() {
    const navigate = useNavigate()
    const {store} = useContext(Context);

    const {register, handleSubmit, formState: {errors}} = useForm<IAuthForm>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<IAuthForm> = async data => {
        try {
            const response = await authService.main("login", data)

            store.setAuth(true)
            store.setUser(response.data.data.user)

            navigate(ROUTES.HOME)
        } catch (e) {
            console.log(e)
            toast.error(errorCatch(e), {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className={styles.background}>
                <div className="container h-screen mx-auto">
                    <div className="flex p-3 flex-auto mx-auto h-screen flex-row">
                        <div
                            className="xl:basis-1/3 lg:basis-2/3 md:basis-8/12 basis-full mx-auto h-fit self-center drop-shadow-xl rounded-md bg-transparent backdrop-blur-md border-2 p-6">
                            <h4 className="text-xl text-center pb-5 font-bold text-black">Login</h4>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-6">
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-black">Email address</label>
                                    <input id="email"
                                           type="email"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                           placeholder="email@gmail.com"

                                           {...register('email', {
                                               required: 'Email must be provided'
                                           })}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-black">Password</label>
                                    <input type="password"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                           placeholder="•••••••••"

                                           {...register('password', {
                                               required: 'Password must be provided'
                                           })}
                                    />
                                </div>

                                <p className="text-red-600">{errors.email?.message}</p>
                                <p className="text-red-600">{errors.password?.message}</p>

                                <div className="text-end items-end mb-6">
                                    <label htmlFor="remember"
                                           className="ml-2 text-sm text-end font-medium text-gray-900">
                                        <a href="#" className="text-black hover:underline">Forget Password ?</a></label>
                                </div>
                                <button type="submit"
                                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
});
