// import axios from "axios";

// const BASE_URL = "https://egzone.runasp.net/api/CartItems";

// const getToken = () => localStorage.getItem("userToken");

// // Add to cart
// export const addToCartAPI = (productId) => {
//   return axios.post(
//     BASE_URL,
//     {
//       productId: productId,
//       quantity: 1
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${getToken()}`
//       }
//     }
//   );
// };

// // Get cart
// export const getCartAPI = () => {
//   return axios.get(BASE_URL, {
//     headers: {
//       Authorization: `Bearer ${getToken()}`
//     }
//   });
// };

// // Remove item
// export const removeFromCartAPI = (id) => {
//   return axios.delete(`${BASE_URL}/${id}`, {
//     headers: {
//       Authorization: `Bearer ${getToken()}`
//     }
//   });
// };

// // Checkout / Order
// export const checkoutAPI = () => {
//   return axios.post(
//     "https://egzone.runasp.net/api/Orders/place-order",
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${getToken()}`
//       }
//     }
//   );
// };