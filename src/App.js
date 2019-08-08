import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Chat from './pages/chat/Chat'

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/sign-up" component={Signup} />
        <Route path="/chat" component={Chat} />
      </Router>
    </div>
  );
}

export default App;
