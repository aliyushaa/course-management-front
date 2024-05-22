export interface ApiDataResponse<T> {
    data: T
    msg: string
    success: boolean
}

export interface ApiListResponse<T> {
    list: T[]
    msg: string
    success: boolean
    totalSize: number
}