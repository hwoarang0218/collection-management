import React, { useState, useMemo } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import collectionsData from "../../../public/mockdata/collections.json";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

  const brandGroups = useMemo(() => {
    const brands = [
      ...new Set(collectionsData.collections.map((c) => c.brand)),
    ];
    return brands.sort();
  }, []);

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.closeButton} onClick={onClose}>
        ×
      </div>
      <nav className={styles.navigation}>
        <Link href="/" className={styles.navItem}>
          Dashboard
        </Link>
        <div>
          <div
            className={styles.navItem}
            onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
            style={{ cursor: "pointer" }}
          >
            Collections {isCollectionsOpen ? "" : ""}
          </div>
          {isCollectionsOpen && (
            <div className={styles.subMenu}>
              {brandGroups.map((brand) => (
                <Link
                  key={brand}
                  href={`/collections/${brand.toLowerCase()}`}
                  className={styles.subMenuItem}
                >
                  {brand}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link href="/3d" className={styles.navItem}>
          3D View
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
