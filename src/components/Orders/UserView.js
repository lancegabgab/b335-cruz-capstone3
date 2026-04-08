import { Container, Typography, Stack } from '@mui/material';
import OrderCard from './OrderCard';

const UserView = ({ ordersData }) => {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {ordersData.length === 0 ? (
        <Typography align="center">No orders found.</Typography>
      ) : (
        <Stack spacing={3}>
          {ordersData.map(({ order, items }) => {
            const productsOrdered = items.map(item => ({
              productId: item.productId._id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.productId.image || null 
            }));

            return (
              <OrderCard
                key={order._id}
                order={{ ...order, productsOrdered }}
              />
            );
          })}
        </Stack>
      )}
    </Container>
  );
}

export default UserView;
