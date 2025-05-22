import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import DashboardLayout from "@/components/Layout/DashboardLayout";

interface Collection {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  createdAt: string;
}

interface OpenGraphData {
  title?: string;
  description?: string;
  image?: string;
  url: string;
  siteName?: string;
  type?: string;
  author?: string;
  publisher?: string;
}

interface FormData {
  name: string;
  description: string;
  category: string;
  brand: string;
  url: string;
}

const Cards: React.FC = () => {
  const [showSlideForm, setShowSlideForm] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    category: "",
    brand: "",
    url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ogData, setOgData] = useState<OpenGraphData | null>(null);
  const [isLoadingOG, setIsLoadingOG] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const response = await fetch("/mockData/collections.json");
        const data = await response.json();
        setCollections(data.collections);
      } catch (error) {
        console.error("Error loading collections:", error);
        setCollections([]);
      }
    };

    loadCollections();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchOpenGraphData = async (url: string) => {
    setIsLoadingOG(true);
    try {
      const response = await fetch(
        `/api/metadata?url=${encodeURIComponent(url)}`
      );
      const metadata = await response.json();

      const ogData: OpenGraphData = {
        title: metadata.title || "",
        description: metadata.description || "",
        image: metadata.image || "",
        url: metadata.url,
        siteName: metadata.siteName,
        type: metadata.type,
        author: metadata.author,
        publisher: metadata.publisher,
      };

      setOgData(ogData);
      setFormData((prev) => ({
        ...prev,
        name: prev.name || ogData.title || "",
        description: prev.description || ogData.description || "",
        brand: prev.brand || ogData.siteName || ogData.publisher || "",
        category: prev.category || ogData.type || "",
      }));
    } catch (error) {
      console.error("Error fetching metadata:", error);
    } finally {
      setIsLoadingOG(false);
    }
  };

  const handleUrlBlur = () => {
    if (formData.url) {
      fetchOpenGraphData(formData.url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newCollection = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      // Save to JSON file via API
      const response = await fetch("/api/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCollection),
      });

      if (!response.ok) {
        throw new Error("Failed to save collection");
      }

      setCollections((prev) => [...prev, newCollection]);
      setFormData({
        name: "",
        description: "",
        category: "",
        brand: "",
        url: "",
      });
      setShowSlideForm(false);
    } catch (error) {
      console.error("Error adding collection:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showSlideForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.slideForm}>
            <div className={styles.formHeader}>
              <h2>Add New Collection</h2>
              <button
                className={styles.closeButton}
                onClick={() => setShowSlideForm(false)}
              >
                ×
              </button>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formContent}>
                <div className={styles.formGroup}>
                  <label htmlFor="url">URL</label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    onBlur={handleUrlBlur}
                    placeholder="Enter item URL"
                  />
                </div>

                {isLoadingOG && (
                  <div className={styles.loading}>Loading preview...</div>
                )}

                {ogData && (
                  <div className={styles.ogPreview}>
                    {ogData.image && (
                      <img
                        src={ogData.image}
                        alt="Preview"
                        className={styles.ogImage}
                      />
                    )}
                    <div className={styles.ogInfo}>
                      <h4>{ogData.title}</h4>
                      <p>{ogData.description}</p>
                      {ogData.siteName && <p>Site: {ogData.siteName}</p>}
                      {ogData.author && <p>Author: {ogData.author}</p>}
                    </div>
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label htmlFor="name">Item Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a category</option>
                    <option value="books">Books</option>
                    <option value="music">Music</option>
                    <option value="games">Games</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="brand">Brand</label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="Enter brand name"
                  />
                </div>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showActivityModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.slideForm}>
            <div className={styles.formHeader}>
              <h2>Activity Log</h2>
              <button
                className={styles.closeButton}
                onClick={() => setShowActivityModal(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.fullActivityList}>
                {collections
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((item) => (
                    <div key={item.id} className={styles.activityItem}>
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                      <small>
                        Added: {new Date(item.createdAt).toLocaleString()}
                      </small>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.cardsGrid}>
        <div className={styles.card}>
          <h3>Total Collection</h3>
          <p className={styles.number}>{collections.length}</p>
        </div>
        <div className={styles.card}>
          <h3>Add Collection</h3>
          <button
            className={styles.addButton}
            onClick={() => setShowSlideForm(true)}
          >
            + New Item
          </button>
        </div>
        <div className={`${styles.card} ${styles.preorderCard}`}>
          <h3>Preorder/Upcoming</h3>
          <span className={styles.preorderBadge}>Coming Soon</span>
          <p>No items in preorder</p>
        </div>
        <div
          className={`${styles.card} ${styles.clickable}`}
          onClick={() => setShowActivityModal(true)}
        >
          <h3>Activity Log</h3>
          <div className={styles.activityList}>
            {collections
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .slice(0, 2)
              .map((item) => (
                <p key={item.id}>
                  {item.name} - {new Date(item.createdAt).toLocaleString()}
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
