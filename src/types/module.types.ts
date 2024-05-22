export interface IModule {
    id: number
    title: string
    attachments: IAttachment[];
}

export interface ICreateModule {
    title: string
    attachments: ICreateAttachment[]
}

export interface IAttachment {
    id: number;
    attachmentType: string
    attachmentText: string
}

export interface ICreateAttachment {
    attachmentType: string
    attachmentText: string
}