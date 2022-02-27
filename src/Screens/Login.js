import React, { useState } from 'react';
import { useAuth } from '../useAuth';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const auth = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.signIn(username, password);
      history.push('/');
    } catch (e) {
      alert(JSON.stringify(e.response?.data?.error));
    }
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form className='form'>
      <h3>Sign In</h3>
      <div className='form-group'>
        <label>Username</label>
        <input
          id='username'
          type='name'
          className='form-control'
          placeholder='Enter username'
          onChange={onChangeUsername}
        />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          id='password'
          type='password'
          className='form-control'
          placeholder='Enter password'
          onChange={onChangePassword}
        />
      </div>
      <div className='form-group'>
        <div className='custom-control custom-checkbox'>
          <input
            type='checkbox'
            className='custom-control-input'
            id='customCheck1'
          />
          <label className='custom-control-label' htmlFor='customCheck1'>
            Remember me
          </label>
        </div>
      </div>
      <button
        id='login-button'
        type='submit'
        onClick={onSubmit}
        className='btn btn-primary btn-block'
      >
        Submit
      </button>
      <p className='forgot-password text-right'>
        Forgot <a href='#'>password?</a>
      </p>
    </form>
  );
};

export default Login;
