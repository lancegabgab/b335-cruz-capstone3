import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function Logout() {
  const { unsetUser, setUser } = useContext(UserContext);

  useEffect(() => {
    // Display SweetAlert2 notification
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You are now logged out',
    });

    // Clear local storage
    unsetUser();

    // Set user state access field to null
    setUser({ id: null, isAdmin: null });
  }, []); // Empty dependency array to run once

  // Redirect back to login
  return <Navigate to="/login" />;
}
