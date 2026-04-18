import React from 'react'

const AvatarGroup = ({ avatars, maxVisible = 3 }) => {
    return (
        <div className='flex items-center'>
            {avatars.slice(0, maxVisible).map((avatar, index) => {

                // image ya naam dono cases handle karo
                const imageUrl = typeof avatar === 'string' ? avatar : avatar?.image;
                const name = typeof avatar === 'object' ? avatar?.name : "";
                const firstLetter = name ? name.charAt(0).toUpperCase() : "?";

                return imageUrl ? (
                    // agar image hai toh image dikhao
                    <img
                        key={index}
                        src={imageUrl}
                        alt={`Avatar ${index}`}
                        className='w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0'
                    />
                ) : (
                    // agar image nahi hai toh pehla letter dikhao
                    <div
                        key={index}
                        className='w-9 h-9 flex items-center justify-center bg-primary text-white text-sm font-medium rounded-full border-2 border-white -ml-3 first:ml-0'
                    >
                        {firstLetter}
                    </div>
                );
            })}

            {avatars.length > maxVisible && (
                <div className='w-9 h-9 flex items-center justify-center bg-blue-100 text-sm font-medium rounded-full border-2 border-white -ml-3'>
                    +{avatars.length - maxVisible}
                </div>
            )}
        </div>
    )
}

export default AvatarGroup