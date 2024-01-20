import { useState, useEffect } from 'react';
import { Table, Spinner, Alert, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import SearchByPrice from './SearchByPrice';
import SearchByName from './SearchByName';

export default function UserView() {
  const [activeProducts, setActiveProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActiveProducts = () => {
    setLoading(true);
    setError(null);

    fetch(`${process.env.REACT_APP_API_URL}/products/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.product) {
          setActiveProducts(data.product);
        } else {
          console.error('Invalid response structure:', data);
          setError('Invalid response structure');
        }
      })
      .catch(error => {
        console.error('Error fetching active products:', error);
        setError('Error fetching data');
      })
      .finally(() => setLoading(false));
  };

  const addToCart = async (productId, quantity) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/add-to-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`
        },
        body: JSON.stringify({ productId, quantity })
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart!',
          text: 'Item has been added to your cart successfully.'
        });

        fetchActiveProducts(); // Refresh the product list after adding to the cart
      } else {
        console.error('Failed to add item to cart:', data);
        setError('Failed to add item to cart');

        // Show error alert using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Failed to Add to Cart',
          text: 'There was an issue adding the item to your cart. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error in adding to cart:', error);
      setError('Failed to add item to cart');

      // Show error alert using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add to Cart',
        text: 'There was an error processing your request. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveProducts();
  }, []);

  return (
    <>
      <h1 className="text-center my-4">Active Products</h1>
      <SearchByName /> 
      <SearchByPrice />

      {loading && <Spinner animation="border" role="status" />}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {activeProducts.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => addToCart(product._id, 1)} // Assuming quantity is 1 for simplicity
                  >
                    Add to Cart
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
