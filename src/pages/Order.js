import { useEffect, useState, useContext } from 'react';
import { Typography } from '@mui/material';
import UserContext from '../UserContext';
import UserView from '../components/Orders/UserView';
import AdminView from '../components/Orders/AdminView';
import OrderStatusTabs from '../components/Orders/OrderStatusTabs';
  
const Order = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    if (!user) return;

    const url = user.isAdmin
      ? `${process.env.REACT_APP_API_URL}/order/all-orders`
      : `${process.env.REACT_APP_API_URL}/order/my-orders`;

    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      const data = await res.json();
      setOrders(data.data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        {user?.isAdmin ? "Users' Orders" : "My Orders"}
      </Typography>
  
      <OrderStatusTabs />
      {user?.isAdmin ? (
        <AdminView ordersData={orders} fetchData={fetchData} />
      ) : (
        <UserView ordersData={orders} />
      )}
    </>
  );
};

export default Order;
