'use client';
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import CardWrapper from "@/components/Card";
import { Input } from "@/components/ui/input";
import { baseURL } from "@/lib/axioxWithAuth";
import { useRouter } from "next/navigation";
import CustomBreadCrumb from "@/components/ui/custom-breadcrumbs";
import {  MediaControlCreateSongsBreadCrumbs } from "@/constants/bread-crumbs";
// Zod schema for create staff - making password required
const SongSchema = z.object({
    name: z.string().min(4, "Name is required"),
    url: z.instanceof(File),
    icon: z.instanceof(File),
    duration: z.coerce.number()
})
type SongData = z.infer<typeof SongSchema>;
export default function CreateSong() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<SongData>({
        resolver: zodResolver(SongSchema),
    });
    const onSubmit: SubmitHandler<SongData> = async (formData) => {
        if (isSubmitting) return;
        try {
            setIsSubmitting(true);
            const response = await axios.post(
                `${baseURL}/staff/create-staff`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if (response.data.success) {
                toast.success('Staff created successfully');
                router.push('list');
            } else {
                throw new Error(response.data.message || 'Failed to create staff');
            }
        } catch (error: any) {
            console.error('Staff creation error:', error);
            toast.error(
                error.response?.data?.message ||
                error.message ||
                'An error occurred while creating staff'
            );
        } finally {
            setIsSubmitting(false);
        }
    };
    // if (rolesError) return <div className="p-4 text-red-500">Error loading roles. Please try again later.</div>;
    // if (!rolesData) return <div className="p-4">Loading...</div>;
    return (
        <div className="flex flex-1 flex-col h-full bg-slate-100 ">
            <div className="items-center flex justify-between p-4 border-b shadow-md bg-white">
                <h1 className="text-sm font-bold text-gray-800">CREATE SONGS</h1>
                <CustomBreadCrumb data={MediaControlCreateSongsBreadCrumbs} />
            </div>
            <div className="flex flex-1 flex-col m-4">
                <CardWrapper name="Create Songs" viewBtn={false}>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 p-2 gap-4">
                        {/* Name Input */}
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-1 text-gray-700">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter the Song Name"
                                {...register("name")}
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                        {/* Username Input */}
                        <div className="flex flex-col">
                            <label htmlFor="description" className="mb-1 text-gray-700">
                                Duration <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="description"
                                type="number"
                                placeholder="Enter your Duration"
                                {...register("duration")}
                                className={errors.duration ? "border-red-500" : ""}
                            />
                            {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
                        </div>
                        {/* Phone Number Input */}
                        <div className="flex flex-col">
                            <label htmlFor="icon" className="mb-1 text-gray-700">
                                Icon  
                            </label>
                            <Input
                                id="icon"
                                type="file"
                                accept=".png,.jpg,.jpeg,.svg"
                                {...register("icon")}
                                className={errors.icon  ? "border-red-500" : ""}
                            />
                            {errors.icon && <p className="text-red-500 text-sm">{errors.icon.message}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="phoneNumber" className="mb-1 text-gray-700">
                                Song 
                            </label>
                            <Input
                                id="media"
                                type="file"
                                accept=".mp3,audio/*"
                                {...register("url")}
                                className={errors.url ? "border-red-500" : ""}
                            />
                            {errors.url && <p className="text-red-500 text-sm">{errors.url.message}</p>}
                        </div>
                        {/* Submit Button */}
                        <div className="col-span-full flex justify-start mt-4">
                            <button
                                className="relative inline-flex items-center px-4 py-2 mb-4 text-white bg-green-500 rounded-sm shadow-sm text-xs font-medium transition-colors duration-150 ease-in-out hover:bg-green-600 focus:outline-none disabled:bg-green-300"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating Song...' : 'Create Song'}
                            </button>
                        </div>
                    </form>
                </CardWrapper>
            </div>
        </div>
    );
}