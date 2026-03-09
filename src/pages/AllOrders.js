import React, { useState, useEffect, useContext } from "react";
import { Container, Typography } from "@mui/material";
import UserContext from "../UserContext";
import OrderCard from "../components/Orders/OrderCard";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.isAdmin) {
      fetchOrders();
    }
  }, [user.isAdmin]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/order/all-orders`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {user.isAdmin ? (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            All Users' Orders
          </Typography>
          {loading ? (
            <Typography align="center">Loading orders...</Typography>
          ) : orders.length === 0 ? (
            <Typography align="center">No orders found.</Typography>
          ) : (
            orders.map((order) => <OrderCard key={order._id} order={order} />)
          )}
        </>
      ) : (
        <Typography align="center">
          You do not have permission to view admin orders.
        </Typography>
      )}
    </Container>
  );
}
