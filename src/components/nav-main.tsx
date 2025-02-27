"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from 'next/navigation'

export function NavMain({ items, parentText }: {
  items?: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      items?: {
        title: string
        url: string
      }[]
    }[]
  }[],
  parentText: string
}) {
  const pathname = usePathname()
  const { state, isMobile } = useSidebar()

  const isLinkActive = (url: string) => pathname === url
  const isGroupActive = (item: any) => {
    if (isLinkActive(item.url)) return true
    if (item.items) {
      return item.items.some((subItem: any) => {
        if (isLinkActive(subItem.url)) return true
        if (subItem.items) {
          return subItem.items.some((subSubItem: any) => isLinkActive(subSubItem.url))
        }
        return false
      })
    }
    return false
  }

  const renderExpandedView = (item: any) => (
    <Collapsible asChild defaultOpen={isGroupActive(item)} className="group/collapsible">
      <div>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className={isGroupActive(item) ? "bg-primary/10 text-primary" : ""}>
            {item.icon && <item.icon className={isGroupActive(item) ? "text-primary" : ""} />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem: any) => (
              <SidebarMenuSubItem key={subItem.title}>
                {subItem.items ? (
                  <Collapsible asChild defaultOpen={isGroupActive(subItem)}>
                    <div>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuSubButton className={isGroupActive(subItem) ? "bg-primary/10 text-primary" : ""}>
                          <span>{subItem.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuSubButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {subItem.items.map((subSubItem :any) => (
                            <SidebarMenuSubItem key={subSubItem.title}>
                                <SidebarMenuSubButton className={isLinkActive(subSubItem.url) ? "bg-primary/10 text-primary" : ""} href={subSubItem.url}>
                                  <span>{subSubItem.title}</span>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                ) : (
                  
                    <SidebarMenuSubButton className={isLinkActive(subItem.url) ? "bg-primary/10 text-primary" : ""} href={subItem.url}>
                      <span>{subItem.title}</span>
                    </SidebarMenuSubButton>
                )}
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )

  const renderCollapsedView = (item: any) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className={isGroupActive(item) ? "bg-primary/10 text-primary" : ""}>
          {item.icon && <item.icon className={isGroupActive(item) ? "text-primary" : ""} />}
          <span>{item.title}</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={isMobile ? "bottom" : "right"} align={isMobile ? "end" : "start"} className="min-w-56">
        {item.items?.map((subItem:any) => (
          subItem.items ? (
            <DropdownMenuSub key={subItem.title}>
              <DropdownMenuSubTrigger>{subItem.title}</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {subItem.items.map((subSubItem : any) => (
                  <DropdownMenuItem key={subSubItem.title} asChild>
                    <Link href={subSubItem.url}>{subSubItem.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ) : (
            <DropdownMenuItem key={subItem.title} asChild>
              <Link href={subItem.url}>{subItem.title}</Link>
            </DropdownMenuItem>
          )
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{parentText}</SidebarGroupLabel>
      <SidebarMenu>
        {items && items.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.items ? (
              state === "collapsed" ? renderCollapsedView(item) : renderExpandedView(item)
            ) : (
              <Link href={item.url}>
                <SidebarMenuButton className={isLinkActive(item.url) ? "bg-primary/10 text-primary" : ""}>
                  {item.icon && <item.icon className={isLinkActive(item.url) ? "text-primary" : ""} />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}