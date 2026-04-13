import { useState, useEffect, useContext } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import UserContext from "../UserContext";
import ShoppingCart from "../components/Cart/ShoppingCart";
import Swal from "sweetalert2";
import useApi from "../hooks/useApi";
import axios from "axios";

const Cart = () => {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { callApi } = useApi();

  const fetchUserCart = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/cart/get-cart`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
  
      console.log("API URL:", process.env.REACT_APP_API_URL);
      console.log("CART RESPONSE:", response.data);
  
      setCart(response.data?.data?.items || []);
    } catch (err) {
      setError(err.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchUserCart();
  }, [user?.id]);

  const handleEditQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveProduct = async (productId) => {
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}/cart/${productId}/remove-from-cart`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      setCart((prev) =>
        prev.filter((item) => item.product.id !== productId)
      );

      Swal.fire("Removed!", "Item removed from cart", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to remove item", "error");
    }
  };

  const handleClearCart = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/cart/clear-cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      setCart([]);
      Swal.fire("Cleared!", "Cart has been cleared", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to clear cart", "error");
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/order/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify({
            productsOrdered: cart.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
              price: item.price,
            })),
          }),
        }
      );

      if (response.ok) {
        setCart([]);
        Swal.fire("Success!", "Order placed successfully!", "success");
      } else {
        Swal.fire("Error", "Checkout failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Checkout failed", "error");
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Shopping Cart
      </Typography>

      {loading && (
        <Box textAlign="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" align="center" mt={2}>
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <ShoppingCart
          cart={cart}
          handleEditQuantity={handleEditQuantity}
          handleRemoveProduct={handleRemoveProduct}
          handleClearCart={handleClearCart}
          handleCheckout={handleCheckout}
          calculateTotal={calculateTotal}
        />
      )}
    </Container>
  );
};

export default Cart;
