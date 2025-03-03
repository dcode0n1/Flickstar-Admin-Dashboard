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
import { MediaControlCreateQuestBreadCrumbs } from "@/constants/bread-crumbs";
// Zod schema for create staff - making password required
const QuestSchema = z.object({
    title: z.string().min(4, "Title is required"),
    description: z.string().min(4, "Description is required"),
    mode: z.enum(["GoFlick", "OnFlick"]),
    maxApplicants: z.coerce.number().int().min(1, "Max Applicants is required"),
    totalAmount: z.coerce.number().int().min(1, "Total Amount is required"),
    location: z.string().min(4, "Location is required"),
    media: z.array(z.instanceof(File)).min(1, "Media is required"),
})
type QuestData = z.infer<typeof QuestSchema>;
export default function CreateQuest() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<QuestData>({
        resolver: zodResolver(QuestSchema),
    });
    const onSubmit: SubmitHandler<QuestData> = async (formData) => {
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
                <h1 className="text-sm font-bold text-gray-800">CREATE QUEST</h1>
                <CustomBreadCrumb data={MediaControlCreateQuestBreadCrumbs} />
            </div>
            <div className="flex flex-1 flex-col m-4">
                <CardWrapper name="Create Quest" viewBtn={false}>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 p-2 gap-4">
                        {/* Name Input */}
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-1 text-gray-700">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your Name"
                                {...register("title")}
                                className={errors.title ? "border-red-500" : ""}
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        </div>
                        {/* Username Input */}
                        <div className="flex flex-col">
                            <label htmlFor="description" className="mb-1 text-gray-700">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="description"
                                type="text"
                                placeholder="Enter your Username"
                                {...register("description")}
                                className={errors.description ? "border-red-500" : ""}
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        </div>
                        {/* Phone Number Input */}
                        <div className="flex flex-col">
                            <label htmlFor="phoneNumber" className="mb-1 text-gray-700">
                                Media
                            </label>
                            <Input
                                id="media"
                                type="file"
                                accept="image/* video/*"
                                onChange={(e) => {
                                    const files = e.target.files;
                                    if (files) {
                                        const filesArray = Array.from(files);
                                        setValue("media", filesArray);
                                    } else {
                                        setValue("media", []);
                                    }
                                }}
                                multiple
                                className={errors.media ? "border-red-500" : ""}
                            />
                            {errors.media && <p className="text-red-500 text-sm">{errors.media.message}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 font-normal" htmlFor='mode'>
                                Mode<span className="text-red-500 ml-1">*</span>
                            </label>
                            <select
                                {...register("mode")}
                                className="border rounded-md px-2 py-1.5"
                            >
                                <option value="">Select Mode</option>
                                <option value="GoFlick">GoFlick</option>
                                <option value="OnFlick">OnFlick</option>
                            </select>
                            {errors.mode && <p className="text-sm text-red-500">{errors.mode.message}</p>}
                        </div>
                        {/* Max Applicants */}
                        <div className="flex flex-col">
                            <label htmlFor="maxApplicants" className="mb-1 text-gray-700">
                                Max Applicants <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="maxApplicants"
                                type="number"
                                placeholder="Enter Max Applicants"
                                {...register("maxApplicants")}
                                className={errors.maxApplicants ? "border-red-500" : ""}
                            />
                            {errors.maxApplicants && <p className="text-red-500 text-sm">{errors.maxApplicants.message}</p>}
                        </div>
                        {/* Total Amount */}
                        <div className="flex flex-col">
                            <label htmlFor="totalAmount" className="mb-1 text-gray-700">
                                Total Amount <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="totalAmount"
                                type="number"
                                placeholder="Enter Total Amount"
                                {...register("totalAmount")}
                                className={errors.totalAmount ? "border-red-500" : ""}
                            />
                            {errors.totalAmount && <p className="text-red-500 text-sm">{errors.totalAmount.message}</p>}
                        </div>
                        <div className="flex flex-col col-span-2">
                            <label htmlFor="totalAmount" className="mb-1 text-gray-700">
                                Location <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="location"
                                type="string"
                                {...register("location")}
                                className={errors.location  ? "border-red-500" : ""}
                            />
                            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                        </div>
                        {/* Submit Button */}
                        <div className="col-span-full flex justify-start mt-4">
                            <button
                                className="relative inline-flex items-center px-4 py-2 mb-4 text-white bg-green-500 rounded-sm shadow-sm text-xs font-medium transition-colors duration-150 ease-in-out hover:bg-green-600 focus:outline-none disabled:bg-green-300"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating Quest...' : 'Create Quest'}
                            </button>
                        </div>
                    </form>
                </CardWrapper>
            </div>
        </div>
    );
}