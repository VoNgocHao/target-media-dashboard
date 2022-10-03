import React from "react";
import "./App.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "../node_modules/react-toastify/dist/ReactToastify.min.css";
import Users from "./layouts/Users";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./layouts/Profile/profile";
import KpiPage from "./layouts/KPI/kpi-page";
import Notification from "./layouts/System/notification";
// import Dashboard from "./layouts/dashboard";
import HomePage from "./layouts/home-page";
import UserCreate from "./layouts/Users/create-edit";
import Login from "./layouts/login";
import Permissions from "./layouts/System/permissions";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/user/create">
          <UserCreate />
        </Route>
        <Route path="/user/:id">
          <UserCreate />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/kpi">
          <KpiPage />
        </Route>
        <Route path="/notifications">
          <Notification />
        </Route>
        <Route path="/permissions">
          <Permissions />
        </Route>
        {/* <Route path="/dashboard">
          <Dashboard />
        </Route> */}
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
