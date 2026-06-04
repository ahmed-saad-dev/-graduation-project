import React, { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  const { getCartItems, removeFromCart } = useContext(CartContext);
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });
console.log(cartItems[0]);
console.log(Object.keys(cartItems[0]));

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      queryClient.invalidateQueries(["cart"]);
      toast.success("Removed from cart ✅");
    } catch (error) {
      toast.error("Failed to remove ❌");
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price || 0),
    0
  );

  if (isLoading)
    return (
      <div className="text-center mt-5">
        <h5>Loading Cart...</h5>
      </div>
    );

  return (
    <div
      className="container py-5"
      style={{ maxWidth: "1200px" }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold mb-1">
            Shopping Cart
          </h2>
          <p className="text-muted mb-0">
            {cartItems.length} Items
          </p>
        </div>

        {cartItems.length > 0 && (
          <div
            className="bg-success text-white px-4 py-2 rounded-pill fw-bold"
          >
            Total: {totalPrice} EGP
          </div>
        )}
      </div>

      {/* EMPTY CART */}
      {cartItems.length === 0 ? (
        <div
          className="text-center py-5"
          style={{
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,.06)",
          }}
        >
          <FaShoppingCart
            size={70}
            className="text-secondary mb-3"
          />

          <h3 className="fw-bold">
            Your Cart Is Empty
          </h3>

          <p className="text-muted">
            Add products to your cart and they will appear here.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="col-12"
            >
              <div
                className="card border-0"
                style={{
                  borderRadius: "18px",
                  boxShadow:
                    "0 4px 20px rgba(0,0,0,.08)",
                }}
              >
                <div className="card-body">
                  <div className="row align-items-center">

                    {/* IMAGE */}
                    <div className="col-md-2 text-center">
                      <img
                        src={
                          item.imageUrl ||
                          item.image ||
                          "https://via.placeholder.com/150"
                        }
                        alt={item.productName}
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    {/* PRODUCT INFO */}
                    <div className="col-md-6">
                      <h5 className="fw-bold mb-2">
                        {item.productName}
                      </h5>

                      <p className="text-muted mb-0">
                        Premium Product
                      </p>
                    </div>

                    {/* PRICE */}
                    <div className="col-md-2 text-center">
                      <span
                        className="fw-bold"
                        style={{
                          color: "#198754",
                          fontSize: "1.3rem",
                        }}
                      >
                        {item.price} EGP
                      </span>
                    </div>

                    {/* REMOVE */}
                    <div className="col-md-2 text-end">
                      <button
                        className="btn btn-outline-danger px-4"
                        onClick={() =>
                          handleRemove(
                            item.cartItemId || item.id
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}