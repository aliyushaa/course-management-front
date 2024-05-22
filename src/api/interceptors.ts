import axios, {CreateAxiosDefaults} from "axios";
import {getAccessToken} from "../services/auth-token.services";

const options: CreateAxiosDefaults = {
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
}

const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)
axiosWithAuth.interceptors.request.use(config => {
    const accessToken = getAccessToken()

    if (config?.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`

    return config
})

axiosWithAuth.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config
        // if ((
        //         error?.response?.status === 401
        //         || errorCatch(error) === 'jwt expired'
        //         || errorCatch(error) === 'jwt must be provided')
        //     && error.config && !error.config._isRetry) {
        //
        //     originalRequest._isRetry = true
        //     try {
        //         return axiosWithAuth.request(originalRequest)
        //     } catch (e) {
        //         if (errorCatch(e) === 'jwt expired') removeFromStorage()
        //     }
        // }
    }
)

export {axiosClassic, axiosWithAuth}