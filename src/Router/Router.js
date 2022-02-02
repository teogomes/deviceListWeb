import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DeviceList from "../Screens/DeviceList";
import DeviceDetail from "../Screens/DeviceDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/detail" component={DeviceDetail} />
        <Route path="/" component={DeviceList} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
