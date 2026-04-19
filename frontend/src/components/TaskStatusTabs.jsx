import React from 'react'

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div className='my-2'>
            <div className='flex overflow-x-auto scrollbar-hide gap-1 sm:gap-2 px-1'>

                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        onClick={() => setActiveTab(tab.label)}
                        className={`relative shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${activeTab === tab.label
                                ? 'text-primary bg-primary/10'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                            }`}
                    >
                        <div className='flex items-center gap-1.5'>
                            <span>{tab.label}</span>

                            <span
                                className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full ${activeTab === tab.label
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-300/70 text-gray-700'
                                    }`}
                            >
                                {tab.count}
                            </span>
                        </div>

                        {activeTab === tab.label && (
                            <div className='absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full'></div>
                        )}
                    </button>
                ))}

            </div>
        </div>
    )
}

export default TaskStatusTabs