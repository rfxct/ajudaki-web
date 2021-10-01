import { useState } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'
import Image from 'next/image'

import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap'

import routes from '../routes'

export default function SidebarComponent({ logo }) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const closeCollapse = () => setCollapsed(false)
  const toggleCollapsed = () => setCollapsed(!collapsed)

  function isActive(route) {
    return router.route.includes(route.fullPath)
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Navbar Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapsed}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Sidebar Logo */}
        <NavbarBrand href="#" className="pt-0">
          <Image className="navbar-brand-img" alt='...' src={logo.src} width="128px" height="40px" />
        </NavbarBrand>

        {/* Sidebar */}
        <Collapse navbar isOpen={collapsed}>
          {/* Collapsed Header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {/* Collapsed Logo */}
              <Col className="collapse-brand" xs="6">
                <Link href="/">
                  <a><Image src={logo.src} width="128px" height="40px" alt='...' /></a>
                </Link>
              </Col>

              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={closeCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Navigation */}
          <Nav navbar>
            {routes.map((route, key) => (
              <NavItem key={key} active={isActive(route)}>
                <Link href={route.fullPath}>
                  <a>
                  <NavLink
                    href="#"
                    active={isActive(route)}
                    onClick={closeCollapse}
                  >
                    <NavItemIcon>
                      {route.icon}
                    </NavItemIcon>
                    {route.name}
                  </NavLink>
                  </a>
                </Link>
              </NavItem>
            ))}</Nav>
          {/* Divider */}
          <hr className="my-3" />
          {/* Heading */}
          <h6 className="navbar-heading text-muted">Sub menu</h6>
          {/* Navigation */}
          <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink href="#">
                <i className="ni ni-spaceship" />
                menu 1
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}

function NavItemIcon({ children }) {
  return (
    <span
      style={{
        minWidth: '2.25rem',
        fontSize: '.9375rem',
        lineHeight: '1.5rem'
      }}
    >
      {children}
    </span>
  )
}