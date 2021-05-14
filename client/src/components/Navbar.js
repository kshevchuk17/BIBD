import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">BIBD</span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/profile/detail/">My Account</NavLink></li>
            <li><NavLink to="/credit_type/all/">Credits Type</NavLink></li>
            <li><NavLink to="/deposit_type/all/">Deposits Type</NavLink></li>
            <li><NavLink to="/credit/all/">My Credits</NavLink></li>
            <li><NavLink to="/deposit/all/">My Deposits</NavLink></li>
            <li><a href="/" onClick={logoutHandler}>Logout</a></li>
          </ul>
      </div>
    </nav>
  )
}