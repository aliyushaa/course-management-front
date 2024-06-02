import {axiosWithAuth} from "../api/interceptors";
import {IUserTop} from "../types/auth.types";

export const topService = {
    async getTop20() {
        const response = await axiosWithAuth.get<IUserTop[]>('/score/top')

        return response.data
    },

}