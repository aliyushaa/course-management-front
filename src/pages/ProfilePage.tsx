import React, {useEffect, useState} from 'react'
import {IProfileResponse, userService} from "../services/user.service";
import {FaGithub, FaInstagram, FaTelegram} from "react-icons/fa";
import {CgWebsite} from "react-icons/cg";
import NotFoundPage from "./NotFoundPage";

export default function ProfilePage() {
    const [user, setUser] = useState<IProfileResponse | null>(null)

    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await userService.getProfile();
                setUser(response)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }

        fetchStudents();
    }, [])

    if (user != null)
        return (
            <>
                <div className="container mx-auto py-4 mt-28">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <div className="bg-white shadow-md rounded-lg p-4 text-center">
                                <img
                                    src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR6_ZZIo8iKJrKexYoj2DDk4iWDlESeUbdMerRUt_A-4_iuwFza"
                                    alt="User avatar"
                                    className="w-32 h-32 rounded-full mx-auto mb-4"
                                />
                                <h4 className="text-xl font-semibold">{user.name}</h4>
                            </div>
                            <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                                <ul className="list-none space-y-2">
                                    <li className="flex justify-between items-center">
                                        <h6 className="font-semibold flex items-center">
                                            <CgWebsite className="mr-2 w-5 h-5"/>
                                            Website
                                        </h6>
                                        <span className="text-gray-600">https://astanait.edu.kz</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <h6 className="font-semibold flex items-center">
                                            <FaGithub className="mr-2 w-5 h-5"/>
                                            Github
                                        </h6>
                                        <span className="text-gray-600"></span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <h6 className="font-semibold flex items-center">
                                            <FaInstagram className="mr-2 w-5 h-5 text-pink-500"/>
                                            Instagram
                                        </h6>
                                        <span className="text-gray-600"></span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <h6 className="font-semibold flex items-center">
                                            <FaTelegram className="mr-2 w-5 h-5 text-blue-500"/>
                                            Telegram
                                        </h6>
                                        <span className="text-gray-600">{user.tgUserName}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <span className="font-semibold">Name</span>
                                        <span className="text-gray-600">{user.name}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">Email</span>
                                        <span className="text-gray-600">{user.email}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">Current score</span>
                                        <span
                                            className="text-gray-600">{user.currentScore ? user.currentScore : '0'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">All time score</span>
                                        <span
                                            className="text-gray-600">{user.allTimeScore ? user.allTimeScore : '0'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">Receive telegram notifications</span>
                                        <span
                                            className="text-gray-600">{user.receiveTgNotification ? 'Yes' : 'No'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">Receive email notifications</span>
                                        <span
                                            className="text-gray-600">{user.receiveEmailNotification ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <a href="/edit"
                                       className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )

    else return (
        <NotFoundPage/>
    )

}
