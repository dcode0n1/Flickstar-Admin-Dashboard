'use client';

import Link from 'next/link';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

// Define Zod schema for email validation
const emailSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
});

type EmailForm = z.infer<typeof emailSchema>;

export default function ForgetPassword() {
    const router = useRouter();

    // react-hook-form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EmailForm>({
        resolver: zodResolver(emailSchema),
    });

    const onSubmit = async (data: EmailForm) => {
        try {
            const response = await axios.post(`http://localhost:4000/api/forget-password`, data, { withCredentials: true });
            if (response.data.success) {
                toast.success("Password reset link sent!");
                localStorage.setItem('email', data.email); // Store email in localStorage
                router.push('/verify');
                reset(); // Reset the form
            } else {
                toast.error('Unable to send reset link. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
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
                                            <p className="text-gray-500 mt-2">Reset Password || OONZOO</p>
                                        </div>
                                    </div>
                                    {/* Form */}
                                    <form onSubmit={handleSubmit(onSubmit)} className="p-2">
                                        {/* Email Input */}
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-gray-700">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                type="email"
                                                id="email"
                                                className={`form-input mt-1 block w-full rounded-md border-gray-300 ${errors.email ? 'border-red-500' : ''
                                                    }`}
                                                placeholder="Enter Email"
                                                {...register('email')}
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                            )}
                                        </div>

                                        {/* Login Link */}
                                        <div className="flex justify-end mb-4">
                                            <Link href="/login" className="text-sm text-gray-500 hover:underline">
                                                Login?
                                            </Link>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                className="btn btn-success w-full py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                                            >
                                                Password Reset
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
