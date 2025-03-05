import CardWrapper from '@/components/Card'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoveDown, MoveUp, WifiOff } from 'lucide-react';
import { baseURL } from '@/lib/axioxWithAuth';
import useSWR from 'swr';
import { getFetcher } from '@/lib/fetcher';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
import { UserFlicksHeadings } from '@/constants/table-headings';
import { useParams } from 'next/navigation';

const NotFound = dynamic(() => import("@/components/TableNoData/noDataFound"), { ssr: false });



interface UserFlick {
    _id: string;
    description: string;
    createdAt: Date;
    suspended: string;
    thumbnail: string;
}
interface ApiResponse {
    USERFLICKS: UserFlick[]
}


export default function UserFlicks() {
    const { id } = useParams();
    const [sortBy, setSortBy] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [skip, setSkip] = useState(0);
    const [skipHistory, setSkipHistory] = useState<number[]>([0]);
    const [currentSkipIndex, setCurrentSkipIndex] = useState(0);
    const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);


    const buildApiUrl = () => {
        const params = new URLSearchParams();
        // Use currentQuery instead of searchTerm
        if (sortBy) {
            params.append('sort', sortBy);
            params.append('order', sortOrder);
        }
        // Add query parameter based on selected tab
        params.append("skip", skip.toString());
        return `${baseURL}/user-flick/${id}?${params.toString()}`;
    };

    const handleSort = (key: string) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(key);
            setSortOrder("asc");
        }
        setSkip(0);
        setSkipHistory([0]);
        setCurrentSkipIndex(0);
    };

    const { data, error, isLoading, mutate } = useSWR<ApiResponse>(
        buildApiUrl(),
        getFetcher,
        {
            onError: (err) => {
                if (!navigator.onLine) {
                    setIsOnline(false);
                    toast.error("You're not connected to the internet", {
                        icon: <WifiOff className="w-4 h-4" />,
                        duration: 4000
                    });
                } else {
                    toast.error("Failed to fetch staff data");
                }
            },
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            shouldRetryOnError: true,
            errorRetryCount: 3
        }
    );


    return (
        <CardWrapper name="Flicks">
            <div className="overflow-x-auto grid grid-cols-1">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {UserFlicksHeadings.map((heading, index) => {
                                if (heading.display === "Options") {
                                    return
                                    // hasAnyPermission(["deleteAdmin", "updateAdmin"]) ?
                                    (
                                        <TableHead key={index} className="text-xs font-semibold text-gray-600">
                                            {heading.display}
                                        </TableHead>
                                    )
                                    // : null;
                                }
                                return (
                                    <TableHead
                                        key={index}
                                        className={`text-xs font-semibold text-gray-600 ${heading.sortable ? 'cursor-pointer' : ''
                                            }`}
                                        onClick={() => heading.sortable && handleSort(heading.key)}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>{heading.display}</span>
                                            {heading.sortable && (
                                                <span className="flex">
                                                    <MoveDown
                                                        size={10}
                                                        className={`${sortBy === heading.key && sortOrder === 'asc'
                                                            ? 'opacity-100'
                                                            : 'opacity-50'
                                                            }`}
                                                    />
                                                    <MoveUp
                                                        size={10}
                                                        className={` ${sortBy === heading.key && sortOrder === 'desc'
                                                            ? 'opacity-100'
                                                            : 'opacity-50'
                                                            }`}
                                                    />
                                                </span>
                                            )}
                                        </div>
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    </TableHeader>
                    {isLoading ? (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={UserFlicksHeadings.length} className="text-center py-6">
                                    <div className="flex justify-center items-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : error || !isOnline ? (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={UserFlicksHeadings.length} className="text-center py-6">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <WifiOff className="w-8 h-8 text-red-500" />
                                        <p className="text-gray-500">Unable to load flick data</p>
                                        <button
                                            onClick={() => mutate()}
                                            className="text-purple-600 hover:text-purple-800 underline">
                                            Try again
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : data && !data.USERFLICKS.length ? (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={UserFlicksHeadings.length} className="text-center py-6">
                                    <NotFound />
                                    <p className="text-gray-500 mt-2">No Flicks found</p>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) :
                        (
                            <TableBody>
                                {data && data.USERFLICKS.map((flick, index) => (
                                    <TableRow key={flick._id} className="hover:bg-gray-50">
                                        <TableCell className="text-sm font-normal">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            <div className="flex items-center">
                                                <img
                                                    src={flick.thumbnail}
                                                    alt={flick._id}
                                                    width={40}
                                                    height={40}
                                                    className="border-double border border-gray-400 p-0.5 mr-2"
                                                />
                                                <span className="font-normal">{flick._id}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm font-normal">
                                            {flick.description}
                                        </TableCell>
                                        <TableCell className="text-sm font-normal">
                                            {flick.suspended}
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            {new Date(flick.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                </Table>
            </div>
        </CardWrapper>
    )
}
