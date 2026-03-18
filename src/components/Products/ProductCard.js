import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { toTitleCase } from '../../utils/stringUtils';
import { formatPrice } from '../../utils/priceUtils';

const ProductCard = ({ product, addToCart }) => {
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addToCart(product._id); 
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart!',
        text: 'The item has been added to your cart.',
        showCancelButton: true,
        confirmButtonText: 'Go to Cart',
        cancelButtonText: 'Continue Shopping'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/cart');
        }
      });
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
      <CardMedia
        component="img"
        height="180"
        image={product.image || NoImage}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {toTitleCase(product.name)}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          ₱{formatPrice(product.price)}
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
