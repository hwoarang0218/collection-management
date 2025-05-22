"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./DashboardLayout.module.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.dashboard}>
      <Navbar onMenuClick={toggleSidebar} />
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
