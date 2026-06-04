import { useRef, useState } from "react";

const CATEGORIES_CONFIG = {
  "All": { icon: "✦", color: "#198754" },
  "Electronics": { icon: "💻", color: "#0d6efd" },
  "Home Appliances": { icon: "🏠", color: "#20c997" },
  "Watches & Jewelry": { icon: "⌚", color: "#ffc107" },
  "Fashion": { icon: "👗", color: "#e83e8c" },
  "Beauty": { icon: "💄", color: "#6c757d" },
  "Sports": { icon: "⚽", color: "#198754" },
  "Clothing": { icon: "👕", color: "#6f42c1" },
  "Accessories": { icon: "🎮", color: "#fd7e14" },
  "Shoes": { icon: "👟", color: "#20c997" },
  "Books": { icon: "📚", color: "#6c757d" },
};

export default function CategorySlider({
  categories = [],
  onFilter = () => {},
  activeCategory = "All",
}) {
  const sliderRef = useRef(null);

  const handleSelect = (categoryName) => {
    onFilter(categoryName);
  };

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: direction * 250,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ margin: "20px 0 10px" }}>
      <div style={{ position: "relative" }}>

        {/* Left Arrow */}
        {categories.length > 3 && (
          <button
            onClick={() => scroll(-1)}
            style={{
              position: "absolute",
              left: -10,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            ‹
          </button>
        )}

        {/* Categories Slider */}
        <div
          ref={sliderRef}
          style={{
            display: "flex",
            gap: 10,
            overflowX: "auto",
            padding: "8px 25px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* All Button */}
          <button
            onClick={() => handleSelect("All")}
            style={{
              flexShrink: 0,
              padding: "8px 18px",
              borderRadius: 999,
              border: activeCategory === "All" 
                ? "2px solid #198754" 
                : "2px solid #e0e0e0",
              background: activeCategory === "All" ? "#198754" : "#fff",
              color: activeCategory === "All" ? "#fff" : "#555",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              whiteSpace: "nowrap",
              fontSize: 14,
              transition: "all 0.2s ease",
            }}
          >
            <span>✦</span>
            All
          </button>

          {/* Categories from API */}
          {categories.map((cat) => {
            const catName = cat.name || cat.categoryName || "Unknown";
            const config = CATEGORIES_CONFIG[catName] || {
              icon: "🏷️",
              color: "#198754",
            };

            const isActive = activeCategory === catName;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(catName)}
                style={{
                  flexShrink: 0,
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: isActive
                    ? `2px solid ${config.color}`
                    : "2px solid #e0e0e0",
                  background: isActive ? config.color : "#fff",
                  color: isActive ? "#fff" : "#555",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  whiteSpace: "nowrap",
                  fontSize: 14,
                  transition: "all 0.2s ease",
                }}
              >
                <span>{config.icon}</span>
                {catName}
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        {categories.length > 3 && (
          <button
            onClick={() => scroll(1)}
            style={{
              position: "absolute",
              right: -10,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            ›
          </button>
        )}
      </div>


    </div>
  );
}