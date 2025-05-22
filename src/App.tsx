import React, { useState, useEffect } from "react";
import styles from "./Collections.module.css";
import { useParams } from "next/navigation";

interface Collection {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string; // Add this line
}

const Collections: React.FC = () => {
  const params = useParams<{ brand: string }>();
  const brand = params?.brand || "";
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("/mockData/collections.json");
        const data = await response.json();
        const brandCollections = data.collections.filter(
          (collection: Collection) => collection.brand === brand
        );
        setCollections(brandCollections);
      } catch (error) {
        console.error("Error fetching collections:", error);
        setCollections([]);
      }
    };

    if (brand) {
      fetchCollections();
    }
  }, [brand]);

  return (
    <div className={styles.collectionsPage}>
      <h1>Collections for {brand}</h1>
      <div className={styles.collectionsGrid}>
        {collections.map((collection) => (
          <div key={collection.id} className={styles.collectionItem}>
            <img
              src={collection.image}
              alt={collection.name}
              className={styles.collectionImage}
            />
            <h3>{collection.name}</h3>
            <p>Category: {collection.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
