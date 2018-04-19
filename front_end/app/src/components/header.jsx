import React from 'react';
import logo from '../images/logo.jpg';

const Header = () => <header className="App__header">
  <div className="App__header-wrapper">
    <img src={logo} className="App__logo" alt="logo" />
    <h1 className="App__title">Welcome to simple MongoDB client.</h1>
  </div>
</header>

export default Header;