import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import DeviceList from '../Screens/DeviceList';
import DeviceDetail from '../Screens/DeviceDetail';
import Login from '../Screens/Login';
import { useAuth } from '../useAuth';
import Signup from '../Screens/Signup';
import { useHistory } from 'react-router-dom';

const LoginFlow = () => {
  return (
    <div className='auth-wrapper'>
      <div className='auth-inner'>
        <nav className='loginFlowNav'>
          <div className='nav-item'>
            <Link to={'/sign-in'} style={{ textDecoration: 'none' }}>
              Login
            </Link>
          </div>
          <div className='nav-item'>
            <Link to={'/sign-up'} style={{ textDecoration: 'none' }}>
              Sign up
            </Link>
          </div>
        </nav>
        <div className='auth-container'>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/sign-in' component={Login} />
            <Route path='/sign-up' component={Signup} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

const Router = () => {
  const auth = useAuth();
  return (
    <BrowserRouter>
      <NavBar />
      {auth.token ? (
        <Switch>
          <Route exact path='/' component={DeviceList} />
          <Route path='/detail' component={DeviceDetail} />
        </Switch>
      ) : (
        <LoginFlow />
      )}
    </BrowserRouter>
  );
};

const NavBar = () => {
  const auth = useAuth();
  const history = useHistory();
  if (!auth.token) {
    return null;
  }
  return (
    <div className='navbar navbar-expand-lg navbar-light bg-light justify-content-end px-3'>
      <button
        className='btn btn-danger px-3 me-2'
        onClick={() => {
          history.replace('/');
          auth.logout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Router;
