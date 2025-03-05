"use client";
import CardWrapper from "@/components/Card";
import CusInput from "@/components/CustomInput";
import CustomBreadCrumb from "@/components/ui/custom-breadcrumbs";
import { AccessControlUpdateRoleBreadCrumbs } from "@/constants/bread-crumbs";
import axios from "axios";
import { baseURL } from "@/lib/axioxWithAuth";
import { toast } from "sonner";
import PermissionCategory from "@/components/PermissionCategory";
import { permissionsData } from "../create-role/create-role-data";
import { useParams , useRouter} from "next/navigation";
import useSWR from "swr";
import { getFetcher } from "@/lib/fetcher";

export default function UpdateRole() {
    const params = useParams();
    const router = useRouter()
    const { data: roleData, error, mutate } = useSWR(
        `${baseURL}/role/${params.id}`,
        getFetcher
    );
    console.log(roleData)
    const handleInputChange = (field: string, value: string) => {
        // Optimistically update the local cache using mutate
        mutate(
            (currentData: any) => {
                if (!currentData) return currentData;
                return {
                    ...currentData,
                    name: value, // Update the role name locally
                };
            },
            false // Set this to false to prevent revalidation after the mutation
        );
    };
    const handleTogglePermission = (permission: string) => {
        mutate(
            (currentData: any) => {
                if (!currentData) return currentData;
                const updatedPermissions = currentData.permissions?.includes(permission)
                    ? currentData.permissions.filter((p: string) => p !== permission)
                    : [...currentData.permissions, permission];

                return {
                    ...currentData,
                    permissions: updatedPermissions,
                };
            },
            false // Prevent revalidation here too
        );
    };

    // Handle submitting all changes at once
    const handleSubmit = async () => {
        try {
            // Prepare the updated role data
            const updatedRole = {
                name: roleData.name,
                permissions: roleData.permissions,
            };
            // Make a single API call to update the role
            await axios.put(
                `${baseURL}/role/${params.id}`,
                updatedRole,
                { withCredentials: true }
            );
            mutate();

            toast.success("Role updated successfully");
            router.push('list')
        } catch (error: any) {
            toast.error("Failed to update. Please try again.");
        }
    };
    if (error) return <div>Failed to load data</div>;
    if (!roleData) return <div>Loading...</div>;
    return (
        <div className="flex flex-1 flex-col bg-slate-100 ">
            <div className="items-center flex justify-between p-4 border-b shadow-md bg-white">
                <h1 className="text-sm font-bold text-gray-800">ROLE UPDATE</h1>
                <CustomBreadCrumb data={AccessControlUpdateRoleBreadCrumbs} />
            </div>
            <div className="flex flex-1 flex-col m-4">
                <CardWrapper name="Update Role" viewBtn={false}>
                    <div className="grid grid-cols-1 p-2">
                        <div className="mb-2">
                            <CusInput
                                placeholder="Enter Role Name"
                                inputBoxValue={roleData.name}
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
                                        selectedPermissions={roleData.permissions}
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
                        Update
                    </button>
                </CardWrapper>
            </div>
        </div>
    );
}
