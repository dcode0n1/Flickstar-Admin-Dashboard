"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, Maximize, Paintbrush, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
            console.error(`Error trying to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}
export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:4002/api/logout', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            }).then((res) => res.json());
            if (response.success) {
                toast.success('Logout Successfull');
                router.push('/login');
            } else {
                toast.error('Invalid credentials, please try again.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('An error occurred. Please try again.');
        }
    };
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="flex flex-col h-full">
                    <header className="sticky top-0 z-40 flex h-14 bg-white transition-all ease-linear px-4">
                        <div className="flex w-full justify-between items-center">
                            {/* Left Section - Sidebar and Action icons */}
                            <div className="flex">
                                <SidebarTrigger />
                                <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-purple-50" title="Clear Cache">
                                    <Paintbrush size={18} />
                                </button>
                            </div>
                            {/* Right Section - Currency, Language, Cart, Fullscreen, and Logout */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    className="h-10 w-10 rounded-full hover:bg-purple-50 hidden sm:flex"
                                    title="Full Screen"
                                    onClick={toggleFullScreen}
                                >
                                    <Maximize size={18} />
                                </Button>
                                {/* Logout Button */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger>  
                                        <div
                                            className="group flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full px-2 sm:px-2 py-1 transition-colors"
                                        >
                                            <img
                                                src="https://placehold.co/30x30"
                                                alt="User avatar"
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <div className="hidden sm:flex flex-col items-start leading-tight">
                                                <span className="text-sm font-medium">Admin</span>
                                                <span className="text-xs opacity-90">SuperAdmin</span>
                                            </div>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Welcome Admin</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => {
                                            router.push('/profile');
                                        }}><User />Setting</DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleLogout}><LogOut />Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 h-full bg-slate-50">
                        {children}
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}