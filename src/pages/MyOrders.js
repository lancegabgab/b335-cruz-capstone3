import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Box,
} from '@mui/material';
import UserContext from '../UserContext';
import NoImage from '../images/NoImage.jpg';

const MyOrders = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.id) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/order/my-orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Your Order History
      </Typography>

      {orders.length === 0 && (
        <Typography textAlign="center" mt={4}>No orders available</Typography>
      )}

      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} key={order._id}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Order Date: {new Date(order.orderDate).toLocaleString()}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Total: ₱{order.totalPrice.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {order.productsOrdered.map((product) => (
                  <Box
                    key={product.productId}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1}
                    p={1}
                    border="1px solid #eee"
                    borderRadius={2}
                  >
                    <Box
                      component="img"
                      src={product.image ? `${process.env.REACT_APP_API_URL}/${product.image}` : NoImage}
                      alt={product.name}
                      onError={(e) => (e.target.src = NoImage)}
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: 'cover',
                        borderRadius: 2,
                        mr: 2,
                      }}
                    />

                    <Box flex={1}>
                      <Typography fontWeight="bold" noWrap>
                        {product.name}
                      </Typography>
                    </Box>

                    {/* Quantity */}
                    <Box mx={2}>
                      <Typography>Qty: {product.quantity}</Typography>
                    </Box>

                    {/* Subtotal */}
                    <Box>
                      <Typography fontWeight="bold">
                        ₱{(product.price * product.quantity).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyOrders;
