import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function AddProduct() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddProduct = () => {
    // Reset previous error and success messages
    setError(null);
    setSuccess(false);

    // Send a request to the backend to add a product
    fetch(`${process.env.REACT_APP_API_URL}/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else if (data.savedProduct) {
          setSuccess(true);
          // Optionally, you can clear the form or perform other actions upon successful addition
          setProductData({
            name: '',
            description: '',
            price: 0,
          });
        } else {
          console.error('Invalid response structure:', data);
        }
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        setError('Failed to add product. Please try again.');
      });
  };

  return (
    <>
      <h1 className="text-center my-4">Add Product</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Product added successfully!</Alert>}

      <Form>
        <Form.Group controlId="formProductName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formProductDescription">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formProductPrice">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Form>
    </>
  );
}
