"use client";

import Logo from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Settings, WorkflowIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  {
    title: "Workflows",
    url: "/workflow",
    icon: WorkflowIcon,
  },
  // {
  //   title: "Settings",
  //   url: "/settings",
  //   icon: Settings,
  // },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between px-4">
        <Logo />
        {/* <SidebarTrigger /> */}
      </SidebarHeader>
      <SidebarContent className="px-2 pt-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={pathname === item.url}
                onClick={() => router.push(item.url)}
                className="data-[active=true]:bg-primary/10 hover:bg-primary/10"
              >
                <item.icon />
                <span className="font-medium">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
