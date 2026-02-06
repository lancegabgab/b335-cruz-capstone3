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
    <Container className="mt-4 d-flex flex-column align-items-center">
      <h2 className="mb-4">Your Order History</h2>
      <Table striped bordered hover className="w-75">
        <thead>
          <tr>
            <th className="text-center">Order Date</th>
            <th className="text-center">Total Price</th>
            <th className="text-center">Product ID</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Price</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td className="text-center">{new Date(order.orderDate).toLocaleString()}</td>
                <td className="text-center">{order.totalPrice.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="text-center">
                  {order.productsOrdered.map((product) => (
                    <div key={product.productId}>
                      {product.productId} 
                    </div>
                  ))}
                </td>
                <td className="text-center">
                  {order.productsOrdered.map((product) => (
                    <div key={product.productId}>
                      {product.quantity}
                    </div>
                  ))}
                </td>
                <td className="text-center">
                  {order.productsOrdered.map((product) => (
                    <div key={product.productId}>
                      {product.price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
