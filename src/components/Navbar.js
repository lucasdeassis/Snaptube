import React from 'react'
import logo from './logo.ico'
import './Navbar.css'

const Navbar = () => {
  return (

    <nav className='navbar navbar-expand-lg navbar-dark bg-dark sticky-top'>
      <a className='navbar-brand' href='/'>
        <img src={logo} className='App-logo' width='30' height='30' alt='logo' />
        Snaptube
      </a>

    </nav>
  )
}

export default Navbar
