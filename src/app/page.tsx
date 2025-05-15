"use client";

import DashboardLayout from "@/components/Layout/DashboardLayout";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to your collection management dashboard!</p>
      </div>
    </DashboardLayout>
  );
}
