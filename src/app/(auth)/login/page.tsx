'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

// Zod schema for validation
const loginSchema = z.object({
    username: z.string().min(8, { message: "Username must be at least 8 characters long" }),
    password: z.string().min(3, { message: "Password must be at least 3 characters long" }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AuthPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    // react-hook-form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include',
            }).then((res) => res.json());
            if (response.success) {
                toast.success('Login successful');
                router.push('/dashboard');
            } else {
                toast.error('Invalid credentials, please try again.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('An error occurred. Please try again.');
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
                                            <p className="text-gray-500 mt-2">Sign in to continue</p>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} className="p-2">
                                        {/* Username Field */}
                                        <div className="mb-4">
                                            <label htmlFor="username" className="block text-gray-700">
                                                Username <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                type="text"
                                                id="username"
                                                className={`form-input mt-1 block w-full border-gray-300 ${errors.username ? 'border-red-500' : ''
                                                    }`}
                                                placeholder="Enter username"
                                                {...register('username')}
                                            />
                                            {errors.username && (
                                                <p className="text-red-500 text-sm">{errors.username.message}</p>
                                            )}
                                        </div>
                                        {/* Password Field */}
                                        <div className="mb-4">
                                            <div className="flex justify-between mb-1">
                                                <label htmlFor="password" className="block text-gray-700">
                                                    Password <span className="text-red-500">*</span>
                                                </label>
                                                <Link href="/forget-password" className="text-sm text-gray-500">
                                                    Forgot password?
                                                </Link>
                                            </div>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? 'text' : 'password'}
                                                    id="password"
                                                    className={`form-input mt-1 block w-full border-gray-300 pr-10 ${errors.password ? 'border-red-500' : ''
                                                        }`}
                                                    placeholder="Enter password"
                                                    {...register('password')}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <Image
                                                        src={showPassword ? '/eye-open.svg' : '/eye-slash.svg'}
                                                        alt={showPassword ? 'Hide Password' : 'Show Password'}
                                                        width={20}
                                                        height={20}
                                                    />
                                                </button>
                                            </div>
                                            {errors.password && (
                                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                                            )}
                                        </div>
                                        {/* Remember Me Checkbox */}
                                        <div className="flex items-center mb-4">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-indigo-600 border-gray-300 rounded"
                                                id="remember_me"
                                            />
                                            <label htmlFor="remember_me" className="ml-2 text-gray-700">
                                                Remember me
                                            </label>
                                        </div>
                                        {/* Submit Button */}
                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                className="btn btn-success w-full py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                                            >
                                                Sign in
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
