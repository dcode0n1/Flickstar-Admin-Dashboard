'use server'
import { headers } from 'next/headers'
export async function getPermissionSet() {
    const headersList = await headers()
    return headersList.get("x-permissions")
}