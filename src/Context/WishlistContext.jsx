import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistIds, setWishlistIds] = useState(new Set());

  const getToken = () => localStorage.getItem("userToken");

  // ── GET ──────────────────────────────────────────────
  async function getWishlist() {
    const token = getToken();
    if (!token) return;
    try {
      const { data } = await axios.get("https://egzone.runasp.net/api/Wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const items = Array.isArray(data) ? data
        : data.$values ?? data.data ?? data.items ?? [];
      setWishlist(items);
      setWishlistIds(new Set(items.map((i) => i.productId ?? i.product?.id ?? i.id)));
    } catch (err) {
      console.error("Wishlist fetch error:", err);
    }
  }

  // ── ADD ──────────────────────────────────────────────
  async function addToWishlist(productId) {
    const token = getToken();
    if (!token) return false;
    try {
      await axios.post(
        `https://egzone.runasp.net/api/Wishlist/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await getWishlist();
      return true;
    } catch (err) {
      console.error("Add wishlist error:", err);
      return false;
    }
  }

  // ── REMOVE ───────────────────────────────────────────
  async function removeFromWishlist(wishlistItemId) {
    const token = getToken();
    if (!token) return false;
    try {
      await axios.delete(
        `https://egzone.runasp.net/api/Wishlist/${wishlistItemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await getWishlist();
      return true;
    } catch (err) {
      console.error("Remove wishlist error:", err);
      return false;
    }
  }

  // ── TOGGLE ───────────────────────────────────────────
  async function toggleWishlist(productId) {
    if (wishlistIds.has(productId)) {
      // find the wishlistItemId
      const item = wishlist.find(
        (i) => (i.productId ?? i.product?.id ?? i.id) === productId
      );
      const itemId = item?.id ?? item?.wishlistItemId ?? productId;
      return await removeFromWishlist(itemId);
    } else {
      return await addToWishlist(productId);
    }
  }

  const isInWishlist = (productId) => wishlistIds.has(productId);

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{
      wishlist,
      wishlistIds,
      getWishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}