export interface IAuthForm {
    email: string
    password: string
}

export enum UserRoles {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    MODERATOR = "MODERATOR",
    ADMIN = "ADMIN"
}

export interface IUser {
    id: number
    name: string
    email: string
    roles: string[]
    courseIds: number[]
}

export interface IAuthResponse {
    user: IUser
    tokenType: string
    accessToken: string
}