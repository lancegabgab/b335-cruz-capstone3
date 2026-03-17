import { Container, Typography, Stack } from '@mui/material';
import OrderCard from './OrderCard';
import OrderStatusTabs from './OrderStatusTabs';

const UserView = ({ ordersData }) => {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
  
      <OrderStatusTabs />
  
      <Typography variant="h4" align="center" gutterBottom>
        Your Order History
      </Typography>

      {ordersData.length === 0 ? (
        <Typography align="center">No orders found.</Typography>
      ) : (
        <Stack spacing={3}>
          {ordersData.map(order => (
            <OrderCard key={order._id} order={order} />
          ))}
        </Stack>
      )}
    </Container>
  );
}

export default UserView;
