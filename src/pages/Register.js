import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Stack,
} from '@mui/material';

const Register = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isActive, setIsActive] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!formFields.firstName.trim()) errors.firstName = 'First name is required';
    if (!formFields.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formFields.email.includes('@')) errors.email = 'Invalid email address';
    if (formFields.mobileNo.length !== 11) errors.mobileNo = 'Mobile number must be 11 digits';
    if (formFields.password.length < 8) errors.password = 'Password must be at least 8 characters';
    if (formFields.password !== formFields.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    setFormErrors(errors);
    setIsActive(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [formFields]);

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formFields.firstName,
          lastName: formFields.lastName,
          email: formFields.email,
          mobileNo: formFields.mobileNo,
          password: formFields.password,
        }),
      });

      const data = await res.json();

      if (data.message === 'Registered Successfully') {
        Swal.fire({
          icon: 'success',
          title: 'Registration successful',
          text: 'You can now sign in.',
        }).then(() => navigate('/'));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: data.error || 'Something went wrong.',
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
          Create an account
        </Typography>
        <form onSubmit={registerUser}>
          <Stack spacing={3}>
            <TextField
              label="First Name"
              value={formFields.firstName}
              onChange={(e) => setFormFields({ ...formFields, firstName: e.target.value })}
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
              fullWidth
            />
            <TextField
              label="Last Name"
              value={formFields.lastName}
              onChange={(e) => setFormFields({ ...formFields, lastName: e.target.value })}
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
              fullWidth
            />
            <TextField
              label="Email Address"
              type="email"
              value={formFields.email}
              onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
              error={!!formErrors.email}
              helperText={formErrors.email}
              fullWidth
            />
            <TextField
              label="Mobile Number"
              type="tel"
              value={formFields.mobileNo}
              onChange={(e) => setFormFields({ ...formFields, mobileNo: e.target.value })}
              error={!!formErrors.mobileNo}
              helperText={formErrors.mobileNo}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={formFields.password}
              onChange={(e) => setFormFields({ ...formFields, password: e.target.value })}
              error={!!formErrors.password}
              helperText={formErrors.password}
              fullWidth
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={formFields.confirmPassword}
              onChange={(e) => setFormFields({ ...formFields, confirmPassword: e.target.value })}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color={isActive ? 'primary' : 'inherit'}
              disabled={!isActive}
              fullWidth
            >
              Sign up
            </Button>

            <Typography variant="body2" align="center">
              Already have an account? <Link to="/">Sign in</Link>
            </Typography>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
