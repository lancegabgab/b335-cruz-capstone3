import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Users from './pages/Users';
import AllOrders from './pages/AllOrders';
import Cart from './pages/Cart';
import MyOrders from './pages/MyOrders'
import AppNavBar from './components/AppNavBar';
import Footer from './components/Footer';
import './style.css';

function App() {
  const [user, setUser] = useState({ id: null, isAdmin: null });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
  }, [user]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data._id !== 'undefined') {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      });
  }, []);

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <div className="rubikFont">
          <Router>
            <>
              <AppNavBar />
              <div>
                <Routes>
                  <Route
                    path="allorders"
                    element={<AllOrders />}
                  />
                  <Route
                    path="/users"
                    element={<Users />}
                  />
                  <Route
                    path="/home"
                    element={<Home />}
                  />
                  <Route
                    path="/products"
                    element={<Product />}
                  />
                  <Route
                    path="/profile"
                    element={<Profile />}
                  />
                  <Route
                    path="/cart"
                    element={<Cart />}
                  />
                  <Route
                    path="/myorders"
                    element={<MyOrders />}
                  />
                  <Route
                    path="/about"
                    element={<About />}
                  />
                  <Route
                    path="/register"
                    element={<Register />}
                  />
                  <Route
                    path="/"
                    element={<Login />}
                  />
                  <Route
                    path="/logout"
                    element={<Logout />}
                  />
                </Routes>
              </div>
              <Footer />
            </>
          </Router>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
