import { useState, useEffect, useContext } from 'react';
import { Container, Typography, Stack } from '@mui/material';
import UserContext from '../UserContext';
import OrderCard from '../components/Orders/OrderCard';

export default function MyOrders() {

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
      setOrders(data || []);

    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>

      <Typography variant="h4" textAlign="center" gutterBottom>
        Your Order History
      </Typography>

      {orders.length === 0 && (
        <Typography textAlign="center" mt={4}>
          No orders available
        </Typography>
      )}

      <Stack spacing={3}>
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} /> 
        ))}
      </Stack>

    </Container>
  );
}
