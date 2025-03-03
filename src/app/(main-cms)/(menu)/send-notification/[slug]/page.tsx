"use client"

import CardWrapper from '@/components/Card';
import CustomBreadCrumb from '@/components/ui/custom-breadcrumbs';
import { Input } from '@/components/ui/input';
import { SendNotificationBreadCrumbs } from '@/constants/bread-crumbs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const NotificationSchema = z.object({
  title: z.string().min(4, "Title is required"),
  category: z.string().min(1, "Category is required"),
  message: z.string().min(4, "Message is required"),
});


type NotificationData = z.infer<typeof NotificationSchema>;


export default function SendNotification() {
  const { slug } = useParams<{ slug: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<NotificationData>({
    resolver: zodResolver(NotificationSchema),
  });

  const onSubmit: SubmitHandler<NotificationData> = async (formData) => {
    console.log("====> formData", formData);
  };

  return (
    <>
      <div className="flex justify-between p-4 bg-white">
        <h1 className="text-sm font-bold text-gray-700 uppercase">SEND NOTIFICATION {`${slug}`}</h1>
        <CustomBreadCrumb data={SendNotificationBreadCrumbs} />
      </div>
      <div className="p-4 bg-slate-50">
        <CardWrapper name="Send Notification">
          <form className="flex flex-col space-y-2 p-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label htmlFor="title" className="mb-1 text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                type="text"
                placeholder="Title"
                {...register("title")}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-normal" htmlFor='category'>
                Category<span className="text-red-500 ml-1">*</span>
              </label>
              <select
                {...register('category')}
                className="border rounded-md px-2 py-1.5"
              >
                <option value="">Select Category</option>
                <option value="User">User</option>
                <option value="Flicks">Flicks</option>
                <option value="Follower">Follower</option>
                <option value="Like">Like</option>
              </select>
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="mb-1 text-gray-700">
                Message  <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                className="border px-2 py-1 rounded-md focus:outline-none  resize-none w-full"
                rows={5}
                placeholder="Message"
                {...register("message")}
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>
            <div className="col-span-full flex justify-end pt-4 ">
              <button
                className="relative inline-flex items-center px-4 py-2 mb-4 text-white bg-green-500 rounded-sm shadow-sm text-xs font-medium transition-colors duration-150 ease-in-out hover:bg-green-600 focus:outline-none"
                type="submit"
              >
                Send Notification
              </button>
            </div>
          </form>
        </CardWrapper>
      </div>
    </>
  )
}
