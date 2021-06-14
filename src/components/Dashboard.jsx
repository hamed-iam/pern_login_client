import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');

  const getName = async () => {
    try {
      const response = await fetch('http://localhost:5000/dashboard', {
        method: 'GET',
        headers: { token: localStorage.getItem('token') },
      });

      const parsRes = await response.json();

      setName(parsRes.message);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    toast.warn('You are logged out');
  };

  return (
    <Fragment>
      <h1>Dashboard</h1>
      <p>{name}</p>
      <button onClick={() => logout()} className="btn btn-primary">
        Logout
      </button>
    </Fragment>
  );
};

export default Dashboard;
