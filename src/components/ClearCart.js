import React, { useContext } from 'react';
import UserContext from '../UserContext';

// Import SweetAlert2 styles
import 'sweetalert2/dist/sweetalert2.min.css';

// Import SweetAlert2 library
import Swal from 'sweetalert2';

const ClearCart = () => {
  const { user } = useContext(UserContext);

  const handleClearCart = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cart/clear-cart`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed, such as authorization headers
          },
        }
      );

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
};

export default ClearCart;
