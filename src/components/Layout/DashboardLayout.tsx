import React, { useState } from "react";
import styles from "./DashboardLayout.module.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar"; // Adjust the import path as necessary

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
