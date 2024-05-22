import {axiosWithAuth} from "../api/interceptors";
import {ICourseResponse, ICreateCourse, IUpdateCourse} from "../types/course.types";

class CourseService {
    private BASE_URL = '/course'

    async createCourse(data: ICreateCourse) {
        const response = await axiosWithAuth.post<ICourseResponse>(`${this.BASE_URL}/create`, data)
        return response.data
    }

    async getAll() {
        const response = await axiosWithAuth.get<ICourseResponse[]>(`${this.BASE_URL}/all`)

        return response.data
    }

    async getByIds(ids: number[]) {
        const idsString = ids.join(',');

        const response = await axiosWithAuth.get<ICourseResponse[]>(`${this.BASE_URL}/list`, {
            params: {
                ids: idsString
            }
        })

        return response.data
    }

    async get(id: number) {
        const response = await axiosWithAuth.get<ICourseResponse>(`${this.BASE_URL}/${id}`)

        return response.data
    }

    async delete(id: number) {
        const response = await axiosWithAuth.delete<boolean>(`${this.BASE_URL}/${id}`)

        return response.data
    }

    async addStudent(courseId: number, studentIds: number[]) {
        const response = await axiosWithAuth.patch<boolean>(`${this.BASE_URL}/${courseId}/addStudents`, null, {
            params: {
                studentIds: studentIds.join(',')
            }
        })

        return response.data
    }

    async update(courseId: number, course: IUpdateCourse) {
        const response = await axiosWithAuth.patch<ICourseResponse>(`${this.BASE_URL}/${courseId}/update`, course)

        return response.data
    }
}

export const courseService = new CourseService()