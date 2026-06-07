import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import navlogo from "../../assets/logo.png";
import styles from "./Navbar.module.css";

import { userContext } from "../../Context/userContext.jsx";
import { useWishlist } from "../../Context/WishlistContext";
import { useNotifications } from "../../Context/NotificationContext";

import {
  FaBell,
  FaShoppingCart,
  FaUserCircle,
  FaHeart,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const permission = useContext(userContext);
  const { wishlist } = useWishlist();
  const { unreadCount } = useNotifications();

  const [searchInput, setSearchInput] = useState("");
  const [mobileSearchInput, setMobileSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [mobileSuggestions, setMobileSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const inputRef = useRef();

  async function getProducts() {
    try {
      const { data } = await axios.get("https://egzone.runasp.net/api/Products");
      setProducts(data?.data || data || []);
    } catch {
      setProducts([]);
    }
  }

  useEffect(() => { getProducts(); }, []);

  // Desktop search suggestions
  useEffect(() => {
    if (!searchInput.trim()) return setSuggestions([]);
    const filtered = products.filter((p) =>
      p?.name?.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 6));
  }, [searchInput, products]);

  // Mobile search suggestions
  useEffect(() => {
    if (!mobileSearchInput.trim()) return setMobileSuggestions([]);
    const filtered = products.filter((p) =>
      p?.name?.toLowerCase().includes(mobileSearchInput.toLowerCase())
    );
    setMobileSuggestions(filtered.slice(0, 6));
  }, [mobileSearchInput, products]);

  const getImage = (item) =>
    item?.images?.[0]?.url || item?.imageUrl || "https://via.placeholder.com/50";

  const handleSelect = (item) => {
    setSearchInput("");
    setMobileSearchInput("");
    setSuggestions([]);
    setMobileSuggestions([]);
    setMenuOpen(false);
    navigate(`/ProductDetails/${item.id}`);
  };

  const icons = [
    { icon: <FaBell />,         link: "/bell",     badge: unreadCount      },
    { icon: <FaShoppingCart />, link: "/cart",     badge: null             },
    { icon: <FaHeart />,        link: "/wishlist", badge: wishlist?.length },
    { icon: <FaUserCircle />,   link: "/userProf", badge: null             },
  ];

  return (
    <>
      {/* ══ NAVBAR ══ */}
      <div className={styles.navbar}>

        {/* LOGO */}
        <Link to="/">
          <img src={navlogo} className={styles.logo} alt="logo" />
        </Link>

        {/* SEARCH — desktop */}
        {permission.isLogin && (
          <div className={styles.searchBox}>
            <input
              ref={inputRef}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className={styles.searchInput}
            />
            {suggestions.length > 0 && (
              <div className={styles.searchDropdown}>
                {suggestions.map((item) => (
                  <div key={item.id} className={styles.searchItem} onClick={() => handleSelect(item)}>
                    <img src={getImage(item)} alt="" />
                    <div>
                      <p>{item.name}</p>
                      <span>{item.price} EGP</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ICONS — desktop */}
        <div className={styles.icons}>
          {icons.map((item, i) => (
            <Link key={i} to={item.link} className={styles.iconBtn}>
              {item.icon}
              {item.badge > 0 && <span className={styles.badge}>{item.badge}</span>}
            </Link>
          ))}
        </div>

        {/* HAMBURGER */}
        <div className={styles.hamburger} onClick={() => setMenuOpen(true)}>
          <FaBars />
        </div>
      </div>

      {/* ══ MOBILE SEARCH BAR (تحت الناف بار مباشرة) ══ */}
      {permission.isLogin && (
        <div className={styles.mobileSearchBar}>
          <input
            value={mobileSearchInput}
            onChange={(e) => setMobileSearchInput(e.target.value)}
            placeholder="Search products..."
          />
          {mobileSuggestions.length > 0 && (
            <div className={styles.searchDropdown}>
              {mobileSuggestions.map((item) => (
                <div key={item.id} className={styles.searchItem} onClick={() => handleSelect(item)}>
                  <img src={getImage(item)} alt="" />
                  <div>
                    <p>{item.name}</p>
                    <span>{item.price} EGP</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══ MOBILE MENU ══ */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)}>
          <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>

            <FaTimes className={styles.close} onClick={() => setMenuOpen(false)} />

            {/* icons row inside menu */}
            <div className={styles.mobileIconsRow}>
              {icons.map((item, i) => (
                <Link key={i} to={item.link} onClick={() => setMenuOpen(false)}>
                  {item.icon}
                  {item.badge > 0 && <span className={styles.badge}>{item.badge}</span>}
                </Link>
              ))}
            </div>

            <Link onClick={() => setMenuOpen(false)} to="/">🏠 Home</Link>
            <Link onClick={() => setMenuOpen(false)} to="/bell">
              🔔 Notifications {unreadCount > 0 && `(${unreadCount})`}
            </Link>
            <Link onClick={() => setMenuOpen(false)} to="/cart">🛒 Cart</Link>
            <Link onClick={() => setMenuOpen(false)} to="/wishlist">❤️ Wishlist</Link>
            <Link onClick={() => setMenuOpen(false)} to="/userProf">👤 Profile</Link>
          </div>
        </div>
      )}
    </>
  );
}