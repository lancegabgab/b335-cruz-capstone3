// AllOrders.js
import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import UserContext from '../UserContext';

import 'bootstrap/dist/css/bootstrap.min.css';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Fetch orders when the component mounts
    if (user.isAdmin) {
      fetchOrders();
    }
  }, [user.isAdmin]);

  const fetchOrders = () => {
    // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend
    fetch(`${process.env.REACT_APP_API_URL}/order/all-orders`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data.orders);
      })
      .catch((error) => {
        console.error('Error fetching admin orders:', error);
      });
  };

  return (
    <div>
      {user.isAdmin ? (
        <div>
          <h2>Admin Orders</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>Products</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{order.user}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.orderDate}</td>
                  <td>
                    <ul>
                      {order.productsOrdered.map((product) => (
                        <li key={product.productId}>
                          <p>Product ID: {product.productId}</p>
                          <p>Quantity: {product.quantity}</p>
                          <p>Price: {product.price}</p>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p>You do not have permission to view admin orders.</p>
      )}
    </div>
  );
};

export default AllOrders;
