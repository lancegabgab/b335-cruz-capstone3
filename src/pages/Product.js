import { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext";
import UserView from "../components/Products/UserView";
import AdminView from "../components/Products/AdminView";
import useApi from "../hooks/useApi";

const Products = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const endpoint = user?.isAdmin ? "/products/all" : "/products";
  const { callApi, loading, error } = useApi(endpoint);

  const fetchData = async () => {
    const data = await callApi();
    setProducts(data || []);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return user?.isAdmin ? (
    <AdminView productsData={products} fetchData={fetchData} />
  ) : (
    <UserView productsData={products} />
  );
};

export default Products;
