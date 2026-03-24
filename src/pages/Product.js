import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import UserView from '../components/Products/UserView';
import AdminView from '../components/Products/AdminView';
import useApi from '../hooks/useApi';

const Products = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const { callApi } = useApi(''); 

  const fetchData = async () => {
    try {
      const endpoint =
        user.isAdmin === true ? '/products/all' : '/products';

      const data = await callApi({ method: 'GET', url: endpoint });

      setProducts(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return user.isAdmin ? (
    <AdminView productsData={products} fetchData={fetchData} />
  ) : (
    <UserView productsData={products} />
  );
};

export default Products;
