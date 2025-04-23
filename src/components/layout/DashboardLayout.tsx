
import { ReactNode } from "react";
import NavigationBar from "./NavigationBar";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "admin" | "user";
}

const DashboardLayout = ({ children, userType }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar isLoggedIn={true} userType={userType} />
      <Sidebar userType={userType} />
      <main className="pt-16 pl-64 min-h-screen">
        <div className="p-6 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
