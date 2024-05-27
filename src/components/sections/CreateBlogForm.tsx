import {getUser} from "../../services/auth-token.services";
import {useForm} from "react-hook-form";
import {ICreateBlog} from "../../types/blog.types";
import {blogService} from "../../services/blog.service";

const user = getUser()

export function CreateBlogForm() {
    const {register, handleSubmit, reset, formState: {errors}, setValue} = useForm<ICreateBlog>()

    const onSubmit = async (data: ICreateBlog) => {
        try {
            if (user != null) {
                data.authorId = user.id
                await blogService.create(data)
            }

            reset()
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mt-2 text-sm mx-auto">
            <div>
                <label className="block text-gray-700">Title</label>
                <input id="title" type="text"
                       {...register("title", {required: true})}
                       className="mt-1 p-2 w-full border rounded-md"/>
            </div>
            {errors.title && (
                <span className="text-red-500 text-sm">This field is required</span>
            )}

            <div className="mt-4 mb-2">
                <label className="block text-gray-700">Summary</label>
                <textarea id="summary"
                          {...register("summary", {required: true})}
                          className="mt-1 p-2 w-full border rounded-md resize-none h-32"/>
                {errors.summary &&
                    <span className="text-red-500 text-sm">This field is required</span>
                }
            </div>

            <div className="text-center">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create</button>
            </div>

        </form>
    )
}
