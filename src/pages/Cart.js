import { useState, useEffect, useContext } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import UserContext from "../UserContext";
import Swal from "sweetalert2";
import NoImage from "../images/NoImage.jpg";

const Cart = () => {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/get-cart`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      const { cart: fetchedCart } = await response.json();
      setCart(Array.isArray(fetchedCart.items) ? fetchedCart.items : []);
    } catch (err) {
      setError("Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, [user]);

  const handleEditQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveProduct = async (productId) => {
    await fetch(`${process.env.REACT_APP_API_URL}/cart/${productId}/remove-from-cart`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    });
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    Swal.fire("Removed!", "Item removed from cart", "success");
  };

  const handleClearCart = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/cart/clear-cart`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    });
    setCart([]);
    Swal.fire("Cleared!", "Cart has been cleared", "success");
  };

  const handleCheckout = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/order/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("access")}` },
      body: JSON.stringify({ productsOrdered: cart }),
    });
    if (response.ok) {
      setCart([]);
      Swal.fire("Success!", "Order placed successfully!", "success");
    } else {
      Swal.fire("Error", "Checkout failed", "error");
    }
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

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

      <Grid container spacing={4} mt={2} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              {cart.length === 0 ? (
                <Typography align="center">Your cart is empty.</Typography>
              ) : (
                <>
                  <Box display="flex" alignItems="center" px={1} mb={1}>
                    <Box flex={3}>
                      <Typography fontWeight="bold">Product</Typography>
                    </Box>
                    <Box width={80} textAlign="center">
                      <Typography fontWeight="bold">Qty</Typography>
                    </Box>
                    <Box width={100} textAlign="right">
                      <Typography fontWeight="bold">Price</Typography>
                    </Box>
                    <Box width={100} textAlign="right">
                      <Typography fontWeight="bold">Subtotal</Typography>
                    </Box>
                    <Box width={50} textAlign="center">
                      <Typography fontWeight="bold"></Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ mb: 1 }} />

                  {cart.map((item) => (
                    <Box
                      key={item.productId}
                      display="flex"
                      alignItems="center"
                      mb={2}
                      px={1}
                      py={2}
                      borderRadius={2}
                      bgcolor="#fafafa"
                    >
                      <Box flex={3} display="flex" alignItems="center">
                        <Box
                          component="img"
                          src={NoImage}
                          alt={item.productId.name}
                          sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: 2, mr: 2 }}
                        />
                        <Typography fontWeight="bold" noWrap>
                          {item.productId.name}
                        </Typography>
                      </Box>

                      <Box width={80} textAlign="center">
                        <Box display="flex" alignItems="center" justifyContent="center">
                          <IconButton
                            size="small"
                            onClick={() => handleEditQuantity(item.productId, item.quantity - 1)}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography mx={1}>{item.quantity}</Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleEditQuantity(item.productId, item.quantity + 1)}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>

                      <Box width={100} textAlign="right">
                        <Typography>
                          ₱{item.price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                        </Typography>
                      </Box>

                      <Box width={100} textAlign="right">
                        <Typography fontWeight="bold">
                          ₱{(item.price * item.quantity).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                        </Typography>
                      </Box>

                      <Box width={50} textAlign="center">
                        <IconButton color="error" size="small" onClick={() => handleRemoveProduct(item.productId)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}

                  <Divider sx={{ my: 2 }} />

                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Button variant="outlined" color="error" onClick={handleClearCart}>
                      Clear Cart
                    </Button>
                    <Typography fontWeight="bold" fontSize={16}>
                      Total: ₱{calculateTotal().toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
