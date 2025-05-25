import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { UserCircle, Settings, LogOut, User, X, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

interface NavbarProps {
  onMenuClick: () => void;
  session?: {
    user?: {
      name?: string;
      email?: string;
      image?: string;
    };
  };
}

interface ThemeOption {
  name: string;
  color: string;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, session }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const themeOptions: ThemeOption[] = [
    { name: "Dark", color: "#333333" },
    { name: "Light", color: "#ffffff" },
    { name: "Blue", color: "#1e90ff" },
    {
      name: "Gradient",
      color:
        "linear-gradient(66deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
    },
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
      <div
        className={styles.logo}
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Collection Management
      </div>
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
            <div
              className={styles.userInfo}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    marginBottom: 16,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <UserCircle size="64px" className={styles.userAvatar} />
              )}
              <h3>{session?.user?.name || "Unknown User"}</h3>
              <p>{session?.user?.email || ""}</p>
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
                        style={{
                          background: theme.color,
                          width: "16px",
                          height: "16px",
                        }}
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
              <button
                className={styles.menuItem}
                onClick={() =>
                  signOut({ callbackUrl: "https://accounts.google.com/logout" })
                }
              >
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
