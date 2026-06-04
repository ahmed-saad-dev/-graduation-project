import axios from "axios";
import { createContext } from "react";

export const CartContext = createContext();

const BASE_URL = "https://egzone.runasp.net/api/CartItems";

export default function CartProvider({ children }) {

  // ================= GET TOKEN =================
  function getToken() {
    return localStorage.getItem("userToken");
  }

  // ================= GET CART =================
  async function getCartItems() {

    try {

      const { data } = await axios.get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return Array.isArray(data)
        ? data
        : data?.data || [];

    } catch (error) {

      console.log("GET CART ERROR:", error.response?.data || error);

      return [];
    }
  }

  // ================= ADD TO CART =================
  async function addToCart(productId) {

  try {

    const token = getToken();

    const { data } = await axios.post(
      BASE_URL,
      {
        productId: productId,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return data;

  } catch (error) {

    console.log("STATUS =>", error.response?.status);

    console.log("DATA =>", error.response?.data);

    throw error;
  }
}
  // ================= REMOVE =================
  async function removeFromCart(id) {

    try {

      const { data } = await axios.delete(
        `${BASE_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      return data;

    } catch (error) {

      console.log(
        "REMOVE ERROR:",
        error.response?.data || error
      );

      throw error;
    }
  }

  return (
    <CartContext.Provider
      value={{
        getCartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}