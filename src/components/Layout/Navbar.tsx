import React from "react";
import styles from "./Navbar.module.css";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.menuButton} onClick={onMenuClick}>
        <span className={styles.menuIcon}></span>
      </div>
      <div className={styles.logo}>Collection Management</div>
      <div className={styles.userMenu}>
        <button className={styles.profileButton}>Profile</button>
      </div>
    </nav>
  );
};

export default Navbar;
