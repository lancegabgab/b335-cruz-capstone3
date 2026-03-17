import { Container, Typography, Stack } from '@mui/material';
import OrderCard from './OrderCard';

const AdminView = ({ ordersData, fetchData }) => {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {ordersData.length === 0 ? (
        <Typography align="center">No orders found.</Typography>
      ) : (
        <Stack spacing={3}>
          {ordersData.map(order => (
            <OrderCard key={order._id} order={order} showUser />
          ))}
        </Stack>
      )}
    </Container>
  );
}

export default AdminView;
