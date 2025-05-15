// "use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <h1>Dashboard</h1>
        <div className={styles.gridContainer}>
          <div className={styles.card}>
            <h2>Total Collections</h2>
            <p>0</p>
          </div>
          <div className={styles.card}>
            <h2>Total Items</h2>
            <p>0</p>
          </div>
          <div className={styles.card}>
            <h2>Recent Activity</h2>
            <p>No recent activity</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
