"use client"
import CustomBreadCrumb from '@/components/ui/custom-breadcrumbs'
import { UserDetailsBreadCrumbs } from '@/constants/bread-crumbs'
import React from 'react'
import CardWrapper from '@/components/Card'
import Link from 'next/link'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { z } from 'zod'
import useSWR from 'swr'
import { baseURL } from '@/lib/axioxWithAuth'
import { getFetcher } from '@/lib/fetcher'
import UserDetails from './_components/UserDetails'
import FollowersAndFollowing from './_components/FollowersAndFollowing'
import UserFlicks from './_components/UserFlicks'
import UserSessions from './_components/UserSessions'


export default function UsersDetailPage() {
    const { id } = useParams()
    return (
        <>
            <div className="flex justify-between p-4 bg-white">
                <h1 className="text-sm font-bold text-gray-700">USER DETAILS</h1>
                <CustomBreadCrumb data={UserDetailsBreadCrumbs} />
            </div>
            <div className="p-5 bg-slate-100">
                <div className="grid lg:grid-cols-[0.75fr_2.25fr] grid-cols-1 gap-5">
                    <div className="flex flex-col space-y-2">
                        <UserDetails />
                        <div className="bg-white  rounded-sm">
                            <div className="flex flex-col justify-center gap-2 p-2 text-sm">
                                <Link href={`/send-mail/${id}`} className='px-3 py-2 text-white text-center bg-purple-400 hover:bg-purple-500 rounded-sm'>Send Mail</Link>
                                <Link href={`/send-notification/${id}`} className='px-3 py-2 text-white text-center bg-purple-400 hover:bg-purple-500 rounded-sm'>Send Notification</Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <FollowersAndFollowing />
                        <UserFlicks/>
                        <UserSessions/>
                    </div>
                </div>
            </div>
        </>
    )
}
