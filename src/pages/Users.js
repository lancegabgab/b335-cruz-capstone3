import React, { useEffect, useState, useContext } from 'react';
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

  const toggleAdminStatus = async (userId, isAdmin) => {
    try {
      const token = localStorage.getItem('access');

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${userId}/toggle-admin`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isAdmin: !isAdmin }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error toggling admin status: ${response.statusText}`);
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isAdmin: !isAdmin } : user
        )
      );
    } catch (error) {
      console.error('Error toggling admin status:', error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderUsers = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (users.length === 0) {
      return <p>No users available.</p>;
    }

    return (
      <div>
        <h1>All Users</h1>
        <table className="table table-striped">
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
                <td>{singleUser._id}</td>
                <td>{singleUser.isAdmin ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    onClick={() => toggleAdminStatus(singleUser._id, singleUser.isAdmin)}
                  >
                    {singleUser.isAdmin ? 'Remove Admin' : 'Set as Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return renderUsers();
};

export default Users;
