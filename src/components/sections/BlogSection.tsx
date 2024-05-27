import React, {useEffect, useState} from 'react'
import {containsRole} from "../../App";
import {UserRoles} from "../../types/auth.types";
import {CiSquarePlus} from "react-icons/ci";
import {Modal} from "../Modal";
import {CreateBlogForm} from "./CreateBlogForm";
import {FaTrash} from "react-icons/fa";
import {blogService} from "../../services/blog.service";
import {IBlog} from "../../types/blog.types";

const BlogSection: React.FC = () => {
    const [blogs, setBlogs] = useState<IBlog[] | null>(null)
    const [createModal, setCreateModal] = useState(false)

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const blogs = await blogService.get()
                setBlogs(blogs)
            } catch (e) {
                console.log(e)
            }
        }

        fetchBlogs()
    }, [])

    async function deleteHandler(id: number) {
        try {
            await blogService.delete(id)
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }

    return (

        <div className="container mx-auto p-4">
            {(containsRole(UserRoles.ADMIN) || containsRole(UserRoles.TEACHER)) &&
                <div className="flex justify-end">
                    <button onClick={() => setCreateModal(true)} className="text-gray-800 hover:text-gray-400">
                        <CiSquarePlus size={30}/>
                    </button>
                </div>
            }
            {createModal &&
                <Modal title='Create blog' onClose={() => setCreateModal(false)}>
                    <CreateBlogForm/>
                </Modal>
            }

            {blogs && blogs.length > 0 ? (
                blogs.map((blog, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-4">
                        <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                        <p className="text-gray-600 text-sm mb-2">{`By ${blog.author} - ${new Date(blog.date).toLocaleString()}`}</p>
                        <p className="text-gray-800">{blog.summary}</p>

                        {(containsRole(UserRoles.ADMIN) || containsRole(UserRoles.TEACHER)) &&
                            <div className="flex justify-end">
                                <button onClick={() => deleteHandler(blog.id)}
                                        className="text-red-500 hover:text-red-800">
                                    <FaTrash size={17}/>
                                </button>
                            </div>
                        }
                    </div>
                ))
            ) : (
                <p className="text-xl text-center text-gray-600">No blogs found or created</p>
            )}
        </div>
    )
}

export default BlogSection
