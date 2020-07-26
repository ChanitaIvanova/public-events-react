import React from 'react'
import {Route,
  NavLink,
  Switch, } from 'react-router-dom'
import App from '../../App'
import Login from "../login/Login";
function NavBar() {
  return (
    <div>
      <ul>
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/login">
            Login
          </NavLink>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login">
            <Login />
        </Route>
      </Switch>
    </div>
)}

export default NavBar;