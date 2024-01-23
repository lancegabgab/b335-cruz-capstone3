import React, { useState, useEffect, useContext } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import UserContext from '../UserContext';

import 'bootstrap/dist/css/bootstrap.min.css';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProductListVisible, setProductListVisible] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.isAdmin) {
      fetchOrders();
    }
  }, [user.isAdmin]);

  const fetchOrders = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/order/all-orders`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.orders);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching admin orders:', error);
        setLoading(false);
      });
  };

  const toggleProductListVisibility = () => {
    setProductListVisible(!isProductListVisible);
  };

  return (
    <Container>
      {user.isAdmin ? (
        <div>
          <h2>Admin Orders</h2>
          {loading ? (
            <p>Loading orders...</p>
          ) : (
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
                      <Button onClick={toggleProductListVisibility}>
                        {isProductListVisible ? 'Hide' : 'View'} Product List
                      </Button>
                      {isProductListVisible && (
                        <ul>
                          {order.productsOrdered.map((product) => (
                            <li key={product.productId}>
                              <p>Product ID: {product.productId}</p>
                              <p>Quantity: {product.quantity}</p>
                              <p>Price: {product.price}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      ) : (
        <p>You do not have permission to view admin orders.</p>
      )}
    </Container>
  );
};

export default AllOrders;
