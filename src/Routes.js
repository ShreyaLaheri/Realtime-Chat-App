import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React from 'react';
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

export default () => {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/sign-up" component={Signup} />
    </Router>
  )
}

