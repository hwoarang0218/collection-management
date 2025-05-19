import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { UserCircle, Settings, LogOut, User, X, Palette } from "lucide-react";
import { useTheme } from "next-themes";

interface NavbarProps {
  onMenuClick: () => void;
}

interface ThemeOption {
  name: string;
  color: string;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const themeOptions: ThemeOption[] = [
    { name: "Dark", color: "#333333" },
    { name: "Light", color: "#ffffff" },
    { name: "Blue", color: "#1e90ff" },
  ];

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleCustomize = () => {
    setIsCustomizeOpen(!isCustomizeOpen);
  };

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName.toLowerCase());
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

              <button className={styles.menuItem} onClick={toggleCustomize}>
                <Palette size={18} />
                <span>Customize</span>
              </button>
              {isCustomizeOpen && (
                <div className={styles.submenuItems}>
                  {themeOptions.map((theme) => (
                    <button
                      key={theme.name}
                      className={styles.submenuItem}
                      onClick={() => handleThemeChange(theme.name)}
                    >
                      <div
                        className={styles.colorIcon}
                        style={{ backgroundColor: theme.color }}
                      />
                      <span>{theme.name}</span>
                    </button>
                  ))}
                </div>
              )}
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
