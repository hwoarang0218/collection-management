"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MoreVertical, Grid, List, X } from "lucide-react";
import styles from "./page.module.css";
import DashboardLayout from "@/components/Layout/DashboardLayout";

interface Collection {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
}

interface BrandDetails {
  name: string;
  icon: string;
  image: string;
}

export default function BrandCollections() {
  const params = useParams();
  const brand = params?.brand as string | undefined;
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brandDetails, setBrandDetails] = useState<BrandDetails>({
    name: decodeURIComponent(brand as string),
    icon: "",
    image: "",
  });
  const [saveStatus, setSaveStatus] = useState<string>("");
  const [brandLoading, setBrandLoading] = useState(true);
  const [brandError, setBrandError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("/mockData/collections.json");
        const data = await response.json();
        const brandCollections = data.collections.filter(
          (c: Collection) => c.brand.toLowerCase() === brand
        );
        setCollections(brandCollections);
      } catch (err) {
        setError("Failed to load collections");
      } finally {
        setLoading(false);
      }
    };

    const fetchBrandDetails = async () => {
      try {
        const response = await fetch("/mockData/brands.json");
        const data = await response.json();
        const brandData = data.brands.find(
          (b: BrandDetails) =>
            b.name.toLowerCase() ===
            decodeURIComponent(brand as string).toLowerCase()
        );

        if (brandData) {
          setBrandDetails(brandData);
        }
      } catch (err) {
        setBrandError("Failed to load brand details");
      } finally {
        setBrandLoading(false);
      }
    };

    fetchCollections();
    fetchBrandDetails();
  }, [brand]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("Saving...");

    try {
      const response = await fetch("/api/brands/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brand: brand,
          details: brandDetails,
        }),
      });

      if (!response.ok) throw new Error("Failed to save");

      setSaveStatus("Saved successfully!");
      setTimeout(() => setSaveStatus(""), 3000);
      setIsModalOpen(false);
    } catch (error) {
      setSaveStatus("Error saving changes");
      console.error("Failed to save brand details:", error);
    }
  };

  if (loading || brandLoading) return <div>Loading...</div>;
  if (error || brandError) return <div>Error: {error || brandError}</div>;

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h1 className={styles.title}>
            {decodeURIComponent(brand as string)} Collections
          </h1>
          <div className={styles.controls}>
            <button
              onClick={() => setIsGridView(!isGridView)}
              className={styles.viewToggle}
            >
              {isGridView ? <List size={20} /> : <Grid size={20} />}
            </button>
            <MoreVertical
              className={styles.optionsIcon}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2>Edit Brand Details</h2>
                <button
                  className={styles.closeButton}
                  onClick={() => setIsModalOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleEditSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Brand Name:</label>
                  <input
                    type="text"
                    value={brandDetails.name}
                    onChange={(e) =>
                      setBrandDetails({ ...brandDetails, name: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Icon URL:</label>
                  <input
                    type="text"
                    value={brandDetails.icon}
                    onChange={(e) =>
                      setBrandDetails({ ...brandDetails, icon: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Image URL:</label>
                  <input
                    type="text"
                    value={brandDetails.image}
                    onChange={(e) =>
                      setBrandDetails({
                        ...brandDetails,
                        image: e.target.value,
                      })
                    }
                  />
                </div>
                {saveStatus && (
                  <div className={styles.statusMessage}>{saveStatus}</div>
                )}
                <button type="submit" className={styles.submitButton}>
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        <div
          className={`${styles.grid} ${
            isGridView ? styles.gridView : styles.listView
          }`}
        >
          {collections.map((collection) => (
            <div key={collection.id} className={styles.card}>
              <img
                src={collection.image}
                alt={collection.name}
                className={styles.image}
              />
              <div className={styles.cardContent}>
                <h2>{collection.name}</h2>
                <p>{collection.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
