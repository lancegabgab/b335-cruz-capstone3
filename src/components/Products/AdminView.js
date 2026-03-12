import React, { useState, useEffect } from "react";
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
  Chip,
} from "@mui/material";
import Swal from "sweetalert2";
import NoImage from "../images/NoImage.jpg";

export default function AdminView() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      const data = await response.json();
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddClick = () => {
    setProduct({ name: "", description: "", price: 0, image: "" });
    setShowAddDialog(true);
  };

  const handleEditClick = async (productId) => {
    setSelectedProductId(productId);
    setShowEditDialog(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleCloseAddDialog = () => setShowAddDialog(false);
  const handleCloseEditDialog = () => setShowEditDialog(false);

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleAddProduct = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (data.savedProduct) {
        Swal.fire("Success", "Product added successfully!", "success");
        setShowAddDialog(false);
        fetchData();
      } else {
        Swal.fire("Error", data.error || "Failed to add product", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/products/${selectedProductId}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify(product),
      });
      Swal.fire("Success", "Product updated successfully!", "success");
      setShowEditDialog(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleActivate = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      const data = await response.json();
      if (data.activatedProduct) Swal.fire("Success", "Product activated!", "success");
      fetchData();
    } catch (error) {
      Swal.fire("Error", "Failed to activate product", "error");
    }
  };

  const handleArchive = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      const data = await response.json();
      if (data.archivedProduct) Swal.fire("Success", "Product archived!", "success");
      fetchData();
    } catch (error) {
      Swal.fire("Error", "Failed to archive product", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" my={4}>
        Admin Dashboard
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="space-between" mb={2}>
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          + Add Product
        </Button>
        <TextField label="Search Product" variant="outlined" size="small" />
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
            {products.map((p) => (
              <TableRow key={p._id}>
                <TableCell>
                  <Avatar
                    src={p.image || NoImage}
                    variant="rounded"
                    sx={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell>
                  ₱{Number(p.price).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  <Chip
                    label={p.isActive ? "Available" : "Unavailable"}
                    color={p.isActive ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={() => handleEditClick(p._id)}>
                      Edit
                    </Button>
                    {p.isActive ? (
                      <Button variant="outlined" color="error" onClick={() => handleArchive(p._id)}>
                        Archive
                      </Button>
                    ) : (
                      <Button variant="outlined" color="success" onClick={() => handleActivate(p._id)}>
                        Activate
                      </Button>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={showAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" name="name" value={product.name} onChange={handleChange} fullWidth />
            <TextField
              label="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
            <TextField label="Price" name="price" type="number" value={product.price} onChange={handleChange} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Close</Button>
          <Button onClick={handleAddProduct} variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
                
      <Dialog open={showEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" name="name" value={product.name} onChange={handleChange} fullWidth />
            <TextField
              label="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
            <TextField label="Price" name="price" type="number" value={product.price} onChange={handleChange} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Close</Button>
          <Button onClick={handleSaveEdit} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
