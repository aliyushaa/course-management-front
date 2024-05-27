export interface IBlog {
    id: number
    title: string
    author: string
    date: Date
    summary: string
}

export interface ICreateBlog {
    title: string
    authorId: number
    summary: string
}