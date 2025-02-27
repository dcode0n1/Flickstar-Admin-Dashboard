"use client"
import { useState, useEffect } from "react";
import CardWrapper from "@/components/Card";
import CustomBreakCrumb from "@/components/ui/custom-breadcrumbs";
import {  ReportQuestListBreadcrumbs } from "@/constants/bread-crumbs";
import { RiPencilFill } from "@/components/icons/RiPencilFill";
import { RiDeleteBinLine } from "@/components/icons/RiDeleteBinLine";
import { baseURL } from "@/lib/axioxWithAuth";
import Link from "next/link";
import useSWR from "swr";
import { getFetcher } from "@/lib/fetcher";
import { toast } from "sonner";
import { Clock3, MoveDown, MoveUp,  WifiOff } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import dynamic from "next/dynamic";
import { usePermissionStore } from "@/store/permission-store";
import { ReportQuestListHeadings } from "@/constants/table-headings";
import { RiSearchLine } from "@/components/icons/RiSearchLine";
import { RiEqualizerFill } from "@/components/icons/RiEqualizerFill";
import { RiRefreshLine } from "@/components/icons/RiRefreshLine_short";
const NotFound = dynamic(() => import("@/components/TableNoData/noDataFound"), { ssr: false });

export default function ReportQuestList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [skip, setSkip] = useState(0);
  const [skipHistory, setSkipHistory] = useState<number[]>([0]);
  const [currentSkipIndex, setCurrentSkipIndex] = useState(0);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentQuery, setCurrentQuery] = useState("");
  const buildApiUrl = () => {
    const params = new URLSearchParams();
    // Use currentQuery instead of searchTerm
    if (currentQuery.trim()) {
      params.append("search", currentQuery.trim());
    }
    if (sortBy) {
      params.append('sort', sortBy);
      params.append('order', sortOrder);
    }
    // Add query parameter based on selected tab
    params.append("skip", skip.toString());
    return `${baseURL}/staff/get-all-staff?${params.toString()}`;
  };
  ;
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
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      mutate();
      toast.success("Back online! Refreshing data...");
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.error("You're not connected to the internet", {
        icon: <WifiOff className="w-4 h-4" />
      });
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [mutate]);
  const handleDeleteStaff = async (staffId: string) => {
    if (!isOnline) {
      toast.error("Cannot delete staff while offline");
      return;
    }
    try {
      mutate(
        (currentData: ApiResponse | undefined) => currentData ? {
          ...currentData,
          STAFF: currentData.STAFF.filter(staff => staff._id !== staffId)
        } : currentData,
        false
      );
      const response = await fetch(`${baseURL}/staff/delete-staff/${staffId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to delete staff');
      toast.success("Staff member deleted successfully");
      mutate();
    } catch (error) {
      toast.error("Failed to delete staff member");
      mutate();
    }
  };

  // Filter staff data based on search term
  const filteredStaff = data?.STAFF.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
  const handleSearch = () => {
    setCurrentQuery(searchTerm);
    setSkip(0);
    setSkipHistory([0]);  // Reset skip history
    setCurrentSkipIndex(0);  // Reset current index
  };
  const handleLoadMore = () => {
    if (data?.pagination.hasMore) {
      const newSkip = data.pagination.nextSkip || 0;
      setSkipHistory(prev => [...prev, newSkip]);
      setCurrentSkipIndex(prev => prev + 1);
      setSkip(newSkip);
    }
  };
  const handlePrevious = () => {
    if (currentSkipIndex > 0) {
      const prevSkipIndex = currentSkipIndex - 1;
      const prevSkip = skipHistory[prevSkipIndex];
      setCurrentSkipIndex(prevSkipIndex);
      setSkip(prevSkip);
    }
  };
  return (
    <div className="flex flex-1 flex-col bg-slate-100">
      <div className="align-center flex justify-between p-4 border-b shadow-md bg-white">
        <h1 className="text-sm font-bold text-gray-800">REPORT QUEST</h1>
        <CustomBreakCrumb data={ReportQuestListBreadcrumbs} />
      </div>
      <div className="flex flex-1 flex-col m-4">
        <CardWrapper
          name="Report Quest List"
          viewBtn={false}
          className="p-2"
        >
          <div className="flex flex-wrap items-center m-2 gap-4 md:flex-2">
            <div className="relative flex items-center w-full sm:w-64 p-1 bg-white border rounded-sm">
              <RiSearchLine className="absolute left-0 mx-2" />
              <input
                type="text"
                name="search"
                className="w-full pl-10 py-1 text-sm text-gray-700 placeholder-gray-500 bg-transparent border-none focus:outline-none focus:ring-5 focus:ring-indigo-600"
                placeholder="Search name, email, phone"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative flex items-center w-full  sm:w-64 p-1 bg-white border rounded-sm">
              <Clock3 className="absolute left-0 mx-2 w-4 text-gray-500" />
              <input
                type="text"
                name="search"
                className="w-full pl-10 py-1 text-sm text-gray-700 placeholder-gray-500 bg-transparent border-none focus:outline-none focus:ring-5 focus:ring-indigo-600"
                placeholder="Search by date"
              />
            </div>
            <button className="bg-purple-700 px-10 py-1.5 ml-2 rounded-sm flex items-center transition duration-300 ease-in-out hover:bg-opacity-80">
              <RiEqualizerFill /><span className="ml-1 text-white">Search</span>
            </button>
            <button className="bg-red-400 px-10 py-1.5 ml-2 rounded-sm flex items-center transition duration-300 ease-in-out hover:bg-opacity-80">
              <RiRefreshLine /><span className="ml-1 text-white"> Reset</span>
            </button>
          </div>
          <div className="overflow-x-auto grid grid-cols-1">
            <Table>
              <TableHeader>
                <TableRow>
                  {ReportQuestListHeadings.map((heading, index) => {
                    if (heading.display === "Options") {
                      // return hasAnyPermission(["deleteAdmin", "updateAdmin"]) ?(
                      <TableHead key={index} className="text-xs font-semibold text-gray-600">
                        {heading.display}
                      </TableHead>
                      // ) : null;
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
                    <TableCell colSpan={ReportQuestListHeadings.length} className="text-center py-6">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800" />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : error || !isOnline ? (
                <TableBody>
                  <TableRow>
                      <TableCell colSpan={ReportQuestListHeadings.length} className="text-center py-6">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <WifiOff className="w-8 h-8 text-red-500" />
                        <p className="text-gray-500">Unable to load staff data</p>
                        <button
                          onClick={() => mutate()}
                          className="text-purple-600 hover:text-purple-800 underline"
                        >
                          Try again
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : !filteredStaff?.length ? (
                <TableBody>
                  <TableRow>
                        <TableCell colSpan={ReportQuestListHeadings.length} className="text-center py-6">
                      <NotFound />
                      <p className="text-gray-500 mt-2">No staff members found</p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {filteredStaff.map((staff, index) => (
                    <TableRow key={staff._id} className="hover:bg-gray-50">
                      <TableCell className="text-sm font-normal">
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center">
                          <img
                            src={staff.profileImage}
                            alt={staff.name}
                            width={40}
                            height={40}
                            className="border-double border border-gray-400 p-0.5 mr-2"
                          />
                          <div>
                            <p className="font-normal">{staff.name}</p>
                            <p className="text-xs text-gray-500">{staff.role}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-normal">
                        {staff.username}
                      </TableCell>
                      <TableCell className="text-sm font-normal">
                        {staff.email}
                      </TableCell>
                      <TableCell className="text-sm">
                        <label className="relative inline-block h-4 w-7 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-purple-800">
                          <input
                            className="peer sr-only"
                            type="checkbox"
                            checked={staff.status}
                            // onChange={() => hasPermission("updateAdmin") && handleUpdateStatusStaff(staff._id, staff.status)}
                            disabled={!isOnline}
                          />
                          <span className="absolute inset-y-0 start-0 m-0.5 w-3 h-3 rounded-full bg-gray-300 ring-[4px] ring-inset ring-white transition-all peer-checked:translate-x-3 peer-checked:bg-white peer-checked:ring-transparent" />
                        </label>
                      </TableCell>
                      <TableCell className="text-sm font-normal">
                        ADMIN
                      </TableCell>
                      {/* {hasAnyPermission(["updateAdmin", "deleteAdmin"]) && s */}
                      (
                      <TableCell className="text-sm">
                        <div className="flex space-x-2">
                          {/* {hasPermission("updateAdmin") &&  */}
                          <Link
                            href={`/staff/${staff._id}`}
                            className={`text-yellow-500 hover:text-yellow-600 ${!isOnline ? 'pointer-events-none opacity-50' : ''}`}
                          >
                            <RiPencilFill className="h-5 w-5" />
                          </Link>
                          {/* } */}
                          {/* {hasPermission("deleteAdmin") && */}
                          (
                          <button
                            onClick={() => handleDeleteStaff(staff._id)}
                            disabled={!isOnline}
                            className={`text-red-500 hover:text-red-600 ${!isOnline ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <RiDeleteBinLine className="h-5 w-5" />
                          </button>)
                          {/* } */}
                        </div>
                      </TableCell>
                      )
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </div>
          {data?.pagination?.hasMore && (
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handlePrevious}
                disabled={isLoading || !isOnline || currentSkipIndex === 0}
                className="bg-purple-700 px-2 text-white rounded-sm hover:bg-purple-600 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleLoadMore}
                disabled={isLoading || !isOnline}
                className="bg-purple-700 px-2 text-white rounded-sm hover:bg-purple-600 disabled:opacity-50"
              >
                Load More
              </button>
            </div>
          )}
        </CardWrapper>
      </div>
      {!isOnline && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <WifiOff className="w-4 h-4" />
          <span>You are currently offline</span>
        </div>
      )}
    </div>
  );
}