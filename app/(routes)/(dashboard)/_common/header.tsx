"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  useKindeBrowserClient,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs";
import { LogOutIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useKindeBrowserClient();

  const isDark = theme === "dark";

  return (
    <div className="border-b border-border bg-background">
      <div className="w-full px-4 lg:px-0 mx-auto max-w-6xl h-11 flex items-center justify-between">
        <div>
          <SidebarTrigger />
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full size-8"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            <SunIcon
              className={cn(
                "size-5 absolute",
                isDark ? "scale-100" : "scale-0",
              )}
            />
            <MoonIcon
              className={cn(
                "size-5 absolute",
                isDark ? "scale-0" : "scale-100",
              )}
            />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="size-8 shrink-0 rounded-full">
                <AvatarImage
                  src={user?.picture || ""}
                  alt={user?.given_name?.charAt(0) || ""}
                />
                <AvatarFallback className="rounded-full">
                  {user?.given_name?.charAt(0)}
                  {user?.family_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <LogoutLink className="w-full flex items-center gap-1">
                  <LogOutIcon className="size-4" />
                  <span>Logout</span>
                </LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
