import React, {useContext} from 'react'
import './LoginForm.css'
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

import {SubmitHandler, useForm} from "react-hook-form";
import {IAuthForm} from "../types/auth.types";
import {authService} from "../services/auth.service";
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
            <div className="LoginPage">
            <div className='wrapper'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>
                        Login
                    </h1>
                    <div className="input-box">
                        {/*<input type="text" placeholder='Username' required/>*/}
                        <input id="email"
                               type="email"
                               placeholder="email@gmail.com"
                               {...register('email', {
                                   required: 'Email must be provided'
                               })}
                        />

                        <FaUserAlt className='icon'/>

                    </div>
                    <div className="input-box">
                        <input type="password"
                               placeholder="Password"
                               {...register('password', {
                                   required: 'Password must be provided'
                               })}
                        />
                        <FaLock className='icon'/>

                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox"/> Remember me </label>
                    </div>

                    <button type="submit">
                        Login
                    </button>


                </form>
            </div>

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

            </div>
        </>
    )
});
