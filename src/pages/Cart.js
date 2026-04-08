import { useState, useEffect, useContext } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import UserContext from "../UserContext";
import ShoppingCart from "../components/Cart/ShoppingCart";
import Swal from "sweetalert2";
import useApi from "../hooks/useApi";

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
      const data = await callApi({
        method: "GET",
        url: "/cart/get-cart",
      });

      setCart(Array.isArray(data?.data?.items) ? data.data.items : []);
    } catch (err) {
      setError(err.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.id) fetchUserCart();
  }, [user]);
  const handleEditQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveProduct = async (productId) => {
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
      prev.filter((item) => item.productId !== productId)
    );

    Swal.fire("Removed!", "Item removed from cart", "success");
  };

  const handleClearCart = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/cart/clear-cart`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });

    setCart([]);

    Swal.fire("Cleared!", "Cart has been cleared", "success");
  };

  const handleCheckout = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/order/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify({ productsOrdered: cart }),
      }
    );

    if (response.ok) {
      setCart([]);
      Swal.fire("Success!", "Order placed successfully!", "success");
    } else {
      Swal.fire("Error", "Checkout failed", "error");
    }
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
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

      <ShoppingCart
        cart={cart}
        handleEditQuantity={handleEditQuantity}
        handleRemoveProduct={handleRemoveProduct}
        handleClearCart={handleClearCart}
        handleCheckout={handleCheckout}
        calculateTotal={calculateTotal}
      />
    </Container>
  );
};

export default Cart;
