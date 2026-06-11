import React, { useEffect, useContext } from "react";
import { useWishlist } from "../../Context/WishlistContext";
import { Link } from "react-router-dom";
import { FaHeartBroken, FaHeart, FaTrashAlt, FaEye } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../../Context/ThemeContext";
import Navbar from "../Navbar/Navbar";
import styles from "./Wishlist.module.css";

export default function Wishlist() {
  const { wishlist, getWishlist, removeFromWishlist } = useWishlist();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  useEffect(() => {
    getWishlist();
  }, []);

  const getWishlistItemId = (item) =>
    item?.id || item?.wishlistItemId || item?.productId;

  const getProduct = (item) => item?.product ?? item;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      <Navbar />
      <div className={`${styles.container} ${isDark ? styles.dark : ""}`}>
        {/* HEADER SECTION */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>My Wishlist</h1>
            <p className={styles.subtitle}>
              {wishlist?.length || 0} {wishlist?.length === 1 ? "Item" : "Items"} Saved
            </p>
          </div>
          <div className={styles.headerDecoration}>
            <FaHeart className={styles.headerIcon} />
          </div>
        </div>

        {/* EMPTY STATE */}
        {!wishlist || wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={styles.emptyState}
          >
            <div className={styles.emptyIcon}>
              <FaHeartBroken />
            </div>
            <h3 className={styles.emptyTitle}>Your Wishlist Is Empty</h3>
            <p className={styles.emptyText}>
              Save products you love and they'll appear here.
            </p>
            <Link to="/shop" className={styles.shopBtn}>
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={styles.grid}
          >
            <AnimatePresence mode="wait">
              {wishlist.map((item) => {
                const product = getProduct(item);
                const productId = product?.id || item?.productId || item?.id;
                const imageUrl =
                  product?.imageUrl ||
                  product?.image ||
                  product?.mainImage ||
                  "https://via.placeholder.com/400x400?text=No+Image";

                return (
                  <motion.div
                    key={getWishlistItemId(item)}
                    variants={cardVariants}
                    exit="exit"
                    layout
                    className={styles.card}
                    whileHover={{ y: -8 }}
                  >
                    {/* IMAGE CONTAINER */}
                    <div className={styles.imageContainer}>
                      <img
                        src={imageUrl}
                        alt={product?.name || "Product"}
                        className={styles.productImage}
                        loading="lazy"
                      />
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromWishlist(getWishlistItemId(item))}
                        aria-label="Remove from wishlist"
                      >
                        <FaTrashAlt />
                      </button>
                      <div className={styles.imageOverlay}>
                        <Link to={`/ProductDetails/${productId}`} className={styles.viewBtn}>
                          <FaEye /> Quick View
                        </Link>
                      </div>
                    </div>

                    {/* PRODUCT INFO */}
                    <div className={styles.cardBody}>
                      <h3 className={styles.productName}>
                        {product?.name || "Product Name"}
                      </h3>
                      
                      <div className={styles.priceRow}>
                        <span className={styles.price}>
                          {product?.price?.toLocaleString() || 0} EGP
                        </span>
                        {product?.oldPrice && (
                          <span className={styles.oldPrice}>
                            {product.oldPrice.toLocaleString()} EGP
                          </span>
                        )}
                      </div>

                      {/* RATING */}
                      <div className={styles.rating}>
                        <span className={styles.stars}>★★★★★</span>
                        <span className={styles.ratingCount}>(4.8)</span>
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className={styles.actions}>
                        <Link
                          to={`/ProductDetails/${productId}`}
                          className={styles.detailsBtn}
                        >
                          View Details
                        </Link>
                        <button
                          className={styles.removeWishlistBtn}
                          onClick={() => removeFromWishlist(getWishlistItemId(item))}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </>
  );
}