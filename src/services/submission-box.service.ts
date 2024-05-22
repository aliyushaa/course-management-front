import {axiosWithAuth} from "../api/interceptors";

export const submissionService = {
    async create(module: ICreateModule, courseId: number) {
        const response = await axiosWithAuth.post<IModule>('/course/module/create', module, {
            params: {
                courseId: courseId
            }
        })

        return response.data
    },

    async delete(id: number, courseId: number) {
        const response = await axiosWithAuth.delete('/course/module/' + id, {
            params: {
                courseId: courseId
            }
        })

        return response.data
    }
}