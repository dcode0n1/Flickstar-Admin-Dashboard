import { HeartFilledIcon } from '@radix-ui/react-icons'
import React from 'react'

export default function CommentBox() {
    return (
        <>
            <div className="flex space-x-2 items-center">
                <img src="https://placehold.co/150x150" className='w-8 h-8 rounded-full' />
                <div className="flex flex-col space-y-0.5 text-xs">
                    <span>Dua Lipa <span className="text-slate-700">32 sec</span></span>
                    <span>
                        Hey man how are you ?
                    </span>
                    <span>
                        Reply?
                    </span>
                </div>
            </div>
            <div className="flex flex-col space-y-0.5 text-xs items-center">
                <HeartFilledIcon className="w-6 h-5 text-red-500" />
                <span>50</span>
            </div>
        </>
    )
}
