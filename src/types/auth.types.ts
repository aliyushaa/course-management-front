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

export interface ICreateUser {
    name: string
    email: string
    password: string
    role: string
}

export interface IAuthResponse {
    user: IUser
    tokenType: string
    accessToken: string
}

export interface IUserTop {
    user: IUser
    allTimeScore: number
}