import React, {useEffect, useState} from 'react';
import {userService} from "../../services/user.service";
import {IUser} from "../../types/auth.types";
import {observer} from "mobx-react-lite";
import {Modal} from "../../components/Modal";
import {CreateUser} from "../../components/user/CreateUser";
import {FaTrash} from "react-icons/fa";
import {FaPencil} from "react-icons/fa6";
import {UpdateUser} from "../../components/user/UpdateUser";

export default observer(function UserManagementPage() {
    const [users, setUsers] = useState<IUser[]>([])
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
    const [createModal, setCreateModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)

    useEffect(() => {
        async function fetchUsers() {
            try {
                const usersData = await userService.getAllUsers();
                setUsers(usersData.list);
            } catch (e) {
                console.error('Error fetching users data:', e);
            }
        }

        fetchUsers();

    }, [])

    async function deleteHandler(id: number) {
        try {
            const response = userService.deleteUser(id)
        } catch (e) {
            console.log(e)
        }
    }

    function openUpdateModal(user: IUser) {
        setSelectedUser(user);
        setUpdateModal(true);
    }

    function closeUpdateModal() {
        setSelectedUser(null);
        setUpdateModal(false);
    }

    return (
        <div className="h-auto mt-20 px-10 md:px-20 lg:px-32">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">User management</h1>

                <button onClick={() => setCreateModal(true)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4">
                    Create user
                </button>

                {createModal &&
                    <Modal title="Create new user" onClose={() => setCreateModal(false)}>
                        <CreateUser onClose={() => setCreateModal(false)}/>
                    </Modal>
                }

                {selectedUser &&
                    <Modal title="Update user" onClose={closeUpdateModal}>
                        <UpdateUser user={selectedUser} onClose={closeUpdateModal}/>
                    </Modal>
                }

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map(user => (
                        <div key={user.id} className="bg-white rounded-lg shadow-md p-4 md:p-4 mb-6">
                            <p className="text-lg font-semibold mb-1">ID: {user.id}</p>
                            <p className="text-gray-700 mb-1"><strong>Name:</strong> {user.name}</p>
                            <p className="text-gray-700 mb-1"><strong>Email:</strong> {user.email}</p>
                            <div className="flex items-center mb-1">
                                <strong className="mr-2">Roles:</strong>
                                <div className="flex flex-wrap">
                                    {user.roles.map((role, index) => (
                                        <span key={index}
                                              className={`rounded-full px-2 py-1 text-xs mr-2 mb-2 ${role === 'ADMIN' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
                                        {role}
                                    </span>
                                    ))}
                                </div>
                            </div>

                            <button onClick={(e) => {
                                e.preventDefault()
                                deleteHandler(user.id)
                                window.location.reload()
                            }}
                                    className='mr-1 p-2 rounded text-red-600 hover:text-white hover:bg-red-600'>
                                <FaTrash/>
                            </button>

                            <button onClick={() => openUpdateModal(user)} className='p-2.5 rounded hover:bg-gray-300'>
                                <FaPencil/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
})
