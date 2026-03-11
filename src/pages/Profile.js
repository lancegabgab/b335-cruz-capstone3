import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import ResetPassword from '../components/ResetPassword';
import UserContext from '../UserContext';

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from '@mui/material';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({});

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          setDetails(data);
        } else {
          showError(data.error || 'Something went wrong');
        }
      })
      .catch(() => showError('Failed to fetch user details'));
  };

  const showError = (message) => {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: message,
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Profile
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {details.firstName} {details.lastName}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Contact Information
              </Typography>
              <Typography>
                <strong>Email:</strong> {details.email}
              </Typography>
              <Typography>
                <strong>Mobile:</strong> {details.mobileNo}
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Button variant="contained" color="primary">
                  Edit Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Security
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResetPassword />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
