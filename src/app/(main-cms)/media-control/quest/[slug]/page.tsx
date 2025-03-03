"use client"
import CustomBreadCrumb from '@/components/ui/custom-breadcrumbs'
import { MediaControlQuestDetailBreadCrumbs } from '@/constants/bread-crumbs'
import React from 'react'
import CardWrapper from '@/components/Card'
import { useParams } from 'next/navigation'
export default function MediaControlQuestDetails() {
    const { slug } = useParams()
    return (
        <>
            <div className="flex justify-between p-4 bg-white">
                <h1 className="text-sm font-bold text-gray-700">QUEST DETAILS</h1>
                <CustomBreadCrumb data={MediaControlQuestDetailBreadCrumbs} />
            </div>
            <div className="p-5 bg-slate-100">
                <div className="grid lg:grid-cols-[0.75fr_2.25fr] grid-cols-1 gap-5">
                    <div className="flex flex-col space-y-2">
                        <CardWrapper name={`Quest ${slug}`}>
                            <div className="flex flex-col items-center justify-center text-sm p-2">
                                <img src="https://placehold.co/150x150" alt="user" className="rounded-full w-24 h-24 border-black border-double" />
                                <span> Created By : Rakshak Khandelwal</span>
                            </div>
                            <div className="bg-gray-50 m-3 p-4 space-y-2">
                                <div className="font-semibold text-slate-800 py-2">Quest Information</div>
                                <div className="text-sm divide-y divide-black-500 border">
                                    <div className="flex justify-between items-center gap-2 p-2">
                                        <span>Quest Id</span>
                                        <span>679ad8115a8c37f7e60e1bd6</span>
                                    </div>
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>CreatedAt</span>
                                        <span className="font-normal">
                                            {new Date("2025-02-27T10:21:07.349+00:00").toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>Mode</span>
                                        <span>GoFlick</span>
                                    </div>
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>Location</span>
                                        <span>USA</span>
                                    </div>
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>Media Count</span>
                                        <span>6</span>
                                    </div>
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>Max Applicants</span>
                                        <span>6</span>
                                    </div>
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>Total Amount Spend</span>
                                        <span>600</span>
                                    </div>
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>Suspended</span>
                                        < label className="relative inline-block h-4 w-7 cursor-pointer rounded-full bg-gray-300 transition has-[:checked]:bg-purple-800" >
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                                checked={true}
                                                onChange={() => { }}
                                            />
                                            <span className="absolute inset-y-0 start-0 m-0.5 w-3 h-3 rounded-full bg-gray-300 ring-[4px] ring-inset ring-white transition-all peer-checked:translate-x-3 peer-checked:bg-white peer-checked:ring-transparent" />
                                        </label>
                                    </div>
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>Suspended Reason</span>
                                        <span className="text- xs">This is the suspended reason</span>
                                    </div>
                                </div>
                            </div>
                        </CardWrapper>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <CardWrapper name="Quest Content">
                            <div className="flex flex-col justify-center items-center space-y-4 p-4">
                                <video data-v-9aab0c80="" src="https://pub-aa383e5eb02f497fa63b84a7f8fed85b.r2.dev/reels/67c0023159032ea54306b41d/1740636721080-9721273074242782-DC76E062-4D9E-4E67-B168-36DF20DC72FD.mp4" className="w-1/2 h-96" controls={true}>Your browser does not support the video tag.</video>
                                <div className=" w-1/2 p-2 rounded-md flex justify-between items-center border text-wrap">
                                    <span className='font-semibold'>Description :</span>
                                    <span className='text-xs'>This is the description of the quest</span>
                                </div>
                            </div>
                        </CardWrapper>
                    </div>
                </div>
            </div>
        </>
    )
}
