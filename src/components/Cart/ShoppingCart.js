import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
  Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import NoImage from "../../images/NoImage.jpg";
import { toTitleCase } from '../../utils/stringUtils';

const ShoppingCart = ({
  cart,
  handleEditQuantity,
  handleRemoveProduct,
  handleClearCart,
  handleCheckout,
  calculateTotal
}) => {
  return (
    <Grid container spacing={4} mt={2} justifyContent="center">
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>

            {cart.length === 0 ? (
              <Box textAlign="center" py={5}>
                <Typography variant="h6" gutterBottom>
                  Your Cart is Empty
                </Typography>

                <Typography color="textSecondary" gutterBottom>
                  Looks like you haven't added anything yet.
                </Typography>

                <Button variant="contained">
                  Browse Products
                </Button>
              </Box>
            ) : (
              <>
                <Box display="flex" alignItems="center" px={1} mb={1}>
                  <Box flex={3}>
                    <Typography fontWeight="bold">Product</Typography>
                  </Box>

                  <Box width={80} textAlign="center">
                    <Typography fontWeight="bold">Qty</Typography>
                  </Box>

                  <Box width={100} textAlign="right">
                    <Typography fontWeight="bold">Price</Typography>
                  </Box>

                  <Box width={100} textAlign="right">
                    <Typography fontWeight="bold">Subtotal</Typography>
                  </Box>

                  <Box width={50}></Box>
                </Box>

                <Divider sx={{ mb: 1 }} />

                {cart.map((item) => (
                  <Box
                    key={item.productId}
                    display="flex"
                    alignItems="center"
                    mb={2}
                    px={1}
                    py={2}
                    borderRadius={2}
                    bgcolor="#fafafa"
                  >
                    <Box flex={3} display="flex" alignItems="center">
                      <Box
                        component="img"
                        src={NoImage}
                        alt={item.productId.name}
                        sx={{
                          width: 60,
                          height: 60,
                          objectFit: "cover",
                          borderRadius: 2,
                          mr: 2
                        }}
                      />

                      <Typography fontWeight="bold">
                        {toTitleCase(item.productId.name)}
                      </Typography>
                    </Box>

                    <Box width={80} textAlign="center">
                      <Box display="flex" justifyContent="center">
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleEditQuantity(item.productId, item.quantity - 1)
                          }
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography mx={1}>
                          {item.quantity}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() =>
                            handleEditQuantity(item.productId, item.quantity + 1)
                          }
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    <Box width={100} textAlign="right">
                      <Typography>
                        ₱{item.price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                      </Typography>
                    </Box>

                    <Box width={100} textAlign="right">
                      <Typography fontWeight="bold">
                        ₱{(item.price * item.quantity).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                      </Typography>
                    </Box>

                    <Box width={50} textAlign="center">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleRemoveProduct(item.productId)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </Button>

                  <Typography fontWeight="bold">
                    Total: ₱{calculateTotal().toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </>
            )}

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ShoppingCart;
