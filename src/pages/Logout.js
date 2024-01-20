import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import {useContext, useEffect } from 'react';

export default function Logout({user}) {

  const { unsetUser, setUser} = useContext(UserContext);
    unsetUser(); // to clear local storage

    useEffect(()=>{ // to set user state access field to null 
      setUser({id: null, isAdmin: null});
    })

    // Redirect back to login
    return (
        <Navigate to='/login' />
    )
}