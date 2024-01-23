import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AdminView() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      const data = await response.json();

      if (data && data.result) {
        setProducts(data.result);
      } else {
        console.error('Invalid response structure:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddProductClick = () => {
    setProduct({
      name: '',
      description: '',
      price: 0,
    });

    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (data.savedProduct) {
        Swal.fire({
          icon: 'success',
          title: 'Product Added',
          text: 'The product has been added successfully!',
        });

        handleCloseAddModal();

        fetchData();
      } else if (data.error && data.error.includes('Product already exists')) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Product with the same name already exists. Please choose a different name.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while adding the product. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditClick = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
    fetchProduct(productId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchProduct = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleSaveClick = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/products/${selectedProductId}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify(product),
      });

      setShowModal(false);

      Swal.fire({
        icon: 'success',
        title: 'Product Updated',
        text: 'The product has been updated successfully!',
      });

      fetchData();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleActivate = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      const data = await response.json();

      if (data.activatedProduct) {
        Swal.fire({
          icon: 'success',
          title: 'Product Activated',
          text: 'The product has been activated successfully!',
        });

        fetchData();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while activating the product. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error activating product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while activating the product. Please try again.',
      });
    }
  };

  const handleArchive = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      const data = await response.json();

      if (data.archivedProduct) {
        Swal.fire({
          icon: 'success',
          title: 'Product Archived',
          text: 'The product has been archived successfully!',
        });

        fetchData();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while archiving the product. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error archiving product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while archiving the product. Please try again.',
      });
    }
  };

  return (
    <Container className="text-center">
      <h1 className="text-center my-4">Admin Dashboard</h1>
      <Button className="mb-3" variant="outline-primary" onClick={handleAddProductClick}>
        Add Product
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="text-center">
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td className={product.isActive ? 'text-success' : 'text-danger'}>
                {product.isActive ? 'Available' : 'Unavailable'}
              </td>
              <td>
                <Button variant="outline-primary" onClick={() => handleEditClick(product._id)}>
                  Edit
                </Button>
              </td>
              <td>
                {product.isActive ? (
                  <Button variant="outline-danger" onClick={() => handleArchive(product._id)}>
                    Archive Product
                  </Button>
                ) : (
                  <Button variant="outline-success" onClick={() => handleActivate(product._id)}>
                    Activate Product
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="name"
                value={product.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter product description"
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="name"
                value={product.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter product description"
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
