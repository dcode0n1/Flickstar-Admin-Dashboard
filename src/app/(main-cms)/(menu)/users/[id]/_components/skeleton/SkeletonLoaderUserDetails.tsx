import CardWrapper from '@/components/Card'
import React from 'react'

export default function SkeletonLoaderUserDetails() {
    return (
        <CardWrapper name="User Details">
            <div className="flex flex-col items-center justify-center text-sm p-2 animate-pulse">
                <div className="rounded-full w-24 h-24 bg-gray-300"></div>
                <div className="w-32 h-4 bg-gray-300 rounded mt-2"></div>
                <div className="w-40 h-3 bg-gray-300 rounded mt-1"></div>
            </div>
            <div className="bg-gray-50 m-3 p-4 space-y-2">
                <div className="font-semibold text-slate-800 py-2">User Information</div>
                <div className="text-sm divide-y divide-black-500 border">
                    {Array.from({ length: 7 }).map((_, index) => (
                        <div key={index} className="flex justify-between items-center flex-wrap gap-2 p-2">
                            <span className="w-20 h-4 bg-gray-300 rounded"></span>
                            <span className="w-24 h-4 bg-gray-300 rounded"></span>
                        </div>
                    ))}
                </div>
            </div>
        </CardWrapper>
    )
}

