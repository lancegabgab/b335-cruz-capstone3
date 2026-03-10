import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Card,
  CardContent,
} from '@mui/material';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('error');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setSeverity('error');
      return;
    }

    try {
      const token = localStorage.getItem('access');
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/update-password`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newPassword: password }),
        }
      );

      if (response.ok) {
        setMessage('Password reset successfully');
        setSeverity('success');
        setPassword('');
        setConfirmPassword('');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to reset password');
        setSeverity('error');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again.');
      setSeverity('error');
    }
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Reset Password
        </Typography>

        <Box
          component="form"
          onSubmit={handleResetPassword}
          sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
          />

          {message && <Alert severity={severity}>{message}</Alert>}

          <Button type="submit" variant="contained" color="primary">
            Reset Password
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
