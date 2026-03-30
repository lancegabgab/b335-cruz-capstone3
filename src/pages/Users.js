import React, { useEffect, useState, useContext } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { toTitleCase } from '../utils/stringUtils';

const Users = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('access');

      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/all`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching all users: ${response.statusText}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching all users:', error);
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const handleSetAsAdmin = async (userId) => {
    try {
      const token = localStorage.getItem('access');

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${userId}/set-as-admin`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error setting as admin: ${response.statusText}`);
      }

      await fetchUsers();

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User has been set as admin successfully.',
      });
    } catch (error) {
      console.error('Error setting as admin:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to set user as admin.',
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" align="center" mt={5}>
        {error}
      </Typography>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        All Users
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Admin?</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((singleUser) => (
                <TableRow key={singleUser._id}>
                  <TableCell>{toTitleCase(`${singleUser.firstName} ${singleUser.lastName}`)}</TableCell>
                  <TableCell>{singleUser.isAdmin ? 'Yes' : 'No'}</TableCell>
                  <TableCell align="center">
                    {singleUser.isAdmin ? (
                      <Button variant="contained" color="secondary" disabled>
                        Admin
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSetAsAdmin(singleUser._id)}
                      >
                        Set as Admin
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Users;
