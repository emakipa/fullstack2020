import React from 'react'
import {
  Link
} from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const Menu = ({ user, logout }) => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <em>{user.username} logged in</em> <Link style={padding} to="/" onClick={logout}>logout</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Menu