import axios from "axios";
import React, { useContext, useState, useEffect, useMemo } from "react";
import Loader from "../Loader/Loader";
import { toast } from "react-hot-toast";
import MainSlider from "./../MainSlider/MainSlider";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import CategorySlider from "../CategorySlider/Categoryslider";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useWishlist } from "../../Context/WishlistContext";
import Navbar from "../Navbar/Navbar";
import styles from "./Products.module.css";

export default function Products() {
  const { addToCart } = useContext(cartContext);
  const { toggleWishlist, isInWishlist, wishlistItems } = useWishlist();

  const [activeCategory,    setActiveCategory]    = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState("");
  const [categories,        setCategories]        = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  /* ── fetch categories ── */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const token = localStorage.getItem("userToken");
        const { data } = await axios.get("https://egzone.runasp.net/api/Categories", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        let cats = [];
        if (Array.isArray(data))  cats = data;
        else if (data?.data)      cats = data.data;
        else if (data?.$values)   cats = data.$values;
        setCategories(cats);
      } catch (err) {
        console.error("Categories Error", err);
        toast.error("Failed to load categories");
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  /* ── fetch products ── */
  const getProducts = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get("https://egzone.runasp.net/api/Products", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        params: { pageSize: 100 },
      });
      if (data?.data)          return data.data;
      if (Array.isArray(data)) return data;
      if (data?.$values)       return data.$values;
      if (data?.items)         return data.items;
      return [];
    } catch (err) {
      console.error("Products Error", err);
      toast.error("Failed to load products");
      return [];
    }
  };

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  /* ── filter logic ── */
  const categoriesWithProducts = useMemo(() =>
    categories.filter((cat) => {
      const catName = cat?.name || cat?.categoryName || "";
      return products.some((p) => {
        const pCat = p?.category?.name || p?.category?.categoryName || p?.categoryName || p?.category || "";
        return pCat.toLowerCase() === catName.toLowerCase();
      });
    }), [categories, products]
  );

  const filteredByCategory = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => {
      const cat = p?.category?.name || p?.categoryName || p?.category || "";
      return cat.toLowerCase() === activeCategory.toLowerCase();
    });
  }, [products, activeCategory]);

  const finalProducts = useMemo(() => {
    if (!activeSubCategory) return filteredByCategory;
    return filteredByCategory.filter(
      (p) => p?.subcategory?.toLowerCase() === activeSubCategory.toLowerCase()
    );
  }, [filteredByCategory, activeSubCategory]);

  const availableSubs = useMemo(() => {
    if (activeCategory === "All") return [];
    return [
      ...new Set(
        products
          .filter((p) => {
            const cat = p?.category?.name || p?.categoryName || p?.category || "";
            return cat.toLowerCase() === activeCategory.toLowerCase();
          })
          .map((p) => p?.subcategory || p?.subCategory)
          .filter(Boolean)
      ),
    ];
  }, [products, activeCategory]);

  /* ── handlers ── */
  const handleFilter = (name) => { setActiveCategory(name); setActiveSubCategory(""); };

  const handleAddToCart = async (e, productId) => {
    e.preventDefault(); e.stopPropagation();
    try {
      await addToCart(productId);
      toast.success("Added to Cart ✓");
    } catch {
      toast.error("Failed to add");
    }
  };

  const handleWishlistToggle = (e, productId) => {
    e.preventDefault(); e.stopPropagation();
    const wasIn = isInWishlist(productId);
    toggleWishlist(productId);
    toast.success(wasIn ? "Removed from Wishlist" : "Added to Wishlist ❤️");
  };

  /* ── states ── */
  if (isLoading || categoriesLoading) return <Loader />;

  if (error) return (
    <div style={{ textAlign: "center", padding: "60px" }}>
      <p style={{ color: "#8888aa", marginBottom: 16 }}>Error loading products.</p>
      <button onClick={() => window.location.reload()} className={styles.retryBtn}>
        Retry
      </button>
    </div>
  );

  return (
    <>
      <Helmet><title>Products — EGZone</title></Helmet>

      <Navbar />
      <MainSlider />

      <div className="container my-5">

        <CategorySlider
          categories={categoriesWithProducts}
          onFilter={handleFilter}
          activeCategory={activeCategory}
        />

        {/* SUB CATEGORIES */}
        {availableSubs.length > 0 && (
          <div className={styles.subCategoriesWrapper}>
            <div className={styles.subCategoriesTitle}>
              Browse {activeCategory}
            </div>
            <div className={styles.subCategoriesGrid}>
              {availableSubs.map((sub) => (
                <button
                  key={sub}
                  className={`${styles.subCategoryBtn} ${activeSubCategory === sub ? styles.activeSub : ""}`}
                  onClick={() => setActiveSubCategory(sub)}
                  aria-pressed={activeSubCategory === sub}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* HEADER ROW */}
        <div className={styles.headerRow}>
          <h5 className={styles.productsTitle}>
            {activeCategory === "All" ? "Our Products" : activeCategory}
            {wishlistItems?.length > 0 && (
              <span className={styles.wishlistBadge}>❤️ {wishlistItems.length}</span>
            )}
          </h5>
          <span className={styles.productsCount}>{finalProducts.length} products</span>
        </div>

        {/* PRODUCTS GRID */}
        {finalProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No products found in this category.</p>
            <button onClick={() => handleFilter("All")} className={styles.viewAllBtn}>
              View All Products
            </button>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {finalProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <Link to={`/ProductDetails/${product.id}`} className={styles.productLink}>

                  {/* IMAGE */}
                  <div className={styles.imageContainer}>
                    <button
                      onClick={(e) => handleWishlistToggle(e, product.id)}
                      aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                      className={`${styles.wishlistBtn} ${isInWishlist(product.id) ? styles.wishlistActive : ""}`}
                    >
                      {isInWishlist(product.id) ? <FaHeart size={15} /> : <FaRegHeart size={15} />}
                    </button>

                    <img
                      src={product?.images?.[0]?.url || product?.imageUrl || "/default-product.png"}
                      className={styles.productImage}
                      alt={product.name}
                      onError={(e) => (e.target.src = "/default-product.png")}
                    />

                    <span className={styles.categoryTag}>
                      {product?.category?.name || product?.category || "Product"}
                    </span>
                  </div>

                  {/* INFO */}
                  <div className={styles.productInfo}>
                    <h6 className={styles.productName}>{product.name}</h6>
                    <span className={styles.productPrice}>{product.price} EGP</span>
                  </div>
                </Link>

                {/* CART */}
                <div className={styles.cartBtnWrapper}>
                  <button onClick={(e) => handleAddToCart(e, product.id)} className={styles.cartBtn}>
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}