"use client"

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWR from "swr";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { baseURL } from "@/lib/axioxWithAuth";
import { getFetcher } from "@/lib/fetcher";

const personalForm = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    username: z.string().min(1, { message: "Username is required" }),
    phoneNumber: z.coerce.string().min(1, { message: "Phone number is required" }),
    email: z.string().min(1, { message: "Email is required" }).email("Invalid email format"),
    image: z.any()
});

const changePasswordForm = z.object({
    oldPassword: z.string().min(1, { message: "Old Password is required" }),
    password: z.string()
        .min(5, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string()
        .min(1, { message: "Confirm Password is required" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type PersonalForm = z.infer<typeof personalForm>
type ChangePasswordForm = z.infer<typeof changePasswordForm>;

export default function Profile() {
    const [isSubmittingPersonal, setIsSubmittingPersonal] = useState(false);
    const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
    const [selectedTab, setSelectedTab] = useState("Personal");
    const { data, error, mutate } = useSWR(`${baseURL}/profile`, getFetcher);
    const {
        register: personalRegister,
        handleSubmit: handlePersonalSubmit,
        formState: { errors: personalErrors },
        reset: personalReset,
    } = useForm<PersonalForm>({
        resolver: zodResolver(personalForm),
    });

    const {
        register: passwordRegister,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
        reset: passwordReset,
    } = useForm<ChangePasswordForm>({
        resolver: zodResolver(changePasswordForm),
    });

    useEffect(() => {
        if (data?.PROFILEDETAILS && selectedTab === "Personal") {
            personalReset({
                name: data.PROFILEDETAILS.name,
                username: data.PROFILEDETAILS.username,
                phoneNumber: data.PROFILEDETAILS.phoneNumber,
                email: data.PROFILEDETAILS.email,
            });
        }
    }, [data, personalReset, selectedTab]);

    const onPersonalSubmit = async (formData: PersonalForm) => {
        if (isSubmittingPersonal) return;
        try {
            setIsSubmittingPersonal(true);
            const personalData = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value instanceof FileList) {
                    if (value.length > 0) {
                        personalData.append(key, value[0]);
                    }
                } else {
                    personalData.append(key, value as string);
                }
            });

            const response = await axios.put(`${baseURL}/profile`, personalData, {
                withCredentials: true,
            });

            if (response.data.success) {
                toast.success("Profile updated successfully");
                mutate();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setIsSubmittingPersonal(false);
        }
    };

    const onPasswordSubmit = async (formData: ChangePasswordForm) => {
        if (isSubmittingPassword) return;
        const { confirmPassword, ...rest } = formData;
        try {
            setIsSubmittingPassword(true);
            const response = await axios.put(`${baseURL}/setting/password-change`, rest, {
                withCredentials: true,
            });

            if (response.data.success) {
                toast.success("Password changed successfully");
                passwordReset();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to change password");
        } finally {
            setIsSubmittingPassword(false);
        }
    };

    // if (error) return <div>Failed to load</div>;
    // if (!data) return <div>Loading...</div>;

    return (
        <div className="relative bg-slate-50">
            <div className="w-full h-[300px]">
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/048/909/710/small_2x/amazed-young-woman-shopaholic-holding-colorful-shopping-bags-and-look-amused-at-next-shop-buying-things-in-store-standing-over-blue-background-photo.jpg"
                    alt="Profile banner"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="relative -mt-20 mx-5">
                <div className="px-5">
                    <div className="grid lg:grid-cols-[0.75fr_2.25fr] grid-cols-1 gap-5">
                        <div className="bg-white rounded-sm h-[200px]">
                            <div className="flex flex-col items-center justify-center text-sm p-2">
                                <img src="https://placehold.co/400x400" alt="seller" className="rounded-full w-24 h-24 border-black border-double" />
                                <span className="text-xl font-semibold">{data?.PROFILEDETAILS?.name}</span>
                                <span className="font-normal text-slate-500">{data?.PROFILEDETAILS?.roleId?.name}</span>
                            </div>
                        </div>
                        <div className="rounded-sm bg-white">
                            <div className="flex space-x-2 font-semibold text-sm border-b-2">
                                <button
                                    className={`p-4 ${selectedTab === "Personal" ? 'border-b border-black' : ''}`}
                                    onClick={() => setSelectedTab("Personal")}
                                >
                                    Personal Details
                                </button>
                                <button
                                    className={`p-4 ${selectedTab === "Change Password" ? 'border-b border-black' : ''}`}
                                    onClick={() => setSelectedTab("Change Password")}
                                >
                                    Change Password
                                </button>
                            </div>

                            {selectedTab === "Personal" ? (
                                <form onSubmit={handlePersonalSubmit(onPersonalSubmit)}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 text-sm">
                                        <div className="flex flex-col">
                                            <label>Name<span className="text-red-500">*</span></label>
                                            <Input
                                                type="text"
                                                {...personalRegister("name")}
                                            />
                                            {personalErrors.name && (
                                                <span className="text-red-500 text-xs mt-1">{personalErrors.name.message}</span>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Username<span className="text-red-500">*</span></label>
                                            <Input
                                                type="text"
                                                {...personalRegister("username")}
                                            />
                                            {personalErrors.username && (
                                                <span className="text-red-500 text-xs mt-1">{personalErrors.username.message}</span>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Phone Number<span className="text-red-500">*</span></label>
                                            <Input
                                                type="text"
                                                {...personalRegister("phoneNumber")}
                                            />
                                            {personalErrors.phoneNumber && (
                                                <span className="text-red-500 text-xs mt-1">{personalErrors.phoneNumber.message}</span>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Email Address<span className="text-red-500">*</span></label>
                                            <Input
                                                type="email"
                                                {...personalRegister("email")}
                                            />
                                            {personalErrors.email && (
                                                <span className="text-red-500 text-xs mt-1">{personalErrors.email.message}</span>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Image</label>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                {...personalRegister("image")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-full flex justify-start p-4">
                                        <button
                                            className="relative inline-flex items-center px-4 py-2 mb-4 text-white bg-green-500 rounded-sm shadow-sm text-xs font-medium transition-colors duration-150 ease-in-out hover:bg-green-600 focus:outline-none disabled:bg-green-300"
                                            type="submit"
                                            disabled={isSubmittingPersonal}
                                        >
                                            {isSubmittingPersonal ? 'Updating...' : 'Update'}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 text-sm">
                                        <div className="flex flex-col sm:col-span-2">
                                            <label>Old Password<span className="text-red-500">*</span></label>
                                            <Input
                                                type="password"
                                                {...passwordRegister("oldPassword")}
                                            />
                                            {passwordErrors.oldPassword && (
                                                <span className="text-red-500 text-xs mt-1">{passwordErrors.oldPassword.message}</span>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <label>New Password<span className="text-red-500">*</span></label>
                                            <Input
                                                type="password"
                                                {...passwordRegister("password")}
                                            />
                                            {passwordErrors.password && (
                                                <span className="text-red-500 text-xs mt-1">{passwordErrors.password.message}</span>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Confirm Password<span className="text-red-500">*</span></label>
                                            <Input
                                                type="password"
                                                {...passwordRegister("confirmPassword")}
                                            />
                                            {passwordErrors.confirmPassword && (
                                                <span className="text-red-500 text-xs mt-1">{passwordErrors.confirmPassword.message}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-full flex justify-start p-4">
                                        <button
                                            className="relative inline-flex items-center px-4 py-2 mb-4 text-white bg-green-500 rounded-sm shadow-sm text-xs font-medium transition-colors duration-150 ease-in-out hover:bg-green-600 focus:outline-none disabled:bg-green-300"
                                            type="submit"
                                            disabled={isSubmittingPassword}
                                        >
                                            {isSubmittingPassword ? 'Changing Password...' : 'Change Password'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}