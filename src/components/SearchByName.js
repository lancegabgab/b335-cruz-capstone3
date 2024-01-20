import React, { useState } from 'react';
import { Form, Spinner, Alert, Table, Button } from 'react-bootstrap';

const SearchByName = () => {
  const [name, setName] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/searchByName`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSearchResults(data.products);
        setError(null);
      } else {
        setSearchResults([]);
        setError(data.error || 'Failed to search products');
      }
    } catch (error) {
      setSearchResults([]);
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formSearchName">
          <Form.Label>Search by Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleSearch}
        >
          Search by Name
        </Button>
      </Form>

      {/* Loading Indicator */}
      {loading && (
        <Spinner
          animation="border"
          role="status"
        />
      )}

      {/* Error Display */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Display Search Results */}
      {!loading && !error && searchResults.length > 0 && (
        <Table
          striped
          bordered
          hover
          responsive
        >
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

      {/* No Results Message */}
      {!loading && !error && searchResults.length === 0 && (
        <Alert variant="info">No products found with the specified name.</Alert>
      )}
    </div>
  );
};

export default SearchByName;
