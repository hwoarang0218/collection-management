"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import styles from "./CollectionByBrand.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getBrandLogo } from "../../utils/logoFetcher";

interface Collection {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string; // Add this line
  icon: string; // Add this line
}

interface BrandData {
  name: string;
  items: number;
  logo: string;
  collections?: Collection[];
}

const CollectionByBrand: React.FC = () => {
  const router = useRouter();

  const [brandsWithLogos, setBrandsWithLogos] = useState<BrandData[]>([]);

  useEffect(() => {
    const loadBrandsData = async () => {
      try {
        const response = await fetch("/mockData/collections.json");
        const data = await response.json();
        const collections: Collection[] = data.collections;

        // Group collections by brand
        const brandCollections = collections.reduce((acc, collection) => {
          const brand = collection.brand || "Unspecified";
          if (!acc[brand]) {
            acc[brand] = [];
          }
          acc[brand].push(collection);
          return acc;
        }, {} as Record<string, Collection[]>);

        const responseBrands = await fetch("/mockData/brands.json");
        const brandsJson = await responseBrands.json();

        const brandsData = Object.entries(brandCollections).map(
          ([name, brandCollections]) => {
            const brandInfo = brandsJson.brands.find(
              (brand: { name: string }) => brand.name === name.toLowerCase()
            );

            console.log(name);

            return {
              name,
              items: brandCollections.length,
              logo: brandInfo?.icon || "", // Get logo from brands.json or fallback to empty string
              collections: brandCollections,
            };
          }
        );

        setBrandsWithLogos(brandsData);
      } catch (error) {
        console.error("Error loading brands data:", error);
        setBrandsWithLogos([]);
      }
    };

    loadBrandsData();
  }, []);

  const handleBrandClick = (brand: BrandData) => {
    router.push(`/collections/${encodeURIComponent(brand.name.toLowerCase())}`);
  };

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
          <div
            key={index}
            className={styles.brandCardWrapper}
            onClick={() => handleBrandClick(brand)}
          >
            <div
              className={styles.brandCard}
              style={{
                backgroundImage: `url(${brand.logo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                margin: "0 10px",
                cursor: "pointer",
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
