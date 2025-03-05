import CardWrapper from '@/components/Card'
import { baseURL } from '@/lib/axioxWithAuth';
import { getFetcher } from '@/lib/fetcher';
import { Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import SkeletonLoaderLoggedInDevices from './skeleton/SkeletonLoaderLoggedInDevices';

interface UserSession {
    _id: string;
    os: string;
    device: string;
    updatedAt: string;
}

interface ApiResponse {
    USERSESSIONS: UserSession[];
}

export default function UserSessions() {
    const { id } = useParams();
    const { data, error } = useSWR<ApiResponse>(`${baseURL}/user-session/${id}`, getFetcher);

    if (error) return <div>Error loading user details.</div>;
    if (!data) return <SkeletonLoaderLoggedInDevices />;

    const { USERSESSIONS } = data;
    return (
        <CardWrapper name="Logged in Devices">
            {USERSESSIONS?.map((session, index) => {
                return (
                    <div className="flex items-center justify-between p-4" key={index}>
                        <div className="flex flex-col text-xs space-y-0.5">
                            <span className='font-semibold'>{session.device}</span>
                            <span>{session.os}</span>
                            <span className='italic'>{new Date(session.updatedAt).toLocaleString()}</span>
                        </div>
                        <button className="p-1 text-white bg-red-500 hover:bg-red-600 rounded-sm">
                            <Trash2 />
                        </button>
                    </div>
                )
            })}
        </CardWrapper>
    )
}
