import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../useAuth';

const Signup = () => {
  const auth = useAuth();
  const history = useHistory();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.signUp(name, username, password);
      await auth.signIn(username, password);
      history.push('/');
    } catch (e) {
      alert(JSON.stringify(e.response?.data?.error));
    }
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form className='form'>
      <h3>Sign Up</h3>
      <div className='form-group'>
        <label>Name</label>
        <input
          type='name'
          className='form-control'
          placeholder='Enter name'
          onChange={onChangeName}
        />
      </div>
      <div className='form-group'>
        <label>Username</label>
        <input
          type='name'
          className='form-control'
          placeholder='Enter username'
          onChange={onChangeUsername}
        />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
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

export default Signup;
