import React, { useState, useEffect } from 'react';
import './chat.css';
import logo from '../../assets/logo.svg';
import { BrowserRouter as Route, Link } from "react-router-dom";
import User from '../../components/user/User';
import client from '../../client';

function Chat(props) {
  const [value, setValue] = useState('');
  const [profiles, setProfile] = useState([]);

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      console.log("enter")
    }
  }

  useEffect(() => {
    // Acts as ComponentDidMount
    client.getProfiles().then(res => {
      if (!res.ack) {
        alert('Could not update todo');
        return;
      }
  
      setProfile(res.profiles);
    })
  }, [0]);

  return (
    <div className="chat">
      <div className="main-wrapper">
        <div className="left-wrapper">
          <div className="topbar">
            <img src={logo} alt="" height="40px" className="logo" />
            <span>Realtime Chat App</span>
          </div>
          <div>
            {profiles.map((item) => (
                <User name={item.name} />)
            )}
          </div>
        </div>

        <div className="right-wrapper">
          <div className="topbar">
            <div className="details">
              <div className="circle"><span>S</span></div>
              <div className="name">Shreya</div>
            </div>
            <div className="logout">
              <span>Logout</span>
              <Link to="/">
                <i className="material-icons">power_settings_new</i>
              </Link>
            </div>
          </div>
          <div className="message-area">
            <div className="send">Sncnsc</div>
            <div className="send">Sncnsc</div>
            <div className="receive">5678</div>
            <div className="receive">5678</div>
            <div className="receive">5678</div>
          </div>
          <div className="text-area" >
            <input type="text" placeholder="Type a message" value={value}
              onChange={(e) => setValue(e.target.value)} onKeyDown={handleEnter}></input>
            <i className="material-icons send-icon" disabled={!value}>send</i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat