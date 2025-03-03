"use client"
import CardWrapper from '@/components/Card';
import { Input } from '@/components/ui/input';
import { baseURL } from '@/lib/axioxWithAuth';
import { getFetcher } from '@/lib/fetcher';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';
import { z } from 'zod';
import dayjs from '@/utils/utils';
import CustomBreadCrumb from '@/components/ui/custom-breadcrumbs';
import { ReportAudioReplyBreadCrumbs, ReportCommentReplyBreadCrumbs, ReportFlickListBreadcrumbs, ReportFlickReplyBreadCrumbs } from '@/constants/bread-crumbs';

const supportTicketReplySchema = z.object({
  message: z.string().min(1, "Message is required"),
  attachments: z.array(z.any()).optional()
});


type SupportTicketData = z.infer<typeof supportTicketReplySchema>;

export default function ReportFlickId() {
  const { id } = useParams();
  const { data, error, isLoading, mutate } = useSWR(`${baseURL}/setting/ticket/${id}`, getFetcher)
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm<SupportTicketData>({
    resolver: zodResolver(supportTicketReplySchema),
    defaultValues: {
      message: "",
      attachments: []
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attachments"
  });
  const closeTicket = async () => {
    try {
      const response = await axios.patch(`${baseURL}/setting/ticket/${id}`, {}, {
        withCredentials: true
      });
      if (response.data.success) {
        mutate()
        toast.success("Support ticket closed successfully");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (JPEG or PNG)');
        return;
      }
      if (file.size > maxSize) {
        toast.error('File size should be less than 5MB');
        return;
      }
      setValue(`attachments.${index}`, file);
    };
  };
  const onSubmit: SubmitHandler<SupportTicketData> = async (data) => {
    console.log(data)
    try {
      const { attachments, ...rest } = data;
      const response = await axios.put(`${baseURL}/setting/ticket/${id}`, { ...rest, ...attachments }, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (response.data.success) {
        // router.push("list");
        mutate()
        toast.success("Support ticket created successfully");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="flex flex-1 flex-col bg-slate-100">
      <div className="align-center flex justify-between p-4 border-b shadow-md bg-white">
        <h1 className="text-sm font-bold text-gray-800">REPORT FLICK</h1>
        <CustomBreadCrumb data={ReportFlickReplyBreadCrumbs} />
      </div>
      <div className="flex flex-1 flex-col m-4">
        <CardWrapper name="Report Flick">
          <div className="p-4">
            <div className="p-2 bg-slate-100 space-y-2 max-h-[60vh] overflow-y-auto">
              <div className="space-x-2">
                <span className="text-sm px-4 py-1 rounded-sm bg-purple-100 text-purple-700 font-semibold">
                  {data?.SUPPORTTICKET?.status}
                </span>
                <span className="text-xs">Flick Id - {data?.SUPPORTTICKET?.ticketId}</span>
              </div>
              <div className="rounded-sm  space-y-4">
                {/* Left aligned message */}
                {data?.SUPPORTTICKET?.messages?.map((message: any) => {
                  return message.sentBy == "admin" ? (
                    <div className="flex w-full justify-end">
                      <div className="w-1/2">
                        <div className="flex flex-col space-y-2 p-2 bg-white">
                          <div className="flex flex-col items-end justify-end">
                            <span className="text-sm font-semibold text-slate-700">{data?.SUPPORTTICKET.userId.email}</span>
                            <span className="text-xs">{dayjs(message.createdAt).format('DD-MM-YYYY h:mm A')}</span>
                          </div>
                          <div className="p-2 bg-slate-100 rounded-sm text-sm">{message.message}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full p-2">
                      <div className="w-1/2">
                        <div className="flex flex-col space-y-2 p-2 bg-white">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-blue-500">{data?.SUPPORTTICKET.sellerId.email}</span>
                            <span className="text-xs">{dayjs(message.createdAt).format('DD-MM-YYYY h:mm A')}</span>
                          </div>
                          <div className="p-2 bg-slate-100 rounded-sm text-sm">{message.message}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className={`col-span-full flex justify-start py-4 ${data?.SUPPORTTICKET?.status == "Closed" && 'hidden'} `}>
              <button
                className="relative inline-flex items-center px-4 py-3 mb-4 text-white bg-purple-500 rounded-sm shadow-sm text-xs font-medium transition-colors duration-150 ease-in-out hover:bg-purple-600 focus:outline-none"
                type="submit"
                onClick={closeTicket}
              >
                Mark As Resolved
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={`${data?.SUPPORTTICKET?.status == "Closed" && 'hidden'}`}>
              <div className="relative flex items-center w-full  bg-white border rounded-sm focus-within:ring-1 focus-within:ring-purple-700 sm:col-span-2">
                <textarea className="flex w-full rounded-md border-none bg-transparent px-2 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none"
                  rows={6}
                  placeholder='Enter Message'
                  {...register("message")} />
              </div>
              {errors.message && (
                <span className="text-red-500 text-xs">{errors.message.message}</span>
              )}
              <div className="py-3 grid grid-cols-1 sm:grid-cols-[3fr_1fr] gap-7">
                <div className="space-y-2">
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(e, 0)}
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                  />
                  <span className="text-red-500 text-xs">
                    Allowed File Extensions: .jpg, .jpeg, .png, .pdf, .doc, .docx
                  </span>
                  {fields?.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-5">
                      <Input
                        type="file"
                        onChange={(e) => handleFileChange(e, index + 1)}
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      />
                      <button
                        type="button"
                        onClick={() => { remove(index) }}
                      >
                        <X size={30} className="text-white bg-red-500 hover:bg-red-700 rounded" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="h-10 px-10 py-2 bg-purple-600 text-white rounded-sm text-sm"
                  onClick={() => append({})}
                >
                  Add
                </button>
              </div>
              <div className="col-span-full flex justify-start py-2">
                <button
                  className="relative inline-flex items-center px-4 py-3 mb-4 text-white bg-green-500 rounded-sm shadow-sm text-xs font-medium transition-colors duration-150 ease-in-out hover:bg-green-600 focus:outline-none"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </CardWrapper>
      </div>
    </div>
  );
};

