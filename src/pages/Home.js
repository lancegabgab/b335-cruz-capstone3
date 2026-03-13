import React from 'react';
import { Box } from '@mui/material';
import Banner1 from '../images/banner/Banner1.png';

const Home = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      mt={3}
    >
      <Box
        component="img"
        src={Banner1}
        alt="Pet Paradise Banner"
        sx={{
          maxHeight: 500,
          width: '100%',
          objectFit: 'cover',
        }}
      />
    </Box>
  );
}

export default Home;
