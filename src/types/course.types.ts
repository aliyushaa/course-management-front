import {IUser} from "./auth.types";
import { IModule } from "./module.types";

export interface ICourseResponse {
    id: number
    title: string
    description: string
    createDate: Date
    instructor: IUser
    students: IUser[]
    modules: IModule[]
}

export interface ICreateCourse {
    title: string
    description: string
    instructorId: number
    studentsId: number[]
}

export interface IUpdateCourse {
    title: string
    description: string
    instructorId: number
}

export interface IAddStudentToCourse {
    studentIds: number[]
    courseId: number
}