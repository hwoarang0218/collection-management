import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { UserCircle, Settings, LogOut, User, X } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.menuButton} onClick={onMenuClick}>
        <span className={styles.menuIcon}></span>
      </div>
      <div className={styles.logo}>Collection Management</div>
      <div className={styles.userMenu}>
        <UserCircle
          onClick={toggleUserMenu}
          className={styles.userIcon}
          size="32px"
        />
        <div
          className={`${styles.userMenuModal} ${
            isUserMenuOpen ? styles.open : ""
          }`}
        >
          <div className={styles.userMenuContent}>
            <button className={styles.closeButton} onClick={toggleUserMenu}>
              <X size={20} />
            </button>
            <div className={styles.userInfo}>
              <UserCircle size="64px" className={styles.userAvatar} />
              <h3>John Doe</h3>
              <p>john.doe@example.com</p>
            </div>
            <div className={styles.menuItems}>
              <button className={styles.menuItem}>
                <User size={18} />
                <span>Profile</span>
              </button>
              <button className={styles.menuItem}>
                <Settings size={18} />
                <span>Settings</span>
              </button>
              <div className={styles.divider} />
              <button className={styles.menuItem}>
                <LogOut size={18} />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
