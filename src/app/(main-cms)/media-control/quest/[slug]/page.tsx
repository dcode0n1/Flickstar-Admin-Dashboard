"use client"
import CustomBreadCrumb from '@/components/ui/custom-breadcrumbs'
import { MediaControlQuestDetailBreadCrumbs } from '@/constants/bread-crumbs'
import React from 'react'
import CardWrapper from '@/components/Card'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { baseURL } from '@/lib/axioxWithAuth'
import { getFetcher } from '@/lib/fetcher'
export default function MediaControlQuestDetails() {
    const { slug } = useParams()
    const { data, error } = useSWR(`${baseURL}/media-control/quest/${slug}`, getFetcher);
    const videoExts = /\.(mp4|avi|mov|mkv|flv|wmv|webm|m4v)$/i;
    const photoExts = /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg)$/i;
    console.log(data)
    if (error) return <div>Error loading user details.</div>;
    if (!data) return <div>Loading ....</div>;
    const { QUESTDETAILS } = data;
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
                                <img src={QUESTDETAILS.staff.photo || "https://placehold.co/150x150"} alt="user" className="rounded-full w-24 h-24 border-black border-double" />
                                <span> Created By : {QUESTDETAILS.staff.name || QUESTDETAILS.user.name}</span>
                            </div>
                            <div className="bg-gray-50 m-3 p-4 space-y-2">
                                <div className="font-semibold text-slate-800 py-2">Quest Information</div>
                                <div className="text-sm divide-y divide-black-500 border">
                                    <div className="flex justify-between items-center gap-2 p-2">
                                        <span>Quest Id</span>
                                        <span>{slug}</span>
                                    </div>
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>CreatedAt</span>
                                        <span className="font-normal">
                                            {new Date(QUESTDETAILS.createdAt || null).toLocaleDateString('en-US', {
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
                                        <span>{QUESTDETAILS.mode}</span>
                                    </div>
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>Location</span>
                                        <span>{QUESTDETAILS.location}</span>
                                    </div>
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>Media Count</span>
                                        <span>{QUESTDETAILS.media.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>Max Applicants</span>
                                        <span>{QUESTDETAILS.maxApplicants}</span>
                                    </div>
                                    <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                                        <span>Total Amount Spend</span>
                                        <span>{QUESTDETAILS.totalAmount}</span>
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
                                <div className="grid grid-cols-3 gap-2">
                                    {QUESTDETAILS.media.map((media: string, index: number) => {
                                        if (videoExts.test(media)) {
                                            return <video key={index} src={media} className="w-full aspect-video" controls>Your browser does not support the video tag.</video>
                                        } else {
                                            return <div className="aspect-square" key={index}>
                                                <img  src={media} alt="media" className="w-full h-full object-cover" />
                                            </div>
                                        }
                                    }
                                    )}
                                </div>
                                <div className="w-full p-4 rounded-md border mt-4">
                                    <p className="font-semibold mb-2">Description:</p>
                                    <p className="text-sm">{QUESTDETAILS.description}</p>
                                </div>
                            </div>
                        </CardWrapper>
                    </div>
                </div>
            </div>
        </>
    )
}
