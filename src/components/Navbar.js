import React from 'react'
import config from './gear.png'
import logo from './logo.ico'
import './Navbar.css'

const Navbar = () => {
  return (

    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <a className='navbar-brand' href='/'>
        <img src={logo} className='App-logo' width='30' height='30' alt='logo' />
        Snaptube
      </a>

      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarText' aria-controls='navbarText' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon' />
      </button>

      <div className='collapse navbar-collapse' id='navbarText'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <a className='nav-link' href='/Library'>Library <span className='sr-only'>(current)</span></a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/About'>About</a>
          </li>
        </ul>

        <a className='navbar-brand' href='/Config'>
          <img src={config} className='Img-config' alt='Config' width='30' height='30' />
        </a>
      </div>
    </nav>
  )
}

export default Navbar
