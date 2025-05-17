import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styles from "./CollectionByBrand.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getBrandLogo } from "../../utils/logoFetcher";

interface Collection {
  id: string;
  name: string;
  brand: string;
  category: string;
}

interface BrandData {
  name: string;
  items: number;
  logo: string;
}

const CollectionByBrand: React.FC = () => {
  const [brandsWithLogos, setBrandsWithLogos] = useState<BrandData[]>([]);

  useEffect(() => {
    const loadBrandsData = async () => {
      try {
        // Fetch collections data
        const response = await fetch("/mockData/collections.json");
        const data = await response.json();
        const collections: Collection[] = data.collections;

        // Process collections into brand statistics
        const brandStats = collections.reduce((acc, item) => {
          const brand = item.brand || "Unspecified";
          acc[brand] = (acc[brand] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Convert to BrandData array and load logos
        const brandsData = await Promise.all(
          Object.entries(brandStats).map(async ([name, items]) => ({
            name,
            items,
            logo: await getBrandLogo(name),
          }))
        );

        setBrandsWithLogos(brandsData);
      } catch (error) {
        console.error("Error loading brands data:", error);
        setBrandsWithLogos([]);
      }
    };

    loadBrandsData();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: "20px",
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "15px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          arrows: false,
          centerPadding: "10px",
        },
      },
    ],
  };

  return (
    <section className={styles.brandSection}>
      <h2 className={styles.sectionTitle}>Explore Collection</h2>
      <Slider {...settings} className={styles.brandSlider}>
        {brandsWithLogos.map((brand, index) => (
          <div key={index} className={styles.brandCardWrapper}>
            <div
              className={styles.brandCard}
              style={{
                backgroundImage: `url(${brand.logo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                margin: "0 10px",
              }}
            >
              <div className={styles.overlay}>
                <h3>{brand.name}</h3>
                <p>{brand.items} items</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default CollectionByBrand;
