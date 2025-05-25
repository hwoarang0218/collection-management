"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./DashboardLayout.module.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSession } from "next-auth/react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.dashboard}>
      <Navbar
        onMenuClick={toggleSidebar}
        session={
          session
            ? {
                user: {
                  name: session.user?.name ?? undefined,
                  email: session.user?.email ?? undefined,
                  image: session.user?.image ?? undefined,
                },
              }
            : undefined
        }
      />
      <div className={styles.contentWrapper}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main
          className={`${styles.mainContent} ${
            pathname === "/" ? styles.homePage : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
