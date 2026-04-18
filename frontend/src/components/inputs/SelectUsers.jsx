import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuUsers } from 'react-icons/lu';
import Model from '../Model';
import AvatarGroup from '../AvatarGroup';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {

    const [allUsers, setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);

            if (response.data?.length > 0) {
                setAllUsers(response.data)
            }
        } catch (error) {
            console.error("Error fetching users: ", error);
        }
    }

    const toggleUserSelection = (userId) => {
        setTempSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        )
    }

    const handleAssign = () => {
        setSelectedUsers(tempSelectedUsers);
        setIsModalOpen(false);
    }

    const selectedUserAvatars = allUsers
        .filter((user) => selectedUsers.includes(user._id))
        .map((user) => ({
            image: user.profileImageUrl || null,
            name: user.name || ""
        }))

    useEffect(() => {
        getAllUsers();
    }, [])

    useEffect(() => {
        if (selectedUsers.length === 0) {
            setTempSelectedUsers([])
        }
        return () => { }
    }, [selectedUsers])

    return (
        <div className='space-y-4 mt-2'>
            {selectedUserAvatars.length === 0 && (
                <button className='card-btn' onClick={() => setIsModalOpen(true)}>
                    <LuUsers className='text-sm' /> Add Members
                </button>
            )}

            {selectedUserAvatars.length > 0 && (
                <div className='cursor-pointer' onClick={() => setIsModalOpen(true)}>
                    <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
                </div>
            )}

            <Model
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Select Users"
            >
                <div className='space-y-4 h-[60vh] overflow-y-auto'>
                    {allUsers.map((user) => (
                        <div
                            key={user._id}
                            className='flex items-center gap-4 p-3 border-b border-gray-300'
                        >
                            {user.profileImageUrl ? (
                                <img
                                    src={user.profileImageUrl}
                                    alt={user.name}
                                    className='w-10 h-10 rounded-full'
                                />
                            ) : (
                                <div className='w-10 h-10 flex items-center justify-center bg-primary text-white text-sm font-bold rounded-full'>
                                    {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                                </div>
                            )}
                            
                            <div className='flex-1'>
                                <p className='font-medium text-gray-900 dark:text-black'>
                                    {user.name}
                                </p>
                                <p className='text-[13px] text-gray-600'>{user.email}</p>
                            </div>

                            <input
                                type="checkbox"
                                checked={tempSelectedUsers.includes(user._id)}
                                onChange={() => toggleUserSelection(user._id)}
                                className='w-4 h-4 text-primary bg-gray-200 border-gray-400 rounded-2xl outline-none'
                            />
                        </div>
                    ))}
                </div>

                <div className='flex justify-end gap-4 pt-4'>
                    <button className='card-btn' onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </button>
                    <button className='card-btn-fill' onClick={handleAssign}>
                        Done
                    </button>
                </div>
            </Model>
        </div>
    )
}

export default SelectUsers