import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

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
      setUsers(data.result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching all users:', error);
      setError('Failed to fetch user data');
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

      // Fetch updated user data after setting as admin
      await fetchUsers();

      // Show sweet alert on success
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User has been set as admin successfully.',
      });

    } catch (error) {
      console.error('Error setting as admin:', error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container className="text-center">
      <h1>All Users</h1>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Admin?</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((singleUser) => (
                <tr key={singleUser._id}>
                  <td>{singleUser._id}</td>
                  <td>{`${singleUser.firstName} ${singleUser.lastName}`}</td>
                  <td>{singleUser.isAdmin ? 'Yes' : 'No'}</td>
                  <td>
                    {singleUser.isAdmin ? (
                      <Button variant="secondary" disabled>
                        Admin
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => handleSetAsAdmin(singleUser._id)}
                      >
                        Set as Admin
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;