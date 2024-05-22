import {IAuthForm, IAuthResponse, IUser} from "../types/auth.types";
import {axiosClassic} from "../api/interceptors";
import {EnumTokens, removeFromStorage, saveTokenStorage} from "./auth-token.services";
import {ApiDataResponse} from "../types/apiResponse.types";
import Cookies from "js-cookie";


function saveUserToStorage(user: IUser) {
    Cookies.set("user", JSON.stringify(user), {
        domain: 'localhost',
        sameSite: 'strict',
        expires: 2
    })
}

export const authService = {
    async main(type: 'login' | 'register', data: IAuthForm) {
        const response = await axiosClassic.post<ApiDataResponse<IAuthResponse>>(
            `/auth/${type}`,
            data
        )

        if (response.data.data.accessToken) saveTokenStorage(response.data.data.accessToken, EnumTokens.ACCESS_TOKEN)
        if (response.data.data.user) saveUserToStorage(response.data.data.user);

        return response
    },

    async logout() {
        // todo
        // const response = await axiosClassic.post<boolean>('/auth/logout')
        // if (response.data) removeFromStorage()

        removeFromStorage()
    },
}