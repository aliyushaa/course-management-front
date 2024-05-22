import {ICreateModule, IModule} from "../types/module.types";
import {axiosWithAuth} from "../api/interceptors";

export const moduleService = {
    async create(module: ICreateModule, courseId: number) {
        const response = await axiosWithAuth.post<IModule>('/course/module/create', module, {
            params: {
                courseId: courseId
            }
        })

        return response.data
    }
}