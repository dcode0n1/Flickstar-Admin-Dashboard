'use client';
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import useSWR from "swr";
import { toast } from "sonner";
import CardWrapper from "@/components/Card";
import CustomBreadCrumb from "@/components/ui/custom-breadcrumbs";
import { Input } from "@/components/ui/input";
import CusInput from "@/components/CustomInput";
import { AccessControlUpdateStaffBreadCrumbs } from "@/constants/bread-crumbs";
import { baseURL } from "@/lib/axioxWithAuth";
import { getFetcher } from "@/lib/fetcher";
import { useParams, useRouter } from "next/navigation";
import { handleUploadToPresignedUrl } from "@/utils/utils";

const R2_PUBLIC_URL = 'https://pub-301c1efdf41d428f9ab043c4d4ecbac9.r2.dev';

const isClient = typeof window !== "undefined";
const photoField = isClient
    ? z
        .any()
        .refine((val) => val instanceof FileList && val.length > 0, "Profile photo is required")
        .refine((val) => val[0]?.type.startsWith("image/"), "Invalid image format")
    : z.any();

const staffSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    username: z.string().min(8, { message: "Username must be at least 8 characters long" }),
    phone: z.string().optional().nullable(),
    email: z.string().email({ message: "Invalid email format" }),
    role: z.string().min(1, { message: "Role is required" }),
    address: z.string().optional().nullable(),
    photo: photoField,
});
type StaffData = z.infer<typeof staffSchema>;

interface Role {
    _id: string;
    name: string;
}

export default function EditStaff() {
    const { id } = useParams();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [profileSrc, setProfileSrc] = useState<string | null>(null);

    const { data: staffData, error: staffError } = useSWR(
        `${baseURL}/staff/${id}`,
        getFetcher
    );

    const { data: rolesData, error: rolesError } = useSWR<{ DROPROLES: Role[] }>(
        `${baseURL}/role-dropdown`,
        getFetcher
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<StaffData>({
        resolver: zodResolver(staffSchema),
    });

    const profileImageList = watch("photo");

    useEffect(() => {
        if (staffData?.staffDetails) {
            const { staffDetails } = staffData;
            reset({
                name: staffDetails.name,
                username: staffDetails.username,
                phone: staffDetails.phone,
                email: staffDetails.email,
                role: staffDetails.role,
                address: staffDetails.address || '',
            });
            if (staffDetails.photo) {
                setProfileSrc(staffDetails.photo);
            }
        }
    }, [staffData, reset]);

    useEffect(() => {
        if (profileImageList?.[0]) {
            const file = profileImageList[0];
            const url = URL.createObjectURL(file);
            setProfileSrc(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [profileImageList]);

    const onSubmit: SubmitHandler<StaffData> = async (formData) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        console.log("====> formData", formData)

        try {
            let imageUrl: string | undefined;
            if (formData.photo?.[0]) {
                const presignedResponse = await axios.post(
                    `${baseURL}/staff/presigned-url`,
                    {
                        fileType: formData.photo[0].type,
                        staffId: id
                    },
                    { withCredentials: true }
                );
                const { profileImagePresignedUrl } = presignedResponse.data;
                await handleUploadToPresignedUrl(formData.photo[0], profileImagePresignedUrl);
                imageUrl = `${R2_PUBLIC_URL}/staff/${id}/profile-image`;
            }

            const dataToUpdate: any = {
                name: formData.name,
                username: formData.username,
                phone: formData.phone,
                email: formData.email,
                role: formData.role,
                address: formData.address,
            };
            if (imageUrl) {
                dataToUpdate.photo = imageUrl;
            }

            const response = await axios.put(
                `${baseURL}/staff/${id}`,
                dataToUpdate,
                { withCredentials: true }
            );

            if (response.data.success) {
                toast.success('Staff updated successfully');
                router.push('/staff/list');
            } else {
                throw new Error(response.data.message || 'Failed to update staff');
            }
        } catch (error: any) {
            console.error('Staff update error:', error);
            toast.error(
                error.response?.data?.message ||
                error.message ||
                'An error occurred while updating staff'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (staffError || rolesError) return <div className="p-4 text-red-500">Error loading data. Please try again later.</div>;
    if (!staffData || !rolesData) return <div className="p-4">Loading...</div>;

    return (
        <div className="flex flex-1 flex-col bg-slate-100 ">
            <div className="items-center flex justify-between p-4 border-b shadow-md bg-white">
                <h1 className="text-sm font-bold text-gray-800">EDIT STAFF</h1>
                <CustomBreadCrumb data={AccessControlUpdateStaffBreadCrumbs} />
            </div>
            <div className="flex flex-1 flex-col m-4">
                <CardWrapper name="Edit Staff" viewBtn={false}>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 p-2 gap-4">
                        {/* Name Input */}
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-1 text-gray-700">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your Name"
                                {...register("name")}
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        {/* Username Input */}
                        <div className="flex flex-col">
                            <label htmlFor="username" className="mb-1 text-gray-700">
                                Username <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Enter your Username"
                                {...register("username")}
                                className={errors.username ? "border-red-500" : ""}
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                        </div>

                        {/* Phone Number Input */}
                        <div className="flex flex-col">
                            <label htmlFor="phoneNumber" className="mb-1 text-gray-700">
                                Phone Number
                            </label>
                            <Input
                                id="phoneNumber"
                                type="tel"
                                placeholder="0XXXXXXX"
                                {...register("phone")}
                                className={errors.phone ? "border-red-500" : ""}
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1 text-gray-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@gmail.com"
                                {...register("email")}
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        {/* Roles Dropdown */}
                        <div className="flex flex-col">
                            <label htmlFor="roleId" className="mb-1 text-gray-700">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <CusInput
                                type="select"
                                options={
                                    rolesData?.DROPROLES?.map((role) => ({
                                        value: role._id,
                                        text: role.name,
                                    })) || []
                                }
                                {...register("role")}
                            />
                            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                        </div>

                        {/* Address Input */}
                        <div className="flex flex-col">
                            <label htmlFor="address" className="mb-1 text-gray-700">
                                Address
                            </label>
                            <Input
                                id="address"
                                type="text"
                                placeholder="Enter your Address"
                                {...register("address")}
                                className={errors.address ? "border-red-500" : ""}
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                        </div>

                        {/* Profile Image Input */}
                        <div className="flex flex-col">
                            <label htmlFor="profilePhoto" className="mb-1 text-gray-700">
                                Profile Photo
                            </label>
                            <Input
                                id="profilePhoto"
                                type="file"
                                accept="image/*"
                                {...register("photo")}
                            />
                            {typeof errors.photo?.message === "string" && (
                                <p className="text-red-500 text-sm">{errors.photo.message}</p>
                            )}
                            {profileSrc && (
                                <img
                                    src={profileSrc}
                                    alt="Profile preview"
                                    className="mt-2 h-40 w-40 rounded-md shadow-sm"
                                />
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-full flex justify-start mt-4">
                            <button
                                className="relative inline-flex items-center px-4 py-2 mb-4 text-white bg-green-500 rounded-sm shadow-sm text-xs font-medium transition-colors duration-150 ease-in-out hover:bg-green-600 focus:outline-none disabled:bg-green-300"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Updating Staff...' : 'Update Staff'}
                            </button>
                        </div>
                    </form>
                </CardWrapper>
            </div>
        </div>
    );
}