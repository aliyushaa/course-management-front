import {IFile} from "./file.types";
import {ISubmissionBox} from "./submission.types";

export interface IModule {
    id: number
    title: string
    attachments: IAttachment[]
    files: IFile[]
    submissionBoxes: ISubmissionBox[]
}

export interface ICreateModule {
    title: string
    attachments: ICreateAttachment[]
    fileIds: number[]
}

export interface ICreateAttachment {
    attachmentType: string
    attachmentText: string
}

export interface IAttachment {
    id: number
    attachmentType: string
    attachmentText: string
}

