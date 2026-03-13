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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  Chip
} from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import NoImage from "../images/NoImage.jpg";

export default function AdminView({ productsData, fetchData }) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [product, setProduct] = useState({ name: "", description: "", price: 0, image: "" });
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleAddProduct = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`
        },
        body: JSON.stringify(product)
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire("Success", "Product added successfully!", "success");
        setShowAddDialog(false);
        setProduct({ name: "", description: "", price: 0, image: "" });
        fetchData();
      } else {
        Swal.fire("Error", data.error || "Failed to add product", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleEditClick = (p) => {
    setProduct(p);
    setSelectedProductId(p._id);
    setShowEditDialog(true);
  };

  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/products/${selectedProductId}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`
        },
        body: JSON.stringify(product)
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire("Success", "Product updated successfully!", "success");
        setShowEditDialog(false);
        fetchData();
      } else {
        Swal.fire("Error", data.error || "Failed to update product", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleArchive = async (productId) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("access")}` }
      });
      const data = await res.json();
      if (res.ok) Swal.fire("Success", "Product archived!", "success");
      fetchData();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleActivate = async (productId) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("access")}` }
      });
      const data = await res.json();
      if (res.ok) Swal.fire("Success", "Product activated!", "success");
      fetchData();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" my={4}>
        Admin Dashboard
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="space-between" mb={2}>
        <Button variant="contained" onClick={() => setShowAddDialog(true)}>
          + Add Product
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsData.map((p) => (
              <TableRow key={p._id}>
                <TableCell>
                  <Avatar src={p.image || NoImage} variant="rounded" sx={{ width: 50, height: 50 }} />
                </TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell>₱{p.price.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip label={p.isActive ? "Available" : "Unavailable"} color={p.isActive ? "success" : "default"} size="small" />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={() => handleEditClick(p)}>Edit</Button>
                    {p.isActive ? (
                      <Button variant="outlined" color="error" onClick={() => handleArchive(p._id)}>Archive</Button>
                    ) : (
                      <Button variant="outlined" color="success" onClick={() => handleActivate(p._id)}>Activate</Button>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" name="name" value={product.name} onChange={handleChange} fullWidth />
            <TextField label="Description" name="description" value={product.description} onChange={handleChange} fullWidth multiline rows={3} />
            <TextField label="Price" name="price" type="number" value={product.price} onChange={handleChange} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>Close</Button>
          <Button variant="contained" onClick={handleAddProduct}>Add Product</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" name="name" value={product.name} onChange={handleChange} fullWidth />
            <TextField label="Description" name="description" value={product.description} onChange={handleChange} fullWidth multiline rows={3} />
            <TextField label="Price" name="price" type="number" value={product.price} onChange={handleChange} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditDialog(false)}>Close</Button>
          <Button variant="contained" onClick={handleSaveEdit}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
