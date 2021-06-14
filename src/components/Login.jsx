import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const onChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const parsRes = await response.json();

      if (parsRes.token) {
        localStorage.setItem('token', parsRes.token);
        setAuth(true);
        toast.success('You Are Now Logged In, Welcome !');
      } else {
        setAuth(false);
        toast.error(parsRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const { email, password } = inputs;
  return (
    <Fragment>
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
          autoFocus
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/register">Register</Link>
    </Fragment>
  );
};

export default Login;
