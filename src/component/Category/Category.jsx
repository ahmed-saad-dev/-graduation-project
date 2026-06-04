import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./Category.module.css";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= GET PRODUCTS & EXTRACT CATEGORIES =================
  const getCategoriesFromProducts = async () => {
    try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.get(
        "https://egzone.runasp.net/api/Products",
        {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
          params: { pageSize: 100 },
        }
      );

      let products = [];

      if (Array.isArray(data)) {
        products = data;
      } else if (data.data && Array.isArray(data.data)) {
        products = data.data;
      } else if (data.$values && Array.isArray(data.$values)) {
        products = data.$values;
      } else if (data.items && Array.isArray(data.items)) {
        products = data.items;
      }

      // استخراج الكاتيجوري بدون تكرار
      const uniqueCategories = [];
      const addedNames = new Set();

      products.forEach((product) => {
        const category =
          product.category ||
          product.categoryDto ||
          {};

        const categoryName =
          category.name ||
          category.categoryName ||
          product.categoryName;

        if (categoryName && !addedNames.has(categoryName)) {
          addedNames.add(categoryName);

          uniqueCategories.push({
            id: category.id || categoryName,
            name: categoryName,
            image:
              category.image ||
              category.imageUrl ||
              "/default-category.png",
          });
        }
      });

      setCategories(uniqueCategories);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoriesFromProducts();
  }, []);

  // ================= RESPONSIVE =================
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="text-center mt-5">
        <i className="fa fa-spinner fa-spin fs-3"></i>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold mb-4">
        Categories
      </h2>

      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2500}
        keyBoardControl={true}
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={styles.imagContainer}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className={styles.imgStyle}
              onError={(e) => {
                e.target.src = "/default-category.png";
              }}
            />

            <p className="text-center fw-semibold mt-2">
              {cat.name}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}