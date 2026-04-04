import { useState, useEffect } from 'react';
import { Grid, CircularProgress, Alert, Container, Typography } from '@mui/material';
import ProductCard from './ProductCard';

const UserView = ({ productsData }) => {
  const [activeProducts, setActiveProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const fetchActiveProducts = async () => {
    setLoadingProducts(true);
    try {
      setActiveProducts(productsData.filter(p => p.isActive));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/cart/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`
      },
      body: JSON.stringify({ productId, quantity })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add to cart');
  };

  useEffect(() => {
    fetchActiveProducts();
  }, [productsData]);

  return (
    <Container sx={{ mt: 4 }}>

      {loadingProducts && <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />}

      {!loadingProducts && activeProducts.length === 0 && (
        <Alert severity="info">No products found</Alert>
      )}

      {!loadingProducts && activeProducts.length > 0 && (
        <Grid container spacing={3}>
          {activeProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard product={product} addToCart={addToCart} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default UserView;
