import {ICreateSubmissionBox, IFullSubmissionBox, ISubmissionBox} from "../types/submission.types";
import {axiosWithAuth} from "../api/interceptors";

export const submissionBoxService = {
    async get(id: number) {
        const response = await axiosWithAuth.get<IFullSubmissionBox>('course/submission-box/' + id)

        return response.data
    },

    async getShortInfo(id: number) {
        const response = await axiosWithAuth.get<ISubmissionBox>('course/submission-box/' + id + '/short')

        return response.data
    },

    async create(box: ICreateSubmissionBox, moduleId: number) {
        const response = await axiosWithAuth.post<ISubmissionBox>('/course/submission-box/create', box, {
            params: {
                moduleId: moduleId
            }
        })

        return response.data
    },

    async delete(id: number) {
        const response = await axiosWithAuth.delete('/course/submission-box/' + id)

        return response.data
    }
}