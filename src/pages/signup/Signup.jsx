import React, { useState } from 'react';
import './signup.css';
import logo from '../../assets/logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import client from '../../client';

const Wrapper = withRouter(({ history }) => (
  <Signup history={history} />
))

function Signup(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const signup = () => {
    client.signUp(email, username, pass).then(res => {
      if (!res.ack) {
        alert('Error signing up')
        return;
      }
  
      props.history.push('/chat');
    })
  }

  return (
    <div className="signup">
      <div className="signup-card">
        <img src={logo} alt="" width="80px" />
        <p className="title">Chat App</p>
        <div class="input-container">
          <i class="material-icons">person</i>
          <input class="input-field" type="text" name="Username" value={username} placeholder="Username"
            onChange={(e) => setUsername(e.target.value)} />
        </div>
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
          <div className="already-have-account">Already have an account? </div>
          <Link to="/">
            <div className="signin-here">Sign in here</div>
          </Link>
        </div>
        <button className="signin-button" onClick={signup}>Sign up</button>
      </div>
    </div>
  )
}
export default Wrapper

