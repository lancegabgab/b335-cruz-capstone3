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
import logo from '../images/componentPhotos/petParadiseTextNoBg.png';
import NoImage from '../images/NoImage.jpg';

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

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
            <NavLink to="/home">
              <MenuItem onClick={handleCloseNavMenu}>Home</MenuItem>
            </NavLink>
            <NavLink to="/about">
              <MenuItem onClick={handleCloseNavMenu}>About</MenuItem>
            </NavLink>

            {user.id !== null ? (
              user.isAdmin ? (
                <>
                  <NavLink to="/products/all">
                    <MenuItem onClick={handleCloseNavMenu}>Products</MenuItem>
                  </NavLink>
                  <NavLink to="/users">
                    <MenuItem onClick={handleCloseNavMenu}>Users</MenuItem>
                  </NavLink>
                  <NavLink to="/allorders">
                    <MenuItem onClick={handleCloseNavMenu}>Orders</MenuItem>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/products/users">
                    <MenuItem onClick={handleCloseNavMenu}>Shop</MenuItem>
                  </NavLink>
                  <NavLink to="/cart">
                    <MenuItem onClick={handleCloseNavMenu}>
                      <ShoppingCartIcon />
                    </MenuItem>
                  </NavLink>
                  <NavLink to="/myorders">
                    <MenuItem onClick={handleCloseNavMenu}>Orders</MenuItem>
                  </NavLink>
                </>
              )
            ) : (
              <>
                <NavLink to="/">
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
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}>
          <NavLink to="/home">
            <Button sx={{ color: 'white' }}>Home</Button>
          </NavLink>
          <NavLink to="/about">
            <Button sx={{ color: 'white' }}>About</Button>
          </NavLink>

          {user.id !== null ? (
            user.isAdmin ? (
              <>
                <NavLink to="/products/all">
                  <Button sx={{ color: 'white' }}>Products</Button>
                </NavLink>
                <NavLink to="/users">
                  <Button sx={{ color: 'white' }}>Users</Button>
                </NavLink>
                <NavLink to="/allorders">
                  <Button sx={{ color: 'white' }}>Orders</Button>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/products/users">
                  <Button sx={{ color: 'white' }}>Shop</Button>
                </NavLink>
                <NavLink to="/cart">
                  <Button sx={{ color: 'white' }}>
                    <ShoppingCartIcon />
                  </Button>
                </NavLink>
                <NavLink to="/myorders">
                  <Button sx={{ color: 'white' }}>Orders</Button>
                </NavLink>
              </>
            )
          ) : (
            <>
              <NavLink to="/">
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
                <Avatar alt={user.name} src="/static/images/NoImage.jpg" />
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
