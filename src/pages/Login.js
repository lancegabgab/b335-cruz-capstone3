import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import UserContext from '../UserContext';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Stack,
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsActive(email !== '' && password !== '');
  }, [email, password]);

  const authenticate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.access) {
        localStorage.setItem('access', data.access);
        retrieveUserDetails(data.access);

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'You are now logged in',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => navigate('/products/all'));
      } else if (data.error === 'No Email Found') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Email not found',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${email} does not exist`,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Server error. Please try again later.',
      });
    }

    setEmail('');
    setPassword('');
  };

  const retrieveUserDetails = async (token) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUser({ id: data._id, isAdmin: data.isAdmin });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign in
        </Typography>

        <form onSubmit={(e) => isActive && authenticate(e)}>
          <Stack spacing={3}>
            <TextField
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />

            <Button
              type="submit"
              variant="contained"
              color={isActive ? 'primary' : 'inherit'}
              disabled={!isActive}
              fullWidth
            >
              Sign in
            </Button>

            <Typography variant="body2" align="center">
              No account yet? <Link to="/register">Sign up</Link>
            </Typography>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
