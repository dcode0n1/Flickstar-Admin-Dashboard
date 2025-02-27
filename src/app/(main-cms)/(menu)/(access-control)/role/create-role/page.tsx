"use client";
import CardWrapper from "@/components/Card";
import CusInput from "@/components/CustomInput";
import { useState } from "react";
import CustomBreadCrumb from "@/components/ui/custom-breadcrumbs";
import { AccessControlCreateRoleBreadCrumbs } from "@/constants/bread-crumbs";
import axios from "axios";
import { baseURL } from "@/lib/axioxWithAuth";
import { toast } from "sonner";
import PermissionCategory from "@/components/PermissionCategory";
import { permissionsData } from "./create-role-data";
import { useRouter } from 'next/navigation'


export default function CreateRole() {
    const router = useRouter()
    const [role, setRole] = useState<{ name: string; permissions: string[] }>({ name: "", permissions: [] });
    console.log("-====>role", role)
    const handleInputChange = (field: string, value: string) => setRole((prev) => ({ ...prev, [field]: value }));
    interface Role {
        name: string;
        permissions: string[];
    }
    interface PermissionCategoryProps {
        category: string;
        permissions: string[];
        selectedPermissions: string[];
        onToggle: (permission: string) => void;
    }

    const handleTogglePermission = (permission: string) => {
        setRole((prev: Role) => ({
            ...prev,
            permissions: prev.permissions.includes(permission)
                ? prev.permissions.filter((p) => p !== permission)
                : [...prev.permissions, permission],
        }));
    };
    const handleSubmit = async () => {
        try {
            const createUser = await axios.post(`${baseURL}/role/create-role`, role, { withCredentials: true });
            if (createUser.data.success) {
                toast.success("Role created successfully");
                router.push('list')
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="flex flex-1 flex-col bg-slate-100 ">
            <div className="items-center flex justify-between p-4 border-b shadow-md bg-white">
                <h1 className="text-sm font-bold text-gray-800">ROLE CREATE</h1>
                <CustomBreadCrumb data={AccessControlCreateRoleBreadCrumbs} />
            </div>
            <div className="flex flex-1 flex-col m-4">
                <CardWrapper name="Create Role" viewBtn={false}>
                    <div className="grid grid-cols-1 p-2">
                        <div className="mb-2">
                            <CusInput
                                placeholder="Enter Role Name"
                                onChange={(e) => handleInputChange("name", e.target.value)}
                            />
                        </div>
                        <div>
                            <span className="font-medium text-gray-800">Permissions</span>
                            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
                                {permissionsData.map((category) => (
                                    <PermissionCategory
                                        key={category.category}
                                        category={category.category}
                                        permissions={category.permissions}
                                        selectedPermissions={role.permissions}
                                        onToggle={handleTogglePermission}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        className="relative inline-flex items-center px-4 py-2 mb-4 ml-4 text-white bg-green-500 rounded-sm shadow-sm text-xs font-medium transition-colors duration-150 ease-in-out hover:bg-green-600 focus:outline-none"
                        onClick={handleSubmit}
                    >
                        Add
                    </button>
                </CardWrapper>
            </div>
        </div>
    );
}
