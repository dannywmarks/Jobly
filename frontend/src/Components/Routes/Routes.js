import React from "react";
import Home from "../Landing/Landing";
import Companies from "../Companies/Companies";
import Jobs from "../Jobs/Jobs";
import Company from "../Companies/Company/Company";
import Login from "../Login/Login";
import Profile from "../Profile/ProfileForm";
import Privateroute from "../PrivateRoute/PrivateRoute";
import { Route, Switch, Redirect } from "react-router-dom";

const Routes = ({ setToken }) => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login setToken={setToken} />
        </Route>
        <Privateroute exact path="/companies">
          <Companies />
        </Privateroute>
        <Privateroute exact path="/jobs">
          <Jobs />
        </Privateroute>
        <Privateroute exact path="/companies/:handle">
          <Company />
        </Privateroute>
        <Privateroute exact path="/profile">
          <Profile />
        </Privateroute>
        <Redirect to='/'/>
      </Switch>
    </div>
  );
};

export default Routes;
