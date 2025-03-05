// PermissionCategory.js
import React from "react";


interface PermissionCategoryProps {
    category: string;
    permissions: { label: string; value: string }[];
    selectedPermissions: string[];
    onToggle: (permission: string) => void;
}

export default function PermissionCategory({ category, permissions, selectedPermissions, onToggle }: PermissionCategoryProps) {
    return (
        <div className="border-gray-300 rounded-sm border p-3 mb-3" >
            <span className="font-xs text-gray-800 " > {category} </span>
            < div className="mt-3 grid md:grid-cols-2 grid-cols- 1 gap-2" >
                {
                    permissions.map((permission) => (
                        <div key={permission.value} className="flex justify-between items-center p-2 rounded-sm border-gray-300 border" >
                            <span>{permission.label} </span>
                            < label className="relative inline-block h-4 w-7 cursor-pointer rounded-full bg-gray-300 transition has-[:checked]:bg-purple-800" >
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={selectedPermissions?.includes(permission.value)}
                                    onChange={() => onToggle(permission.value)}
                                />
                                <span className="absolute inset-y-0 start-0 m-0.5 w-3 h-3 rounded-full bg-gray-300 ring-[4px] ring-inset ring-white transition-all peer-checked:translate-x-3 peer-checked:bg-white peer-checked:ring-transparent" />
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
