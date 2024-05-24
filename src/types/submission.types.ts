import {IUser} from "./auth.types";
import {IFile} from "./file.types";

export interface ISubmissionBox {
    id: number
    title: string
    description: string
    createdById: number
    createdDate: Date
    dueDate: Date
}

export interface IFullSubmissionBox extends ISubmissionBox{
    submissions: ISubmission[]
}

export interface ICreateSubmissionBox {
    title: string
    description: string
    dueDate: Date
    createdById: number
}

export interface ISubmission {
    id: number
    uploadedBy: IUser
    comment: string
    files: IFile[]
    uploadDate: Date
    updateDate: Date
    status: string
}

export interface ICreateSubmission {
    uploadedById: number
    comment: string
    fileIds: number[]
}

export interface IUpdateSubmission {
    uploadedById: number
    comment: string
    fileIds: number[]
}
