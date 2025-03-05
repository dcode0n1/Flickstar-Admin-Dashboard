import React from 'react';

export default function UserSkeleton({ count = 6 }) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center border rounded-md p-2 space-x-2 animate-pulse"
                >
                    {/* Image skeleton */}
                    <div className="w-12 h-12 bg-gray-300 rounded-full" />

                    {/* Text skeleton */}
                    <div className="flex flex-col justify-center space-y-2 flex-1">
                        {/* Name placeholder */}
                        <div className="w-1/2 h-4 bg-gray-300 rounded" />
                        {/* Date placeholder */}
                        <div className="w-1/3 h-3 bg-gray-300 rounded" />
                    </div>
                </div>
            ))}
        </>
    );
}
