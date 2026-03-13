import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Banner from '../images/PetParadiseBanner.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ position: 'relative', width: '100%', mt: 3 }}>
      <Box
        component="img"
        src={Banner}
        alt="Pet Paradise Banner"
        sx={{
          width: '100%',
          maxHeight: 700,
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          textAlign: 'left',
          color: 'white',
          px: 4,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Fun Toys for Happy Pets
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Discover safe and exciting toys your pets will love
        </Typography>
        <Button
          variant="contained"
          sx={{ 
            backgroundColor: '#2E7D32', 
            color: '#fff', 
            borderRadius: '50px',
            fontWeight: 'bold' 
          }}
          onClick={() => navigate('/products')}
        >
          Shop Now
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
