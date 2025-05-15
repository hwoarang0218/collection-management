import React from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.closeButton} onClick={onClose}>
        ×
      </div>
      <nav className={styles.navigation}>
        <Link href="/dashboard" className={styles.navItem}>
          Dashboard
        </Link>
        <Link href="/collections" className={styles.navItem}>
          Collections
        </Link>
        <Link href="/items" className={styles.navItem}>
          Items
        </Link>
        <Link href="/settings" className={styles.navItem}>
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
