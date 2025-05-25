"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "../../components/Layout/DashboardLayout";

interface Collection {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
}

export default function Page() {
  const params = useParams();
  const brand = params?.brand as string | undefined;
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("/mockData/collections.json");
        const data = await response.json();
        const Page = data.collections.filter(
          (c: Collection) => c.brand.toLowerCase() === brand
        );
        setCollections(Page);
      } catch (err) {
        setError("Failed to load collections");
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [brand]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DashboardLayout>
      <Page />
    </DashboardLayout>
  );
}
