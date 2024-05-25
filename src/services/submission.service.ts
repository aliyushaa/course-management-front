import {ICreateGrade, ICreateSubmission, ISubmission, IUpdateSubmission} from "../types/submission.types";
import {axiosWithAuth} from "../api/interceptors";

export const submissionService = {
    async get(submissionBoxId: number, userId: number) {
        const response = await axiosWithAuth.get<ISubmission>('/course/submission', {
            params: {
                submissionBoxId: submissionBoxId,
                userId: userId
            }
        })

        return response.data
    },

    async update(box: IUpdateSubmission, submissionBoxId: number) {
        const response = await axiosWithAuth.put<ISubmission>('/course/submission/' + submissionBoxId, box, {
            params: {
                submissionBoxId: submissionBoxId,
            }
        })

        return response.data
    },

    async setGrade(grade: ICreateGrade, submissionId: number) {
        const response = await axiosWithAuth.put<ISubmission>('/course/submission/' + submissionId + '/grade', grade)

        return response.data
    },

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