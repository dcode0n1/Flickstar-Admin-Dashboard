"use client"
import CustomBreadCrumb from '@/components/ui/custom-breadcrumbs'
import { UserDetailsBreadCrumbs } from '@/constants/bread-crumbs'
import React from 'react'
import CardWrapper from '@/components/Card'
import Link from 'next/link'
import { useState } from 'react'

export default function UsersPage() {
    const [currentTab, setCurrentTab] = useState<'followers' | 'following'>('followers')
    const data = {
        SELLERDETAILS: {
            status: true
        }
    }
    return (
        <>
            <div className="flex justify-between p-4">
                <h1 className="text-sm font-bold text-gray-700">USER DETAILS</h1>
                <CustomBreadCrumb data={UserDetailsBreadCrumbs} />
            </div>
            <div className="p-5 bg-slate-100">
                <div className="grid lg:grid-cols-[0.75fr_2.25fr] grid-cols-1 gap-5">
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
                        <div className="bg-gray-50 m-3 p-4">
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
                                    <span className={`text-gray-600 text-xs px-1.5 rounded ${data?.SELLERDETAILS?.status ? 'bg-green-500 text-white' : 'bg-red-100 text-red-600'}`}>
                                        {data?.SELLERDETAILS?.status ? "True" : "False"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                    <span>Description</span>
                                    <span className='text-xs'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio quia ducimus atque accusantium beatae dolorum porro iste rerum omnis maiores?</span>
                                </div>
                            </div>
                        </div>
                    </CardWrapper>
                    <div className="bg-white rounded-sm space-y-2">
                        <div className="grid grid-cols-2">
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
                        {currentTab == 'followers' ? (
                            <>
                               
                            </>
                        ) : (<>

                        </>)}
                    </div>
                </div>
            </div>
        </>
    )
}
