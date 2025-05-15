import React from "react";
import styles from "./DashboardCards.module.css";

const DashboardCards: React.FC = () => {
  return (
    <div className={styles.cardsGrid}>
      <div className={styles.card}>
        <h3>Total Collection</h3>
        <p className={styles.number}>156</p>
      </div>
      <div className={styles.card}>
        <h3>Add Collection</h3>
        <button className={styles.addButton}>+ New Item</button>
      </div>
      <div className={styles.card}>
        <h3>Activity Log</h3>
        <div className={styles.activityList}>
          <p>Item added - 2h ago</p>
          <p>Collection updated - 5h ago</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
