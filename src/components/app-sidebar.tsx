"use client"

import * as React from "react"
import { data } from '@/constants/side-nav-routes'
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"


import { usePermissionStore } from "@/store/permission-store";

type NavItemType = {
  title: string
  url: string
  icon?: any
  isActive?: boolean
  permission?: string
  items?: {
    title: string
    url: string
    permission?: string
    items?: {
      title: string
      url: string
      permission?: string
    }[]
  }[]
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  return (
    <Sidebar collapsible="icon" {...props}>
      {state == "expanded" ?
        (
          <div className="items-center flex justify-center p-5"><Image src="/flick-star-logo.png" width={50} height={50} alt="flickstar-logo-long" />
          </div>
        )
        : (
          <Image src="/flick-star-logo.png" alt="flickstar-logo-short" width={50} height={50} />
        )
      }
      <SidebarContent>
        <NavMain items={data.navMenu} parentText="MENU" />
        <NavMain items={data.media} parentText="MEDIA" />
        <NavMain items={data.navReport} parentText="USER, REPORT AND FEEDBACK" />
        <NavMain items={data.navSystemSettings} parentText="SYSTEM SETTING" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
