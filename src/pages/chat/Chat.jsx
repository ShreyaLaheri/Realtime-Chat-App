import React, { useState, useEffect } from 'react';
import './chat.css';
import logo from '../../assets/logo.svg';
import { BrowserRouter as Route, Link } from "react-router-dom";
import User from '../../components/user/User';
import client from '../../client';

function Chat() {
  const [value, setValue] = useState('');
  const [profiles, setProfile] = useState([]);
  const [id, setId] = useState('');
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState('');

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  const sendMessage = () => {
    client.sendMessage(id, value).then(res => {
      if (!res.ack) {
        alert('Could not send message');
        return;
      }
      setValue('')
    })
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

    const subscription = client.getMessages(((err, list) => {
      if (err) {
        alert(err);
        return
      }
      setMessages(list);
    }))

    return () => subscription.unsubscribe();
  }, [0]);

  const filteredMessages = messages.filter(msg => {
    return (msg.to == id || msg.from == id)
  })

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
              <div onClick={() => { setId(item._id); setSelected(item.name) }}>
                <User name={item.name} />
              </div>
            ))}
          </div>
        </div>

        <div className="right-wrapper">
          <div className="topbar">
            <div className="details">
              <div className="circle"><span>{selected.charAt(0)}</span></div>
              <div className="name">{selected}</div>
              <div className="online"></div>
            </div>
            <div className="logout">
              <span>Logout</span>
              <Link to="/">
                <i className="material-icons">power_settings_new</i>
              </Link>
            </div>
          </div>


          {filteredMessages.map((msg) => (
            <div className="message-area">
              <div className={
                msg.to !== id ? 'send' : 'receive'
              }>
                <div className="time">{msg.time}</div>
                <div>{msg.message}</div>
              </div>
            </div>
          ))}
          <div className="text-area" >
            <input type="text" placeholder="Type a message" value={value}
              onChange={(e) => setValue(e.target.value)} onKeyDown={handleEnter}></input>
            <i className="material-icons send-icon" disabled={!value} onClick={sendMessage}>send</i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
