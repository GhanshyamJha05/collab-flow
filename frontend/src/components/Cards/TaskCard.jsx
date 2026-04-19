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
        <div className='w-full max-w-full sm:max-w-md mx-auto bg-white rounded-xl sm:rounded-2xl py-3 sm:py-4 shadow-md shadow-gray-200 border border-gray-300/50 cursor-pointer' onClick={onClick}>

            {/* Tags */}
            <div className='flex items-center gap-2 px-3 sm:px-4 flex-wrap'>
                <div className={`text-[10px] sm:text-[11px] font-medium ${getStatusTagColor()} px-3 sm:px-4 py-0.5 rounded`}>
                    {status}
                </div>

                <div className={`text-[10px] sm:text-[11px] font-medium ${getPriorityTagColor()} px-3 sm:px-4 py-0.5 rounded`}>
                    {priority} Priority
                </div>
            </div>

            {/* Content */}
            <div className={`px-3 sm:px-4 border-l-[3px] mt-2 ${status === "In Progress"
                ? "border-cyan-600"
                : status === "Completed"
                    ? "border-indigo-600"
                    : "border-violet-600"
                }`}>

                <p className='text-sm sm:text-base font-medium text-gray-900 mt-3 line-clamp-2'>
                    {title}
                </p>

                <p className='text-xs sm:text-sm text-gray-600 mt-1.5 line-clamp-2 leading-5'>
                    {description}
                </p>

                <p className='text-xs sm:text-[13px] text-gray-800/90 font-medium mt-2 mb-2'>
                    Task Done:{" "}
                    <span className='font-semibold text-gray-800'>
                        {completedTodoCount} / {todoChecklist.length || 0}
                    </span>
                </p>

                <Progress progress={progress} status={status} />
            </div>

            {/* Dates */}
            <div className='px-3 sm:px-4 mt-2'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                    <div>
                        <label className='text-[11px] sm:text-xs text-gray-600'>Start Date</label>
                        <p className='text-xs sm:text-[13px] text-gray-900 font-medium'>
                            {moment(createdAt).format("Do MMM YYYY")}
                        </p>
                    </div>

                    <div>
                        <label className='text-[11px] sm:text-xs text-gray-600'>Due Date</label>
                        <p className='text-xs sm:text-[13px] text-gray-900 font-medium'>
                            {moment(dueDate).format("Do MMM YYYY")}
                        </p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-2'>
                    <AvatarGroup avatars={assignedTo || []} />

                    {attachmentCount > 0 && (
                        <div className='flex items-center gap-1.5 bg-blue-100 px-2 py-1 rounded-xl w-fit'>
                            <LuPaperclip className='text-primary text-sm' />
                            <span className='text-[11px] sm:text-xs text-gray-900'>
                                {attachmentCount}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskCard