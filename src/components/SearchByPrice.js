import React, { useState } from 'react';
import { Form, Button, Spinner, Alert, Table } from 'react-bootstrap';

const SearchByPrice = ({ onSearch }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/searchByPrice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ minPrice, maxPrice }),
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
        const errorMessage = await response.text(); // Get the error message from the response body
        setError(`Error searching products by price range: ${errorMessage}`);
        setLoading(false);
        return;
      }

      const searchData = await response.json();
      setSearchResults(searchData.product); // Assuming 'product' is the key in your backend response
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError(`Error searching products by price range: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formSearchPrice" className="mb-3">
          <Form.Label>Search by Price Range:</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control
              type="number"
              placeholder="Enter minimum price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="Enter maximum price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </Form.Group>
        <Button variant="primary" onClick={handleSearch}>
          Search by Price
        </Button>
      </Form>

      {loading && <Spinner animation="border" role="status" />}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && searchResults.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {searchResults.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {!loading && !error && searchResults.length === 0 && (
        <Alert variant="info">No products found in the specified price range.</Alert>
      )}
    </div>
  );
};

export default SearchByPrice;
