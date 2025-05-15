import React from "react";
import Slider from "react-slick";
import styles from "./CollectionByBrand.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CollectionByBrand: React.FC = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className={styles.brandSection}>
      <h2 className={styles.sectionTitle}>Collection by Brand</h2>
      <Slider {...settings} className={styles.brandSlider}>
        <div className={styles.brandCard}>
          <h3>Nike</h3>
          <p>32 items</p>
        </div>
        <div className={styles.brandCard}>
          <h3>Adidas</h3>
          <p>28 items</p>
        </div>
        <div className={styles.brandCard}>
          <h3>Puma</h3>
          <p>15 items</p>
        </div>
      </Slider>
    </section>
  );
};

export default CollectionByBrand;
