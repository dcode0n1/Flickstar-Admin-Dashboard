'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

// Define Zod schema for OTP validation
const otpSchema = z.object({
    otp: z.string().min(6, { message: "OTP must be at least 6 characters long" }),
});

type OTPForm = z.infer<typeof otpSchema>;

export default function VerifyOTP() {
    const router = useRouter();

    // Retrieve email from localStorage safely
    const [email, setEmail] = useState<string | null>(null);
    useEffect(() => {
        setEmail(localStorage.getItem('email'));
    }, []);

    // react-hook-form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OTPForm>({
        resolver: zodResolver(otpSchema),
    });

    const onSubmit = async (data: OTPForm) => {
        try {
            const response = await axios.post(
                `http://localhost:4000/api/verify-otp`,
                { otp: data.otp, email },
                { withCredentials: true }
            );
            if (response.data.success) {
                localStorage.removeItem('email');
                toast.success('Verification successful');
                router.push('/dashboard');
            } else {
                toast.error('Unable to verify OTP. Please try again.');
            }
        } catch (error) {
            console.error('Verification error:', error);
            toast.error('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="bg-gradient-to-r from-[#200049] via-[#4679E4] to-[#16002F] min-h-screen flex items-center justify-center">
            <div className="container mx-auto">
                <div className="flex items-center justify-center flex-col">
                    <div className="w-full flex justify-center">
                        <div className="md:w-2/3 lg:w-1/2 xl:w-1/3">
                            <div className="card mt-4 bg-white shadow-lg rounded-sm">
                                <div className="card-body p-6">
                                    <div className="items-center flex text-center mt-2">
                                        <div className="flex flex-col items-center mx-auto">
                                            <img
                                                src="./flick-star-logo.png"
                                                className="w-20"
                                                alt="CartUser Logo"
                                            />
                                            <p className="text-gray-500 mt-2">Account Verification</p>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} className="p-2">
                                        {/* OTP Input */}
                                        <div className="mb-4">
                                            <label htmlFor="otp-code" className="block text-gray-700">
                                                Enter Verification Code <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                type="text"
                                                id="otp-code"
                                                className={`mt-1 block w-full rounded-md border-gray-300 ${errors.otp ? 'border-red-500' : ''
                                                    }`}
                                                placeholder="Enter code"
                                                {...register('otp')}
                                            />
                                            {errors.otp && (
                                                <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                className="btn btn-success w-full py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                                            >
                                                Verify
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
