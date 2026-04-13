import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import useApi from './hooks/useApi';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Users from './pages/Users';
import Cart from './pages/Cart';
import Order from './pages/Order';
import AppNavBar from './components/AppNavBar';
import Footer from './components/Footer';

const App = () => {
  const [user, setUser] = useState({ id: null, isAdmin: null });
  const [loading, setLoading] = useState(true);

  const { callApi } = useApi('/users/details');

  const unsetUser = () => {
    localStorage.removeItem('access');
    setUser({ id: null, isAdmin: null });
  };

  useEffect(() => {
    const getUser = async () => {
      const data = await callApi();
  
      const userId = data?._id || data?.data?._id;
  
      if (userId) {
        setUser({
          id: userId,
          isAdmin: data?.isAdmin ?? data?.data?.isAdmin ?? false,
        });
      } else {
        setUser({ id: null, isAdmin: null });
      }
  
      setLoading(false);
    };
  
    getUser();
  }, []);
  
  if (loading) return <div>Loading...</div>;

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/users" element={<Users />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>

        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;
