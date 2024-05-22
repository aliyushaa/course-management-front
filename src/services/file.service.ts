import {axiosWithAuth} from "../api/interceptors";
import {IFile} from "../types/file.types";

export const fileService = {
    async upload(file: FormData, userId: number) {
        const response = await axiosWithAuth.post<IFile>('/files/upload', file, {
            params: {
                userId: userId
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return response.data
    },

    async uploadList(files: FormData, userId: number) {
        const response = await axiosWithAuth.post<IFile[]>('/files/upload-list', files, {
            params: {
                userId: userId
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return response.data
    },

    async getFileInfo(id: number) {
        const response = await axiosWithAuth.get<IFile>('/files/' + id)

        return response.data
    },

    async downloadFile(id: number) {
        const response = await axiosWithAuth.get('/files/get/' + id, {
            responseType: 'blob'
        })
        return response.data
    }
}