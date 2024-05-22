import {axiosWithAuth} from "../api/interceptors";
import {ICreateUser, IUser} from "../types/auth.types";
import {ApiDataResponse, ApiListResponse} from "../types/apiResponse.types";

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

    async createUser(user: ICreateUser) {
        const response = await axiosWithAuth.post<ApiDataResponse<IUser>>(`${this.BASE_URL}/register`, user)

        return response.data.data
    }

    async deleteUser(id: number) {
        const response = await axiosWithAuth.delete<ApiDataResponse<boolean>>(`${this.BASE_URL}/user`, {
            params: {
                id: id
            }
        })

        return response.data.data
    }

    async updateUser(user: IUser) {
        const response = await axiosWithAuth.patch<ApiDataResponse<IUser>>(`${this.BASE_URL}/user/` + user.id, user)

        return response.data.data
    }
}

export const userService = new UserService()