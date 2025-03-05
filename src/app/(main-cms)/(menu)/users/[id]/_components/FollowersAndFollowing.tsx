import React, { useState } from 'react';
import useSWR from 'swr';
import CardWrapper from '@/components/Card';
import { baseURL } from '@/lib/axioxWithAuth';
import { getFetcher } from '@/lib/fetcher';
import { useParams } from 'next/navigation';
import UserSkeleton from './skeleton/SkeletonLoaderUserFollowers';

interface UserFollowing {
    _id: string;
    createdAt: string;
    following: {
        username: string;
        photo: string;
    };
}

interface UserFollowers {
    _id: string;
    createdAt: string;
    follower: {
        username: string;
        photo: string;
    };
}

interface ApiResponseFollowing {
    USERFOLLOWING: UserFollowing[];
}

interface ApiResponseFollowers {
    USERFOLLOWERS: UserFollowers[];
}

export default function FollowersAndFollowing() {
    const { id } = useParams();
    const [currentTab, setCurrentTab] = useState<'followers' | 'following'>('followers');

    // Determine API endpoint based on tab selection
    const endpoint =
        currentTab === 'followers'
            ? `${baseURL}/user-follower/${id}`
            : `${baseURL}/user-following/${id}`;

    // Fetch data from API
    const { data, error } = useSWR<ApiResponseFollowers | ApiResponseFollowing>(endpoint, getFetcher);

    console.log(data)

    // Extract relevant user list from API response
    const users =
        currentTab === 'followers'
            ? (data as ApiResponseFollowers)?.USERFOLLOWERS || []
            : (data as ApiResponseFollowing)?.USERFOLLOWING || [];

    return (
        <CardWrapper name="Followers & Following" className="space-y-1">
            {/* Tab Selection */}
            <div className="grid grid-cols-2">
                <button
                    onClick={() => setCurrentTab('followers')}
                    className={currentTab === 'followers' ? 'text-purple-500 border-b-2 border-purple-500 px-3 py-2' : undefined}
                >
                    Followers
                </button>
                <button
                    onClick={() => setCurrentTab('following')}
                    className={currentTab === 'following' ? 'text-purple-500 border-b-2 border-purple-500 px-3 py-2' : undefined}
                >
                    Following
                </button>
            </div>

            {/* Entry Limit Selection */}
            <div className="px-2">
                <label className="text-xs">
                    Limit
                    <select className="mx-2 p-1 border rounded-xl">
                        {[10, 25, 50, 100].map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                    Entries
                </label>
            </div>

            {/* Followers / Following List */}
            <div className="p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {error ? (
                    <p className="text-center text-red-500">Failed to load data.</p>
                ) : users.length > 0 ? (
                    users.map((user, index) => {
                        const userData = currentTab === 'followers' ? (user as UserFollowers).follower : (user as UserFollowing).following;
                        return (
                            <div key={user._id} className="flex justify-between items-center border rounded-md p-2 space-x-2">
                                <img
                                    src={userData.photo || 'https://placehold.co/40x40'}
                                    alt={userData.username}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex flex-col justify-center">
                                    <span className="text-sm">{userData.username}</span>
                                    <span className="text-[10px] lg:text-xs">
                                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true,
                                        })}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <UserSkeleton count={10} />
                )}
            </div>
        </CardWrapper>
    );
}
