import React, { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
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

      // Fetch updated cart after editing quantity
      await fetchUserCart();
    } catch (error) {
      console.error('Error editing quantity:', error);
      setError('Failed to edit item quantity in cart');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProduct = async (productId, onRemove) => {
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
        // Successfully removed product, trigger parent callback to fetch updated cart
        onRemove();

        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Successfully Removed',
        });
      }
    } catch (error) {
      // Catch any errors that occur during the asynchronous operation and log them
      console.error('Error removing product from cart:', error);
    } finally {
      setLoading(false);
    }
  };
    const handleCheckout = async () => {
    try {
      // Assuming you have an API endpoint to handle order creation
      const response = await fetch(`${process.env.REACT_APP_API_URL}/order/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify({
          productsOrdered: cart, // Use the cart items for the productsOrdered field
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order created successfully:', result);

        // Show SweetAlert2 success message
        Swal.fire({
          icon: 'success',
          title: 'Order Placed!',
          text: 'Your order has been placed successfully.',
        });

        // Handle other success actions if needed
      } else {
        const error = await response.json();
        console.error('Failed to create order:', error);

        // Show SweetAlert2 error message
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to place the order. Please try again.',
        });

        // Handle other error actions if needed
      }
    } catch (error) {
      console.error('Error in handleCheckout:', error);

      // Show SweetAlert2 error message for unexpected errors
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An unexpected error occurred. Please try again later.',
      });

      // Handle other unexpected error actions if needed
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
        // Handle the data accordingly
        console.log(data.message);

        // Show SweetAlert2 success message
        Swal.fire({
          icon: 'success',
          title: 'Cart Cleared',
          text: 'Your cart has been successfully cleared!',
        });
      } else {
        const errorData = await response.json();
        console.error('Error clearing cart:', errorData.message);

        // Show SweetAlert2 error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to clear cart. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error clearing cart:', error.message);

      // Show SweetAlert2 error message for network errors
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
    <div>
      <h2>Your Shopping Cart</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

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
                  onChange={(e) => handleEditQuantity(item.productId, e.target.value)}
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
    </div>
  );
};

export default Cart;