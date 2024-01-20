import React, { useState, useEffect } from 'react';

const ProductCatalog = () => {
  const [activeProducts, setActiveProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set loading to true before making the fetch request
    setLoading(true);

    // Fetch all active products from the backend
    fetch('http://localhost:4004/b4/products/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setActiveProducts(data.products))
      .catch(error => {
        console.error('Error fetching active products:', error);
        setError('Error fetching active products. Please try again later.');
      })
      .finally(() => {
        // Set loading to false whether the request was successful or not
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>All Active Products</h2>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && activeProducts && activeProducts.length > 0 && (
        <ul>
          {activeProducts.map(product => (
            <li key={product._id}>
              <a href={`/products/${product._id}`}>{product.name}</a>
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && activeProducts && activeProducts.length === 0 && (
        <p>No active products available.</p>
      )}
    </div>
  );
};

export default ProductCatalog;

