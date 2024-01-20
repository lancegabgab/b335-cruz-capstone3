import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GetSpecificProduct = () => {
  const { productId } = useParams(); // Get product id from URL parameter
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch a specific product from the backend
    fetch(`${process.env.REACT_APP_API_URL}/${productId}`)
      .then(response => response.json())
      .then(data => setProduct(data.product))
      .catch(error => console.error('Error fetching product:', error));
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default GetSpecificProduct;
