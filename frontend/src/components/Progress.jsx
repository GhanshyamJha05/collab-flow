import React from 'react'

const Progress = ({ progress, status }) => {

    const getColor = () => {
        switch (status) {
            case "In Progress":
                return "text-cyan-600 bg-cyan-600 border border-cyan-600/10";
            case "Completed":
                return 'text-indigo-600 bg-indigo-600 border border-indigo-600/10';
            default:
                return 'text-violet-600 bg-violet-600 border border-violet-600/10';
        }
    }

    return (
        <div className='w-full bg-gray-300 rounded-full h-1.5'>
            <div className={`${getColor()} h-1.5 rounded-full text-center text-xs font-medium`} style={{ width: `${progress}%` }}></div>
        </div>
    )
}

export default Progress