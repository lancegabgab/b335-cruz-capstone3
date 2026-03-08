import { Card, CardContent, Typography, Divider, Box } from "@mui/material";
import NoImage from "../../images/NoImage.jpg";

export default function OrderCard({ order }) {
  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography fontWeight="bold">
            Order Date: {new Date(order.orderDate).toLocaleString()}
          </Typography>

          <Typography fontWeight="bold">
            Total: ₱{order.totalPrice.toLocaleString("en-PH", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {order.productsOrdered.map((product) => (
          <Box
            key={product.productId}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
            p={1}
            border="1px solid #eee"
            borderRadius={2}
          >
            <Box
              component="img"
              src={
                product.image
                  ? `${process.env.REACT_APP_API_URL}/${product.image}`
                  : NoImage
              }
              alt={product.name}
              onError={(e) => (e.target.src = NoImage)}
              sx={{
                width: 60,
                height: 60,
                objectFit: "cover",
                borderRadius: 2,
                mr: 2,
              }}
            />

            <Box flex={1}>
              <Typography fontWeight="bold" noWrap>
                {product.name}
              </Typography>
            </Box>

            <Box mx={2}>
              <Typography>Qty: {product.quantity}</Typography>
            </Box>

            <Box>
              <Typography fontWeight="bold">
                ₱
                {(product.price * product.quantity).toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}