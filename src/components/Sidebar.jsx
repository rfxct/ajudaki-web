/* eslint-disable @next/next/link-passhref */
import { useState } from 'react'
import { useRouter } from 'next/router'

import Brand from '../components/Brand'

import Link from 'next/link'

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

export default function SidebarComponent({ user, logo }) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const closeCollapse = () => setCollapsed(false)
  const toggleCollapsed = () => setCollapsed(!collapsed)

  function isActive(route) {
    return route.fullPath === router.route
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapsed}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <NavbarBrand href="#" className="p-0">
          <Brand />
        </NavbarBrand>

        {/* Sidebar */}
        <Collapse navbar isOpen={collapsed}>
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-brand" xs="6">
                <Link href="/">
                  <a><Brand /></a>
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
          {/* Heading */}
          {Object.entries(routes[user?.role || 'default'])?.map(([categoryName, categoryRoutes], categoryKey) => (
            <div key={categoryKey}>
              <h6 className="navbar-heading text-muted">
                {categoryName}
              </h6>

              <Nav navbar>
                {categoryRoutes.map((route, routeKey) => (
                    <NavItem key={routeKey} active={isActive(route)}>
                      <Link href={isActive(route) ? '#' : route.fullPath}>
                        <NavLink
                          href={isActive(route) ? '#' : route.fullPath}
                          active={isActive(route)}
                          onClick={closeCollapse}
                        >
                          <NavItemIcon>
                            {route.icon}
                          </NavItemIcon>
                          {route.name}
                        </NavLink>
                      </Link>
                    </NavItem>
                  )
                )}
              </Nav>
            </div>
          ))}
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