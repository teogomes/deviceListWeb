import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import DeviceList from '../Screens/DeviceList';
import DeviceDetail from '../Screens/DeviceDetail';
import Login from '../Screens/Login';
import { useAuth } from '../useAuth';

const Router = () => {
  const auth = useAuth();
  return (
    <BrowserRouter>
      <NavBar />
      {auth.token ? (
        <Switch>
          <Route path='/detail' component={DeviceDetail} />
          <Route exact path='/' component={DeviceList} />
        </Switch>
      ) : (
        <div className='auth-wrapper'>
          <div className='auth-inner'>
            <Switch>
              <Route path='/' component={Login} />
              {/* <Route path='/sign-up' component={Login} /> */}
            </Switch>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
};

const NavBar = () => {
  const auth = useAuth();

  if (!auth.token) {
    return null;
  }
  return (
    <div className='navbar navbar-expand-lg navbar-light bg-light justify-content-end px-3'>
      <button className='btn btn-danger px-3 me-2' onClick={auth.logout}>
        Logout
      </button>
    </div>
  );
};

export default Router;
