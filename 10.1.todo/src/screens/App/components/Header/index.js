import React from 'react'
import './style.css'

const Header = props => (<header className="header row primary-bg-color">
  <h1 className="header__title">{props.children}</h1>
</header>)

export default Header
