"use client";
import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";
import Login from "../app/login/page";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Cards from "../app/cards/page";
import CollectionByBrand from "../components/dashboard/CollectionByBrand";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <Login session={session} />;
  } else {
    return (
      <DashboardLayout>
        <Cards />
        <CollectionByBrand />
      </DashboardLayout>
    );
  }
}
