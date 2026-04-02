import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import ResetPassword from '../components/Profile/ResetPassword';
import UserContext from '../UserContext';
import useApi from "../hooks/useApi";
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
import { toTitleCase } from '../utils/stringUtils';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({});
  const { callApi, loading, error } = useApi("/users/details", "GET");

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await callApi();
      if (response?.success) {
        setDetails(response.data);
      } else {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Failed to fetch user details",
        });
      }
    };
  
    fetchDetails();
  }, [callApi]);
  
  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: error,
      });
    }
  }, [error]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Profile
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {toTitleCase(`${details.firstName} ${details.lastName}`)}
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

        <Grid item xs={12}>
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
