import React from 'react'
import './user.css'

function User(props) {
  return (
    <div className="user">
      <div className="circle"><span>S</span></div>
      <div>
        <div className="name">{props.name}</div>
        <div className="message">Lorem ipsum dolor sit amet</div>
      </div>
    </div>
  )
}

export default User
