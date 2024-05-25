import Cookies from 'js-cookie'
import {IUser} from "../types/auth.types";

export enum EnumTokens {
    'ACCESS_TOKEN' = 'accessToken',
    'REFRESH_TOKEN' = 'refreshToken'
}

export const getAccessToken = () => {
    const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
    return accessToken || null
}

export const getUser = () => {
    const userCookie = Cookies.get('user')

    if (userCookie) {
        try {
            const user: IUser = JSON.parse(userCookie)
            return user
        } catch (e) {
            console.log(e)
            return null
        }
    }
}

export const saveTokenStorage = (token: string, type: EnumTokens) => {
    Cookies.set(type, token, {
        expires: 2
    })
}

export const removeFromStorage = () => {
    Cookies.remove(EnumTokens.ACCESS_TOKEN);
}