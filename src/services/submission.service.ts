import {ICreateSubmission, ISubmission} from "../types/submission.types";
import {axiosWithAuth} from "../api/interceptors";

export const submissionService = {
    async create(submission: ICreateSubmission, submissionBoxId: number) {
        const response = await axiosWithAuth.post<ISubmission>('/course/submission/create', submission, {
            params: {
                submissionBoxId: submissionBoxId
            }
        })

        return response.data
    },

    async delete(id: number) {
        const response = await axiosWithAuth.delete('/course/submission/' + id)

        return response.data
    }
}