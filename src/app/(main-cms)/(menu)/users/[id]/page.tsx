"use client"
import CustomBreadCrumb from '@/components/ui/custom-breadcrumbs'
import { UserDetailsBreadCrumbs } from '@/constants/bread-crumbs'
import React from 'react'
import CardWrapper from '@/components/Card'
import Link from 'next/link'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function UsersDetailPage() {
    const {id} = useParams()
    const [currentTab, setCurrentTab] = useState<'followers' | 'following'>('followers')
    return (
        <>
            <div className="flex justify-between p-4 bg-white">
                <h1 className="text-sm font-bold text-gray-700">USER DETAILS</h1>
                <CustomBreadCrumb data={UserDetailsBreadCrumbs} />
            </div>
            <div className="p-5 bg-slate-100">
                <div className="grid lg:grid-cols-[0.75fr_2.25fr] grid-cols-1 gap-5">
                    <div className="flex flex-col space-y-2">
                        <CardWrapper name="User Details">
                            <div className="flex flex-col items-center justify-center text-sm p-2">
                                <img src="https://placehold.co/150x150" alt="seller" className="rounded-full w-24 h-24 border-black border-double" />
                                <span>Rakshak Khandelwal</span>
                                <span className="font-normal">
                                    Joining Date : {new Date("2025-02-27T10:21:07.349+00:00").toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                </span>
                            </div>
                            <div className="bg-gray-50 m-3 p-4 space-y-2">
                                <div className="font-semibold text-slate-800 py-2">User Information</div>
                                <div className="text-sm divide-y divide-black-500 border">
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>Username</span>
                                        <span>ITMsJarvis</span>
                                    </div>
                                    <div className="flex justify-between items-center gap-2 p-2">
                                        <span>Flickstar Id</span>
                                        <span>679ad8115a8c37f7e60e1bd6</span>
                                    </div>
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>Phone</span>
                                        <Link href="tel:+916376877564" className='text-green-500'>+916376877564</Link>
                                    </div>
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>Email</span>
                                        <Link href="mailto:dcode.0n1@outlook.com" className='text-blue-500'>dcode.0n1@outlook.com</Link>
                                    </div>
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>Gender</span>
                                        <span>Male</span>
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
                                        <span>Description</span>
                                        <span className='text-xs'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio quia ducimus atque accusantium beatae dolorum porro iste rerum omnis maiores?</span>
                                    </div>
                                </div>
                            </div>
                        </CardWrapper>
                        <div className="bg-white  rounded-sm">
                            <div className="flex flex-col justify-center gap-2 p-2 text-sm">
                                <Link href={`/send-mail/${id}`}className='px-3 py-2 text-white text-center bg-purple-400 hover:bg-purple-500 rounded-sm'>Send Mail</Link>
                                <Link href={`/send-notification/${id}`} className='px-3 py-2 text-white text-center bg-purple-400 hover:bg-purple-500 rounded-sm'>Send Notification</Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <CardWrapper name="Followers & Following">
                            <div className="grid grid-cols-2 space-y-2">
                                <button onClick={() => setCurrentTab('followers')} className={currentTab == "followers" ? 'text-purple-500 border-b-2 border-purple-500 px-3 py-2' : undefined}>Followers</button>
                                <button onClick={() => setCurrentTab('following')} className={currentTab == "following" ? 'text-purple-500 border-b-2 border-purple-500 px-3 py-2' : undefined}> Following</button>
                            </div>
                            <div className='px-2'>
                                <label className="text-xs">
                                    Limit
                                    <select className="mx-2 p-1 border rounded-xl">
                                        <option>10</option>
                                        <option>25</option>
                                        <option>50</option>
                                        <option>100</option>
                                    </select>
                                    Entries
                                </label>
                            </div>
                        </CardWrapper>
                        <CardWrapper name="Flicks">
                            Table Content
                        </CardWrapper>
                        <CardWrapper name="Logged in Devices">
                            {[1, 2, 3, 4, 5].map((_,index) => {
                                return (<div className="flex  items-center justify-between p-4" key={index}>
                                    <div className="flex flex-col text-xs space-y-0.5">
                                        <span className='font-semibold'>Chrome 133.0.0</span>
                                        <span >Windows 10.0.0s</span>
                                        <span className='italic'> February 25th 2025, 5:03:32 pm</span>
                                    </div>
                                    <button className="p-1  text-white bg-red-500 hover:bg-red-600  rounded-sm"><Trash2 /></button>
                                </div>)
                            })}
                        </CardWrapper>
                    </div>
                </div>
            </div>
        </>
    )
}
