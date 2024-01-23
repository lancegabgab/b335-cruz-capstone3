import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ResetPassword from '../components/ResetPassword';
import UserContext from '../UserContext';

export default function Profile() {
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
        if (typeof data._id !== 'undefined') {
          setDetails(data);
        } else if (data.error === 'User not found') {
          showError('User not found');
        } else {
          showError('Something went wrong');
        }
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        showError('Failed to fetch user details');
      });
  };

  const showError = (message) => {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: message,
    });
  };

  return (
    <Container>
      {user.id === null && localStorage.getItem('access') === null ? (
        <Navigate to="/courses" />
      ) : (
        <Row className="mt-5">
          <Col md={6} className="bg-primary text-white p-4 rounded">
            <h1 className="mb-4">Profile</h1>
            <h2>{`${details.firstName} ${details.lastName}`}</h2>
            <hr className="bg-light" />
            <h4 className="mt-3">Contacts</h4>
            <ul>
              <li>Email: {details.email}</li>
              <li>Mobile No: {details.mobileNo}</li>
            </ul>
          </Col>
          <Col md={6}>
            <div className="bg-black text-white p-4 rounded">
              <ResetPassword />
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}
