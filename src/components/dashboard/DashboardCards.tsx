import React, { useState } from "react";
import styles from "./DashboardCards.module.css";

const DashboardCards: React.FC = () => {
  const [showSlideForm, setShowSlideForm] = useState(false);

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
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Item Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" rows={3} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="category">Category</label>
                <select id="category" name="category">
                  <option value="">Select a category</option>
                  <option value="books">Books</option>
                  <option value="music">Music</option>
                  <option value="games">Games</option>
                </select>
              </div>
              <button type="submit" className={styles.submitButton}>
                Add Item
              </button>
            </form>
          </div>
        </div>
      )}

      <div className={styles.cardsGrid}>
        <div className={styles.card}>
          <h3>Total Collection</h3>
          <p className={styles.number}>156</p>
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
        <div className={styles.card}>
          <h3>Activity Log</h3>
          <div className={styles.activityList}>
            <p>Item added - 2h ago</p>
            <p>Collection updated - 5h ago</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCards;
