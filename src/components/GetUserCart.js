const getUserCart = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/cart/get-cart`,
      {
        method: 'GET',
        headers: {
          // Add any required headers here, such as authorization token
          // You may need to handle authentication based on your backend setup
          'Content-Type': 'application/json',
          // Add other headers if necessary
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get user cart');
    }

    const data = await response.json();
    return data.cart; // Assuming the response structure has a 'cart' property
  } catch (error) {
    console.error('Error fetching user cart:', error.message);
    throw error;
  }
};

export default getUserCart;
