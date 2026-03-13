import {
  Container,
  Typography,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from "@mui/material";

const AdminView = ({ products, fetchData }) => {

  return (
    <Container>
      <Typography variant="h4" align="center" my={4}>
        Admin Dashboard
      </Typography>

      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Button variant="contained">+ Add Product</Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell>₱{p.price}</TableCell>
                <TableCell>
                  <Chip
                    label={p.isActive ? "Available" : "Unavailable"}
                    color={p.isActive ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

    </Container>
  );
}

export default AdminView;
