
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Book,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  Settings,
  User,
  Bell,
  BookOpen,
  Clock,
  Users,
} from "lucide-react";

interface SidebarProps {
  userType: "admin" | "user";
}

const Sidebar = ({ userType }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const userLinks = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Browse Books", path: "/books", icon: Book },
    { name: "My Books", path: "/my-books", icon: BookOpen },
    { name: "History", path: "/history", icon: Clock },
    { name: "Notifications", path: "/notifications", icon: Bell },
    { name: "Profile", path: "/profile", icon: User },
  ];
  
  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Manage Books", path: "/admin/books", icon: Book },
    { name: "Issued Books", path: "/admin/issued", icon: BookOpen },
    { name: "Due Dates", path: "/admin/due-dates", icon: Calendar },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Notifications", path: "/admin/notifications", icon: Bell },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];
  
  const links = userType === "admin" ? adminLinks : userLinks;

  return (
    <div
      className={cn(
        "h-screen fixed top-0 left-0 z-40 bg-white border-r border-gray-100 pt-16 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              const LinkIcon = link.icon;
              
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={cn(
                      "flex items-center p-3 rounded-lg transition-all",
                      isActive
                        ? "bg-library-lavender text-library-purple"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <LinkIcon className={cn("h-5 w-5", isActive ? "text-library-purple" : "")} />
                    {!collapsed && (
                      <span className="ml-3 transition-opacity">{link.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="pt-4 mt-auto border-t border-gray-100">
          <Link
            to="/"
            onClick={() => console.log("Log out")}
            className="flex items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Sign Out</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
