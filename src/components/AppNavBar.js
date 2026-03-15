import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../UserContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../images/PetParadiseLogo.png';

const AppNavBar = () => {
  const { user } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2E7D32' }}>
      <Toolbar>
        <NavLink to="/">
          <img src={logo} alt="Pet Paradise" style={{ height: 50 }} />
        </NavLink>

        {/* Mobile links */}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }} >
          <IconButton
            size="large"
            color="inherit"
            onClick={handleOpenNavMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <NavLink to="/">
              <MenuItem onClick={handleCloseNavMenu}>Home</MenuItem>
            </NavLink>
            <NavLink to="/about">
              <MenuItem onClick={handleCloseNavMenu}>About</MenuItem>
            </NavLink>

            {user.id !== null ? (
              user.isAdmin ? (
                <>
                  <NavLink to="/products">
                    <MenuItem onClick={handleCloseNavMenu}>Products</MenuItem>
                  </NavLink>
                  <NavLink to="/users">
                    <MenuItem onClick={handleCloseNavMenu}>Users</MenuItem>
                  </NavLink>
                  <NavLink to="/orders">
                    <MenuItem onClick={handleCloseNavMenu}>Orders</MenuItem>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/products">
                    <MenuItem onClick={handleCloseNavMenu}>Shop</MenuItem>
                  </NavLink>
                  <NavLink to="/cart">
                    <MenuItem onClick={handleCloseNavMenu}>
                      <ShoppingCartIcon />
                    </MenuItem>
                  </NavLink>
                </>
              )
            ) : (
              <>
                <NavLink to="/login">
                  <MenuItem onClick={handleCloseNavMenu}>Login</MenuItem>
                </NavLink>
                <NavLink to="/register">
                  <MenuItem onClick={handleCloseNavMenu}>Register</MenuItem>
                </NavLink>
              </>
            )}
          </Menu>
        </Box>

        {/* Desktop links */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
          <NavLink to="/">
            <Button sx={{ color: 'white' }}>Home</Button>
          </NavLink>
          <NavLink to="/about">
            <Button sx={{ color: 'white' }}>About</Button>
          </NavLink>

          {user.id !== null ? (
            user.isAdmin ? (
              <>
                <NavLink to="/products">
                  <Button sx={{ color: 'white' }}>Products</Button>
                </NavLink>
                <NavLink to="/users">
                  <Button sx={{ color: 'white' }}>Users</Button>
                </NavLink>
                <NavLink to="/orders">
                  <Button sx={{ color: 'white' }}>Orders</Button>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/products">
                  <Button sx={{ color: 'white' }}>Shop</Button>
                </NavLink>
                <NavLink to="/cart">
                  <Button sx={{ color: 'white' }}>
                    <ShoppingCartIcon />
                  </Button>
                </NavLink>
              </>
            )
          ) : (
            <>
              <NavLink to="/login">
                <Button sx={{ color: 'white' }}>Login</Button>
              </NavLink>
              <NavLink to="/register">
                <Button sx={{ color: 'white' }}>Register</Button>
              </NavLink>
            </>
          )}
        </Box>

        {user.id !== null && (
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              sx={{ mt: '45px' }}
            >
              <NavLink to="/profile">
                <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
              </NavLink>
              <NavLink to="/orders">
                <MenuItem onClick={handleCloseUserMenu}>My Orders</MenuItem>
              </NavLink>
              <NavLink to="/logout">
                <MenuItem onClick={handleCloseUserMenu}>Logout</MenuItem>
              </NavLink>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppNavBar;
