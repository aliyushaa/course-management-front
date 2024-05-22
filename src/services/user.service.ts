import {axiosWithAuth} from "../api/interceptors";
import {IUser} from "../types/auth.types";
import {ApiListResponse} from "../types/apiResponse.types";

export interface IProfileResponse {
    user: IUser
    roles: string[]
}

class UserService {
    private BASE_URL = '/auth'

    async getProfile() {
        const response = await axiosWithAuth.get<IProfileResponse>(`${this.BASE_URL}/user/profile`)
        return response.data
    }

    async getAllUsers(role?: string[]) {
        const params: { roles?: string } = {};

        if (role && role.length > 0) {
            params.roles = role.join(',');
        }

        const response = await axiosWithAuth.get<ApiListResponse<IUser>>(`${this.BASE_URL}/users-all`, {params});
        return response.data
    }
}

export const userService = new UserService()