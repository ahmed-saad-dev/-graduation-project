import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import navlogo from "../../assets/logo.png";
import styles from "./Navbar.module.css";

import { userContext } from "../../Context/userContext.jsx";
import { useWishlist } from "../../Context/WishlistContext";
import { useNotifications } from "../../Context/NotificationContext";

import {
  FaBell, FaShoppingCart, FaHeart,
  FaBars, FaTimes, FaHome, FaUser,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdFlashOn } from "react-icons/md";

const CATEGORIES = ["الكل","إلكترونيات","ملابس","منزل ومطبخ","كتب","رياضة"];

export default function Navbar() {
  const navigate   = useNavigate();
  const permission = useContext(userContext);
  const { wishlist }     = useWishlist();
  const { unreadCount }  = useNotifications();

  const [searchInput,       setSearchInput]       = useState("");
  const [mobileSearchInput, setMobileSearchInput] = useState("");
  const [suggestions,       setSuggestions]       = useState([]);
  const [mobileSuggestions, setMobileSuggestions] = useState([]);
  const [products,          setProducts]          = useState([]);
  const [menuOpen,          setMenuOpen]          = useState(false);
  const [category,          setCategory]          = useState("الكل");

  const desktopInputRef = useRef();

  /* ── fetch ── */
  useEffect(() => {
    axios.get("https://egzone.runasp.net/api/Products")
      .then(({ data }) => setProducts(data?.data || data || []))
      .catch(() => setProducts([]));
  }, []);

  /* ── desktop suggestions ── */
  useEffect(() => {
    if (!searchInput.trim()) return setSuggestions([]);
    setSuggestions(
      products
        .filter(p => p?.name?.toLowerCase().includes(searchInput.toLowerCase()))
        .slice(0, 6)
    );
  }, [searchInput, products]);

  /* ── mobile suggestions ── */
  useEffect(() => {
    if (!mobileSearchInput.trim()) return setMobileSuggestions([]);
    setMobileSuggestions(
      products
        .filter(p => p?.name?.toLowerCase().includes(mobileSearchInput.toLowerCase()))
        .slice(0, 6)
    );
  }, [mobileSearchInput, products]);

  /* ── keyboard close ── */
  useEffect(() => {
    if (!menuOpen) return;
    const fn = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [menuOpen]);

  const getImage = (item) => item?.images?.[0]?.url || item?.imageUrl || null;

  const handleSelect = (item) => {
    setSearchInput(""); setMobileSearchInput("");
    setSuggestions([]); setMobileSuggestions([]);
    setMenuOpen(false);
    navigate(`/ProductDetails/${item.id}`);
  };

  /* ── reusable dropdown ── */
  const Dropdown = ({ items }) => (
    <div className={styles.dropdown}>
      {items.map(item => (
        <div key={item.id} className={styles.dropItem} onClick={() => handleSelect(item)}>
          <div className={styles.dropThumb}>
            {getImage(item)
              ? <img src={getImage(item)} alt="" />
              : <FaShoppingCart />}
          </div>
          <div>
            <p className={styles.dropName}>{item.name}</p>
            <span className={styles.dropPrice}>{item.price} EGP</span>
          </div>
        </div>
      ))}
    </div>
  );

  const navLinks = [
    { icon: <FaHome />,         label: "الرئيسية",  to: "/"         },
    { icon: <FaBell />,         label: "الإشعارات", to: "/bell",     badge: unreadCount     },
    { icon: <FaShoppingCart />, label: "السلة",      to: "/cart"      },
    { icon: <FaHeart />,        label: "المفضلة",   to: "/wishlist", badge: wishlist?.length },
    { icon: <FaUser />,         label: "الحساب",    to: "/userProf"  },
  ];

  return (
    <>
      {/* ══════════ DESKTOP NAVBAR ══════════ */}
      <header className={styles.header}>

        {/* TOP ROW */}
        <div className={styles.topRow}>

          {/* LOGO */}
          <Link to="/" className={styles.logo}>
            <img src={navlogo} alt="EGZone" className={styles.logoImg} />
          </Link>

          {/* SEARCH */}
          {permission.isLogin && (
            <div className={styles.searchWrap}>
              <div className={styles.searchBox}>
                <select
                  className={styles.catSelect}
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <div className={styles.catDivider} />
                <input
                  ref={desktopInputRef}
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="ابحث عن أي منتج في EGZone..."
                  className={styles.searchInput}
                  autoComplete="off"
                />
                <button className={styles.searchBtn} aria-label="بحث">
                  <FiSearch />
                </button>
              </div>
              {suggestions.length > 0 && <Dropdown items={suggestions} />}
            </div>
          )}

          {/* RIGHT ICONS */}
          <nav className={styles.navRight} aria-label="روابط رئيسية">

            {/* Account */}
            <Link to="/userProf" className={styles.navBtn}>
              <span className={styles.navBtnTop}>أهلاً، سجل دخولك</span>
              <span className={styles.navBtnBot}>
                <FaUser className={styles.navBtnIcon} /> حسابي
              </span>
            </Link>

            <div className={styles.vDivider} />

            {/* Wishlist */}
            <Link to="/wishlist" className={styles.navBtn}>
              <span className={styles.navBtnTop}>قائمة الرغبات</span>
              <span className={styles.navBtnBot}>
                <FaHeart className={styles.navBtnIconGold} />
                المفضلة
                {wishlist?.length > 0 && (
                  <span className={styles.pillBadge}>{wishlist.length}</span>
                )}
              </span>
            </Link>

            {/* Bell */}
            <Link to="/bell" className={styles.navBtn}>
              <span className={styles.navBtnTop}>الإشعارات</span>
              <span className={styles.navBtnBot}>
                <FaBell className={styles.navBtnIcon} />
                {unreadCount > 0
                  ? <span className={styles.pillBadge}>{unreadCount}</span>
                  : "الإشعارات"}
              </span>
            </Link>

            <div className={styles.vDivider} />

            {/* Cart */}
            <Link to="/cart" className={styles.cartBtn} aria-label="السلة">
              <div className={styles.cartIconWrap}>
                <FaShoppingCart className={styles.cartIcon} />
              </div>
              <span className={styles.cartLabel}>السلة</span>
            </Link>
          </nav>

          {/* HAMBURGER */}
          <button className={styles.hamburger} onClick={() => setMenuOpen(true)} aria-label="القائمة">
            <FaBars />
          </button>
        </div>

        {/* BOTTOM NAV BAR */}
        <div className={styles.bottomBar}>
          <Link to="/" className={`${styles.bLink} ${styles.bLinkAll}`}>
            <FaBars className={styles.bIcon} /> كل الأقسام
          </Link>
          <Link to="/offers" className={`${styles.bLink} ${styles.bLinkGold}`}>
            <MdFlashOn className={styles.bIcon} /> عروض اليوم
          </Link>
          {["إلكترونيات","ملابس","منزل ومطبخ","كتب","رياضة"].map(cat => (
            <Link key={cat} to={`/category/${cat}`} className={styles.bLink}>{cat}</Link>
          ))}
        </div>
      </header>

      {/* ══════════ MOBILE MENU — BOTTOM SHEET ══════════ */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} role="dialog" aria-modal="true">
          <div className={styles.sheet} onClick={e => e.stopPropagation()}>

            <div className={styles.sheetHandle}><div className={styles.handleBar} /></div>

            <button className={styles.closeBtn} onClick={() => setMenuOpen(false)} aria-label="إغلاق">
              <FaTimes />
            </button>

            {/* mobile search */}
            {permission.isLogin && (
              <div className={styles.sheetSearchWrap}>
                <div className={styles.sheetSearchBox}>
                  <FiSearch className={styles.sheetSearchIcon} />
                  <input
                    value={mobileSearchInput}
                    onChange={e => setMobileSearchInput(e.target.value)}
                    placeholder="ابحث عن أي منتج..."
                    autoComplete="off"
                  />
                  <button className={styles.sheetSearchBtn} aria-label="بحث"><FiSearch /></button>
                </div>
                {mobileSuggestions.length > 0 && <Dropdown items={mobileSuggestions} />}
              </div>
            )}

            {/* links grid */}
            <div className={styles.sheetGrid}>
              {navLinks.map((item, i) => (
                <Link key={i} to={item.to} className={styles.sheetLink} onClick={() => setMenuOpen(false)}>
                  <span className={styles.sheetLinkIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge > 0 && <span className={styles.sheetBadge}>{item.badge}</span>}
                </Link>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
}