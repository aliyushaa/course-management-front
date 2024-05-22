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
    files: IFile[]
    uploadDate: Date
    updateDate: Date
    //todo enum
    status: string
}

export interface ICreateSubmission {
    uploadedById: number
    fileIds: number[]
}
