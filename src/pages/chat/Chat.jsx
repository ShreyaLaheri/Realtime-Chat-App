import React from 'react'
import './chat.css'
import logo from '../../assets/logo.svg'
import User from '../../components/user/User'

function Chat(props) {
  return (
    <div className="chat">
      <div className="topbar">
        <img src={logo} alt="" height="40px" className="logo" />
        <span>Realtime Chat App</span>
      </div>
      <div className="main-wrapper">
        <div className="left-wrapper">
          <User />
          <User />
          <User />
        </div>
        <div className="right-wrapper">

        </div>
      </div>
    </div>
  )
}

export default Chat
