import { useState, useEffect } from 'react';
import { Container, Table, Spinner, Alert, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import SearchByName from './SearchByName';
import SearchByPrice from './SearchByPrice';

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
    <Container>
      <h1 className="text-center my-4">Active Products</h1>

      <div className="row">
        <div className="col-md-6 mb-3">
          <SearchByName />
        </div>
        <div className="col-md-6 mb-3">
          <SearchByPrice />
        </div>
      </div>

      {loading && <Spinner animation="border" role="status" />}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr className="text-center">
              <th className="text-center">ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Description</th>
              <th className="text-center">Price</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {activeProducts.map(product => (
              <tr key={product._id}>
                <td className="text-center">{product._id}</td>
                <td className="text-center">{product.name}</td>
                <td className="text-center">{product.description}</td>
                <td className="text-center">{product.price}</td>
                <td>
                  <Button className="text-center"
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
    </Container>
  );
}
