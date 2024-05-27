import {axiosWithAuth} from "../api/interceptors";
import {IBlog, ICreateBlog} from "../types/blog.types";

export const blogService = {
    async get() {
        const response = await axiosWithAuth.get<IBlog[]>('/course/blogs')

        return response.data
    },

    async update(blog: ICreateBlog, blogId: number) {
        const response = await axiosWithAuth.patch<IBlog>('/course/blog/' + blogId, blog, {
            params: {
                blogId: blogId,
            }
        })

        return response.data
    },

    async create(blog: ICreateBlog) {
        const response = await axiosWithAuth.post<IBlog>('/course/blog/create', blog)

        return response.data
    },

    async delete(id: number) {
        const response = await axiosWithAuth.delete('/course/blog/' + id)

        return response.data
    }
}