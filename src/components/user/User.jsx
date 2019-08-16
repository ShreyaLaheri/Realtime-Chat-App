import React from 'react'
import './user.css'

function User(props) {
  return (
    <div className="user">
      <div className="circle"><span>{props.name.charAt(0)}</span></div>
      <div>
        <div className="name">{props.name}</div>
        <div className="message">Lorem ipsum dolor sit amet</div>
      </div>
    </div>
  )
}

export default User
