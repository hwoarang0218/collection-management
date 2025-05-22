"use client";

import DashboardLayout from "@/components/Layout/DashboardLayout";
import CollectionByBrand from "@/components/dashboard/CollectionByBrand";
import Cards from "./cards/page";

export default function Home() {
  return (
    <DashboardLayout>
      <Cards />
      <CollectionByBrand />
    </DashboardLayout>
  );
}
