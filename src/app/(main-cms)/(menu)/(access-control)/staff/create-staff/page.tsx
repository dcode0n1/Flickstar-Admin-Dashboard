'use client';
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import useSWR from "swr";
import { toast } from "sonner";
import CardWrapper from "@/components/Card";
import { Input } from "@/components/ui/input";
import CusInput from "@/components/CustomInput";
import { baseURL } from "@/lib/axioxWithAuth";
import { getFetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation"
import { handleUploadToPresignedUrl } from "@/utils/utils";

const isClient = typeof window !== "undefined";

const imageField = isClient
    ? z
        .any()
        .refine(
            (files) => {
                if (!files) return false;
                return files instanceof FileList && files.length > 0;
            },
            "Profile image is required"
        )
        .refine(
            (files) => {
                if (!files || !files[0]) return false;
                return files[0].type.startsWith("image/");
            },
            "Invalid image format"
        )
    : z.any().optional(); // skip validation on the server

const staffSchema = z
    .object({
        name: z.string().min(1, { message: "Name is required" }),
        username: z.string().min(8, { message: "Username must be at least 8 characters long" }),
        phone: z.string().optional().nullable(),
        email: z.string().email({ message: "Invalid email format" }),
        password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
        confirmPassword: z.string().min(5, { message: "Confirm Password is required" }),
        role: z.string().min(1, { message: "Role is required" }),
        address: z.string().optional().nullable(),
        image: imageField,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });


type StaffData = z.infer<typeof staffSchema>;

interface Role {
    _id: string;
    name: string;
}

export default function CreateStaff() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [profileSrc, setProfileSrc] = useState<string | null>(null); // New state for icon preview

    // Fetch roles for dropdown
    const { data: rolesData, error: rolesError } = useSWR<{ DROPROLES: Role[] }>(
        `${baseURL}/role-dropdown`,
        getFetcher
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<StaffData>({
        resolver: zodResolver(staffSchema),
    });

    const profileImageList = watch("image");

    useEffect(() => {
        if (profileImageList?.length > 0) {
            const file = profileImageList[0];
            const url = URL.createObjectURL(file);
            setProfileSrc(url);

            // Cleanup object URL
            return () => URL.revokeObjectURL(url);
        } else {
            setProfileSrc(null);
        }
    }, [profileImageList])

    const onSubmit: SubmitHandler<StaffData> = async (formData) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const presignedResponse = await axios.post(`${baseURL}/staff/presigned-url`, {
                fileType: formData.image[0].type,
            }, {
                withCredentials: true
            }
            );
            const { profileImagePresignedUrl, staffId } = presignedResponse.data;

            await handleUploadToPresignedUrl(formData.image[0], profileImagePresignedUrl);

            const { confirmPassword, image, ...rest } = formData
            const R2_PUBLIC_URL = 'https://pub-301c1efdf41d428f9ab043c4d4ecbac9.r2.dev'
            const response = await axios.post(
                `${baseURL}/staff`,
                {
                    _id: staffId,
                    image: `${R2_PUBLIC_URL}/staff/${staffId}/profile-image`,
                    ...rest
                },
                {
                    withCredentials: true,
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
                <h1 className="text-sm font-bold text-gray-800">CREATE STAFF</h1>
            </div>
            <div className="flex flex-1 flex-col m-4">
                <CardWrapper name="Create Staff" viewBtn={false}>
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

                        {/* Password Input */}
                        <div className="flex flex-col">
                            <label htmlFor="password" className="mb-1 text-gray-700">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                {...register("password")}
                                className={errors.password ? "border-red-500" : ""}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password Input */}
                        <div className="flex flex-col">
                            <label htmlFor="confirmPassword" className="mb-1 text-gray-700">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm password"
                                {...register("confirmPassword")}
                                className={errors.confirmPassword ? "border-red-500" : ""}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                            )}
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
                            <label htmlFor="profileImage" className="mb-1 text-gray-700">
                                Profile Image
                            </label>
                            <Input
                                id="iconFile"
                                type="file"
                                accept="image/*"
                                {...register("image")}
                                className={errors.image ? "border-red-500" : ""}
                            />
                            {typeof errors.image?.message === "string" && (
                                <p className="text-red-500 text-sm">{errors.image.message}</p>
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
                                {isSubmitting ? 'Creating Staff...' : 'Create Staff'}
                            </button>
                        </div>
                    </form>
                </CardWrapper>
            </div>
        </div>
    );
}