import { useState, useEffect } from 'react';
import { Grid, CircularProgress, Alert, Container, Typography } from '@mui/material';
import ProductCard from './ProductCard';

export default function UserView() {
  const [activeProducts, setActiveProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState(null);

  const fetchActiveProducts = async () => {
    setLoadingProducts(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/products/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`
        }
      });

      const data = await res.json();
      if (Array.isArray(data)) {
        setActiveProducts(data);
      } else {
        setError('Invalid response structure');
      }
    } catch (err) {
      setError('Error fetching products');
    } finally {
      setLoadingProducts(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/cart/add-to-cart`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`
        },
        body: JSON.stringify({ productId, quantity })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to add to cart');
    }
  };

  useEffect(() => {
    fetchActiveProducts();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Products
      </Typography>

      {loadingProducts && (
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Grid>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loadingProducts && !error && (
        <Grid container spacing={3}>
          {activeProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard product={product} addToCart={addToCart} />
            </Grid>
          ))}
        </Grid>
      )}

      {!loadingProducts && !error && activeProducts.length === 0 && (
        <Alert severity="info">No products found</Alert>
      )}
    </Container>
  );
}
