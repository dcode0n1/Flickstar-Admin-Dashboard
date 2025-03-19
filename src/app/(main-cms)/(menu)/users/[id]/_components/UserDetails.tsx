import CardWrapper from '@/components/Card'
import { baseURL } from '@/lib/axioxWithAuth';
import { getFetcher } from '@/lib/fetcher';
import Link from 'next/link'
import { useParams } from 'next/navigation';
import React from 'react'
import useSWR from 'swr';
import SkeletonLoaderUserDetails from './skeleton/SkeletonLoaderUserDetails';

interface UserDetails {
    _id: string;
    name: string;
    email: string;
    username: string;
    photo: string;
    phone: string;
    balance: number;
    dob: string;
    gender: string;
    warnedCount: number;
    suspended: boolean;
    suspendedReason: string;
    createdAt: string;
}

interface ApiResponse {
    USERDETAILS: UserDetails;
}

export default function UserDetails() {
    const { id } = useParams();
    const { data, error } = useSWR<ApiResponse>(`${baseURL}/user/${id}`, getFetcher);
    if (error) return <div>Error loading user details.</div>;
    if (!data) return <SkeletonLoaderUserDetails />;
    const { USERDETAILS } = data;
    return (
        <CardWrapper name="User Details">
            <div className="flex flex-col items-center justify-center text-sm p-2">
                <img src={USERDETAILS.photo || "https://placehold.co/150x150"} alt="seller" className="rounded-full w-24 h-24 border-black border-double" />
                <span>{USERDETAILS.name || 'Flickstar Name'}</span>
                <span className="font-normal">
                    Joining Date : {new Date(USERDETAILS.createdAt).toLocaleDateString('en-US', {
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
                        <span>{USERDETAILS.username}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2 p-2 ">
                        <span>Flickstar Id</span>
                        <span >{USERDETAILS._id}</span>
                    </div>
                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                        <span>Phone</span>
                        <Link href={`tel:${USERDETAILS.phone}`} className='text-green-500'>{USERDETAILS.phone}</Link>
                    </div>
                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                        <span>Email</span>
                        <Link href={`mailto:${USERDETAILS.email}`} className='text-blue-500'>{USERDETAILS.email}</Link>
                    </div>
                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                        <span>Gender</span>
                        <span>{USERDETAILS.gender}</span>
                    </div>
                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                        <span>Balance</span>
                        <span>{USERDETAILS.balance}</span>
                    </div>
                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                        <span>Warned Count</span>
                        <span>{USERDETAILS.warnedCount}</span>
                    </div>
                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                        <span>DOB</span>
                        <span>{USERDETAILS.dob}</span>
                    </div>
                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                        <span>Description</span>
                        <span className='text-xs'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio quia ducimus atque accusantium beatae dolorum porro iste rerum omnis maiores?</span>
                    </div>
                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                        <span>Suspended</span>
                        <label className="relative inline-block h-4 w-7 cursor-pointer rounded-full bg-gray-300 transition has-[:checked]:bg-purple-800">
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={USERDETAILS.suspended}
                                onChange={() => { }}
                            />
                            <span className="absolute inset-y-0 start-0 m-0.5 w-3 h-3 rounded-full bg-gray-300 ring-[4px] ring-inset ring-white transition-all peer-checked:translate-x-3 peer-checked:bg-white peer-checked:ring-transparent" />
                        </label>
                    </div>
                    {USERDETAILS.suspended && (
                        <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                            <span>Suspended Reason</span>
                            <span>{USERDETAILS.suspendedReason}</span>
                        </div>
                    )}
                </div>
            </div>
        </CardWrapper>
    );
}
