import { Card, CardContent, Typography, Divider, Box } from "@mui/material";
import NoImage from "../../images/NoImage.jpg";
import { toTitleCase } from '../../utils/stringUtils';
import { formatDateTime } from "../../utils/dateTimeUtils";

const OrderCard = ({ order, showUser = false  }) => {
  return ( 
    <Card sx={{ p: 2 }}>
      <CardContent>

        {showUser && order.user && (
          <Typography fontWeight="bold" mb={1}>
            User: {toTitleCase(order.user.firstName)} {toTitleCase(order.user.lastName)}
          </Typography>
        )}
        <Typography fontWeight="bold" mb={2}>
          Order Date: {formatDateTime(order.orderDate)}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box display="flex" alignItems="center" mb={1} px={1}>
          <Box flex={3}>
            <Typography fontWeight="bold">Product</Typography>
          </Box>

          <Box width={80} textAlign="center">
            <Typography fontWeight="bold">Qty</Typography>
          </Box>

          <Box width={100} textAlign="right">
            <Typography fontWeight="bold">Unit Price</Typography>
          </Box>

          <Box width={120} textAlign="right">
            <Typography fontWeight="bold">Subtotal</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 1 }} />

        {order.productsOrdered.map((product) => (
          <Box
            key={product.productId}
            display="flex"
            alignItems="center"
            mb={1}
            p={1}
            border="1px solid #eee"
            borderRadius={2}
          >
            <Box display="flex" alignItems="center" flex={3}>
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
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                  borderRadius: 2,
                  mr: 2,
                }}
              />
              <Typography fontWeight="bold" noWrap>
                {toTitleCase(product.name)}
              </Typography>
            </Box>

            <Box width={80} textAlign="center">
              <Typography>{product.quantity}</Typography>
            </Box>

            <Box width={100} textAlign="right">
              <Typography>
                ₱{product.price.toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Box>

            <Box width={120} textAlign="right">
              <Typography fontWeight="bold">
                ₱{(product.price * product.quantity).toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Box>
          </Box>
        ))}

        <Divider sx={{ mt: 2, mb: 2 }} />

        <Box display="flex" justifyContent="flex-end">
          <Typography fontWeight="bold" fontSize={18}>
            Total: ₱{order.totalPrice.toLocaleString("en-PH", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default OrderCard;
