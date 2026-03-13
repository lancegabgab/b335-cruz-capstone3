import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import UserView from '../components/Products/UserView';
import AdminView from '../components/Products/AdminView';

const Products = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const url =
      user.isAdmin === true
        ? `${process.env.REACT_APP_API_URL}/products/all`
        : `${process.env.REACT_APP_API_URL}/products/`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    });
    const data = await res.json();
    setProducts(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return user.isAdmin ? (
    <AdminView productsData={products} fetchData={fetchData} />
  ) : (
    <UserView productsData={products} />
  );
}
export default Products;
