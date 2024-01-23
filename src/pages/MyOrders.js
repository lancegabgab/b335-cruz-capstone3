import React, { useState, useEffect, useContext } from 'react';
import { Container, Table } from 'react-bootstrap';
import UserContext from '../UserContext';

const MyOrders = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userId = user ? user.id : null;
    if (userId) {
      fetchOrders(userId);
    }
  }, [user]);

  const fetchOrders = (userId) => {
    fetch(`${process.env.REACT_APP_API_URL}/order/my-orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      })
      .then(data => setOrders(data.orders))
      .catch(error => console.error('Error fetching orders:', error.message));
  };

  return (
    <Container className="mt-4">
      <h2>Your Order History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Total Price</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.productsOrdered.map((product) => (
                    <div key={product.productId}>
                      {product.productId} 
                    </div>
                  ))}
                </td>
                <td>
                  {order.productsOrdered.map((product) => (
                    <div key={product.productId}>
                      {product.quantity}
                    </div>
                  ))}
                </td>
                <td>
                  {order.productsOrdered.map((product) => (
                    <div key={product.productId}>
                      ${product.price}
                    </div>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No orders available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default MyOrders;
