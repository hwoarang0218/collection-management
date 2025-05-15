import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styles from "./CollectionByBrand.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getBrandLogo } from "../../utils/logoFetcher";

interface BrandData {
  name: string;
  items: number;
  logo: string;
}

const brands: BrandData[] = [
  {
    name: "Nike",
    items: 32,
    logo: "",
  },
  {
    name: "Adidas",
    items: 28,
    logo: "",
  },
  {
    name: "Puma",
    items: 15,
    logo: "",
  },
];

const CollectionByBrand: React.FC = () => {
  const [brandsWithLogos, setBrandsWithLogos] = useState<BrandData[]>([]);

  useEffect(() => {
    const loadBrandLogos = async () => {
      const loadedBrands = await Promise.all(
        brands.map(async (brand) => ({
          ...brand,
          logo: await getBrandLogo(brand.name),
        }))
      );
      setBrandsWithLogos(loadedBrands);
    };

    loadBrandLogos();
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
