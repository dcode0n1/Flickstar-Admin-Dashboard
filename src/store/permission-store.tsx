"use client"
import { create } from "zustand";
import { getPermissionSet } from "@/actions/permissionActions";
import { useEffect, type FC } from "react";

interface PermissionStore {
  permissions: string[];
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  setPermissions: (permissions: string[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const usePermissionStore = create<PermissionStore>((set, get) => ({
  permissions: [],
  isLoading: true,
  hasPermission: (permission: string) => {
    return get().permissions.includes(permission);
  },
  hasAnyPermission: (permissionSet: string[]) => {
    const { permissions } = get();
    return permissionSet.some((permission) => permissions.includes(permission));
  },
  hasAllPermissions: (permissionSet: string[]) => {
    const { permissions } = get();
    return permissionSet.every((permission) =>
      permissions.includes(permission)
    );
  },
  setPermissions: (permissions: string[]) => {
    set({ permissions });
  },
  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
}));



export const InitializePermission: FC = () => {
  const setPermissions = usePermissionStore((state) => state.setPermissions);
  const setIsLoading = usePermissionStore((state) => state.setIsLoading);
  const handlePermission = async () => {
    try {
      const response = await getPermissionSet();
      if (response) {
        const parsedPermissions = JSON.parse(response);
        setPermissions(
          Array.isArray(parsedPermissions) ? parsedPermissions : []
        );
      }
    } catch (error) {
      console.error("Failed to fetch permissions:", error);
      setPermissions([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handlePermission();
  }, []);

  return null;
};
