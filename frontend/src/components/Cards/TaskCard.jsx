import React from 'react';
import Progress from '../Progress.jsx';
import AvatarGroup from '../AvatarGroup.jsx';
import moment from 'moment';
import { LuPaperclip } from 'react-icons/lu';

const TaskCard = ({ title, description, priority, status, progress, createdAt, dueDate, assignedTo, attachmentCount, completedTodoCount, todoChecklist, onClick }) => {

    const getStatusTagColor = () => {
        switch (status) {
            case "In Progress":
                return 'text-cyan-600 bg-cyan-100 border border-cyan-600/10';
            case "Completed":
                return 'text-lime-600 bg-lime-100 border border-lime-600/10';
            default:
                return 'text-violet-600 bg-violet-100 border border-violet-600/10';
        }
    }

    const getPriorityTagColor = () => {
        switch (priority) {
            case "Low":
                return 'text-emerald-600 bg-emerald-100 border border-emerald-600/10';
            case "Medium":
                return 'text-amber-600 bg-amber-100 border border-amber-600/10';
            default:
                return 'text-rose-600 bg-rose-100 border border-rose-600/10';
        }
    }

    return (
        <div className='h-full flex flex-col justify-between bg-white rounded-2xl py-4 shadow-md shadow-gray-200 border border-gray-300/50 cursor-pointer' onClick={onClick}>
            <div className='flex items-end gap-3 px-4'>
                <div className={`text-[11px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded`}>
                    {status}
                </div>

                <div className={`test-[11px] font-medium ${getPriorityTagColor()} px-4 py-0.5 rounded`}>
                    {priority} Priority
                </div>
            </div>

            <div className={`px-4 border-l-[3px] ${status === "In Progress"
                ? "border-cyan-600"
                : status === "Completed"
                    ? "border-indigo-600"
                    : "border-violet-600"
                }`}>
                <p className='text-sm font-medium text-gray-900 mt-4 line-clamp-2'>
                    {title}
                </p>

                <p className='text-xs text-gray-600 mt-1.5 line-clamp-2 leading-4.5'>
                    {description}
                </p>

                <p className='text-[13px] text-gray-800/90 font-medium mt-2 mb-2 leading-4.5'>
                    Task Done:{" "}
                    <span className='font-semibold text-gray-800'>
                        {completedTodoCount} / {todoChecklist.length || 0}
                    </span>
                </p>

                <Progress progress={progress} status={status} />
            </div>

            <div className='px-4'>
                <div className='flex items-center justify-between my-1'>
                    <div>
                        <label className='text-xs text-gray-600'>Start Date</label>
                        <p className='text-[13px] text-gray-900 font-medium'>
                            {moment(createdAt).format("Do MMM YYYY")}
                        </p>
                    </div>

                    <div>
                        <label className='text-xs text-gray-600'>Due Date</label>
                        <p className='text-[13px] text-gray-900 font-medium'>
                            {moment(dueDate).format("Do MMM YYYY")}
                        </p>
                    </div>
                </div>

                <div className='flex items-center justify-between mt-3'>
                    <AvatarGroup avatars={assignedTo || []} />

                    {attachmentCount > 0 && (
                        <div className='flex items-center gap-2 bg-blue-100 px-2.5 py-1.5 rounded-2xl'>
                            <LuPaperclip className='text-primary' />{" "}
                            <span className='text-xs text-gray-900'>{attachmentCount}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskCard