import React from 'react';

const CommentCard = ({ c }) => {
    const { userName, userEmail, comment, userPhoto } = c
    return (
        <div className="p-3  bg-gray-100 text-gray-900">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-2 md:flex-row md:items-center">
                <img src={userPhoto} alt="" className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start bg-gray-500 border-gray-700" />
                <div className="flex flex-col">
                    <h4 className="text-lg font-semibold text-center md:text-left">{userName}</h4>
                    <p className="text-gray-400">{comment}</p>
                </div>
            </div>

        </div>

    );
};

export default CommentCard;