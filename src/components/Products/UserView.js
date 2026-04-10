import { useState, useEffect } from 'react';
import { Grid, CircularProgress, Alert, Container, Typography } from '@mui/material';
import ProductCard from './ProductCard';

const UserView = ({ productsData = [] }) => {
  
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

  return (
    <Container sx={{ mt: 4 }}>

      {productsData.length === 0 && (
        <Alert severity="info">No products found</Alert>
      )}

      {productsData.length > 0 && (
        <Grid container spacing={3}>
          {productsData.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} addToCart={addToCart} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default UserView;
