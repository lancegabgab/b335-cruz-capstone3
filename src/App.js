import './style.css';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import About from './pages/About';
import AppNavBar from './components/AppNavBar';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Users from './pages/Users';
import AllOrders from './pages/AllOrders';
import Cart from './pages/Cart';
import UserView from './components/UserView';
import MyOrders from './pages/MyOrders'
//import GetSpecificProduct from './pages/GetSpecificProduct';
import { UserProvider } from './UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import { useState, useEffect } from 'react';
// import UserContext from './UserContext';

function App() {
  const [user, setUser] = useState({ id: null, isAdmin: null });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    console.log('State: ');
    console.log(user); // checks the state
    console.log('Local storage');
    console.log(localStorage); // checks the localStorage
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
                    path="/products/"
                    element={<AddProduct />}
                  />
                  <Route
                    path="allorders"
                    element={<AllOrders />}
                  />
                  <Route
                    path="/users"
                    element={<Users />}
                  />
                  <Route
                    path="/products/all"
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
                    path="/products/users"
                    element={<UserView />}
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
                    path="/"
                    element={<Register />}
                  />
                  <Route
                    path="/login"
                    element={<Login />}
                  />
                  <Route
                    path="/logout"
                    element={<Logout />}
                  />
                </Routes>
              </div>
            </>
          </Router>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
