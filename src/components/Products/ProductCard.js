import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button
} from '@mui/material';
import Swal from 'sweetalert2';
import NoImage from '../../images/NoImage.jpg';

const ProductCard = ({ product, addToCart }) => {
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addToCart(product._id); 
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message
      });
    } finally {
      setAdding(false);
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: '0.3s',
        '&:hover': { boxShadow: 6 }
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <CardMedia
          component="img"
          height="180"
          image={product.image || NoImage}
        />
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          ₱{product.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          variant="contained"
          disabled={adding}
          onClick={handleAddToCart}
        >
          {adding ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
