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

// Modified Zod schema for edit (making password optional)
const staffSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    username: z.string().min(8, { message: "Username must be at least 8 characters long" }),
    phone: z.string().optional().nullable(),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(5, { message: "Password must be at least 5 characters long" }).optional(),
    confirmPassword: z.string().min(5, { message: "Confirm Password is required" }).optional(),
    role: z.string().min(1, { message: "Role is required" }),
    address: z.string().optional().nullable(),
    profileImage: z.any().optional(),
}).refine((data) => {
    // Only validate passwords match if both are provided
    if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword;
    }
    return true;
}, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type StaffData = z.infer<typeof staffSchema>;

interface Role {
    _id: string;
    name: string;
}

export default function EditStaff() {
    const {id} = useParams();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Fetch existing staff data
    const { data: staffData, error: staffError, mutate } = useSWR(
        `${baseURL}/staff/${id}`,
        getFetcher
    );
    // Fetch roles
    const { data: rolesData, error: rolesError } = useSWR<{ DROPROLES: Role[] }>(
        `${baseURL}/role-dropdown`,
        getFetcher
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<StaffData>({
        resolver: zodResolver(staffSchema),
    });

    // Set form values when staff data is loaded
    useEffect(() => {
        if (staffData) {
            const { staffDetails } = staffData;
            reset({
                name: staffDetails.name,
                username: staffDetails.username,
                phone: staffDetails.phone,
                email: staffDetails.email,
                role: staffDetails.role,
                address: staffDetails.address || '',
            });
        }
    }, [staffData, reset]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!validTypes.includes(file.type)) {
                toast.error('Please upload a valid image file (JPEG, PNG, or GIF)');
                return;
            }
            if (file.size > maxSize) {
                toast.error('File size should be less than 5MB');
                return;
            }
            setSelectedFile(file);
            setValue('profileImage', file);
        }
    };

    useEffect(() => {
        if (rolesData?.DROPROLES && staffData?.staffDetails) {
            const selectedRole = rolesData.DROPROLES.find(
                role => role._id == staffData.staffDetails.role
            );
            if (selectedRole) {
                console.log('Selected role:', selectedRole.name);
            }
        }
    }, [rolesData, staffData]);



    const onSubmit: SubmitHandler<StaffData> = async (formData) => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            const { profileImage, ...rest } = formData;
            const response = await axios.put(
                `${baseURL}/staff/${id}`,
                rest,
                {
                    withCredentials: true,
                }
            );
            if (response.data.success) {
                toast.success('Staff updated successfully');
                router.push('list');
                mutate(); // Update the cached data
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
                                Roles <span className="text-red-500">*</span>
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
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {selectedFile && (
                                <p className="text-sm text-gray-500 mt-2">
                                    Selected file: {selectedFile.name}
                                </p>
                            )}
                            {staffData.profileImage && !selectedFile && (
                                <p className="text-sm text-gray-500 mt-2">
                                    Current profile image: {staffData.profileImage}
                                </p>
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