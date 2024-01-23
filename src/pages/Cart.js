import React, { useContext, useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';

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
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user cart. Status: ${response.status}`);
      }

      const { cart: fetchedCart } = await response.json();

      if (Array.isArray(fetchedCart.items)) {
        setCart(fetchedCart.items);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error('Error fetching user cart:', error);
      setError('Failed to fetch user cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, [user]);

  const handleEditQuantity = async (productId, newQuantity) => {
    setLoading(true);
    setError(null);

    try {
      // Your logic for editing quantity
      // ...

      // Update local state without fetching the entire cart
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error editing quantity:', error);
      setError('Failed to edit item quantity in cart');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/${productId}/remove-from-cart`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Removed',
        });

        // Update local state without fetching the entire cart
        setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/order/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify({
          productsOrdered: cart,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order created successfully:', result);

        Swal.fire({
          icon: 'success',
          title: 'Order Placed!',
          text: 'Your order has been placed successfully.',
        });

        // Clear the local cart after successful checkout
        setCart([]);
      } else {
        const error = await response.json();
        console.error('Failed to create order:', error);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to place the order. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error in handleCheckout:', error);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An unexpected error occurred. Please try again later.',
      });
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/clear-cart`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);

        Swal.fire({
          icon: 'success',
          title: 'Cart Cleared',
          text: 'Your cart has been successfully cleared!',
        });

        // Clear the local cart after successful clear
        setCart([]);
      } else {
        const errorData = await response.json();
        console.error('Error clearing cart:', errorData.message);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to clear cart. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error clearing cart:', error.message);

      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Failed to connect to the server. Please check your internet connection.',
      });
    }
  };

  const calculateSubtotal = (price, quantity) => {
    return (price * quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const calculateTotal = () => {
    const cartItems = cart || [];
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  return (
    <Container>
      <h2>Your Shopping Cart</h2>

      {loading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error}</p> : null}

      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.productId}>
              <td>{item.productId}</td>
              <td>{item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleEditQuantity(item.productId, parseInt(e.target.value, 10) || 0)}
                />
              </td>
              <td>{calculateSubtotal(item.price, item.quantity)}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemoveProduct(item.productId)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div>
        <Button variant="secondary" onClick={handleClearCart}>
          Clear Cart
        </Button>
        <Button variant="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>

      <div>
        <p>Total: {calculateTotal()}</p>
      </div>
    </Container>
  );
};

export default Cart;
