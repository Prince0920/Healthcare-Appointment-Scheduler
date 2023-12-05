import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { SERVER_BASE_URL } from '../config/config.local';
import Spinner from './Spinner';

const ProtectedRoute = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  //get user
  const getuser = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        SERVER_BASE_URL + '/api/v1/user/getUserData',
        { token: localStorage.getItem('token') },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setLoading(false);

      if (res.data.success) {
        setUser(res.data.data);
      } else {
        <Navigate to='/login' />;
        localStorage.clear();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  if (!loading) {
    if (localStorage.getItem('token')) {
      return children;
    } else {
      return <Navigate to='/login' />;
    }
  } else {
    return <Spinner />;
  }
};

export default ProtectedRoute;
