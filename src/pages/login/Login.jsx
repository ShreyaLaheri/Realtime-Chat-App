import React, { useState } from 'react';
import './login.css';
import logo from '../../assets/logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import client from '../../client';

const Wrapper = withRouter(({ history }) => (
  <Login history={history} />
))

function Login(props) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const login = () => {
    client.login(email, pass).then(res => {
      if (!res.ack) {
        alert('Error logging in')
        return;
      }
  
      props.history.push('/chat');
    })
  }

  return (
    <div className="login">
      <div className="login-card">
        <img src={logo} alt="" width="80px" />
        <p className="title">Chat App</p>
        <div class="input-container">
          <i class="material-icons">email</i>
          <input class="input-field" type="text" name="Email Address" value={email} placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div class="input-container">
          <i class="material-icons">lock</i>
          <input class="input-field" type="text" name="Password" value={pass} placeholder="Password"
            onChange={(e) => setPass(e.target.value)} />
        </div>
        <div className="footer">
          <div className="dont-have-account">Don't have an account? </div>
          <Link to="/sign-up">
            <div className="signup-here">Sign up here</div>
          </Link>
        </div>
        <button className="login-button" onClick={login}>Sign in</button>
      </div>
    </div>
  )
}

export default Wrapper;

