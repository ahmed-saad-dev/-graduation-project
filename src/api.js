// api.js

import axios from "axios";

/* ================= AXIOS INSTANCE ================= */
const API = axios.create({
  baseURL: "https://egzone.runasp.net",
});

/* ================= TOKEN INTERCEPTOR ================= */
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* =====================================================
   ================= AUTH =================
===================================================== */

// Forgot Password
export const forgotPassword = (email) =>
  API.post("/api/Auth/forgot-password", { email });

// Get Profile
export const getProfile = () =>
  API.get("/api/Auth/me");

// Update Profile
export const updateProfile = (data) =>
  API.put("/api/Auth/update-profile", data);

// Change Password
export const changePassword = (data) =>
  API.put("/api/Auth/change-password", data);

/* =====================================================
   ================= PRODUCTS =================
===================================================== */

// Get All Products / Search / Filter
export const getProducts = (params) =>
  API.get("/api/Products", { params });

// Get Reviews
export const getReviews = (productId) =>
  API.get(`/api/Products/${productId}/reviews`);

// Add Review
export const addReview = (productId, data) =>
  API.post(`/api/Products/${productId}/reviews`, data);

/* =====================================================
   ================= CART =================
===================================================== */

// Delete Cart Item
export const deleteCartItem = (id) =>
  API.delete(`/api/CartItems/${id}`);

/* =====================================================
   ================= ADDRESSES =================
===================================================== */

// Get Addresses
export const getAddresses = () =>
  API.get("/api/Addresses");

// Add Address
export const addAddress = (data) =>
  API.post("/api/Addresses", data);

// Delete Address
export const deleteAddress = (id) =>
  API.delete(`/api/Addresses/${id}`);

/* =====================================================
   ================= ORDERS =================
===================================================== */

// Get Order Details
export const getOrderDetails = (id) =>
  API.get(`/api/Orders/${id}`);

/* =====================================================
   ================= PAYMENT =================
===================================================== */

// Get Payment Methods
export const getPaymentMethods = () =>
  API.get("/api/PaymentMethods");

// Add Payment Method
export const addPaymentMethod = (data) =>
  API.post("/api/PaymentMethods", data);

/* =====================================================
   ================= NOTIFICATIONS =================
===================================================== */

// Get Notifications
export const getNotifications = () =>
  API.get("/api/Notifications");

// Mark as Read
export const markNotificationAsRead = (id) =>
  API.put(`/api/Notifications/${id}/read`);

// Delete Notification
export const deleteNotification = (id) =>
  API.delete(`/api/Notifications/${id}`);