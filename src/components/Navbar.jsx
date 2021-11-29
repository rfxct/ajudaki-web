import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaTicketAlt, FaSignOutAlt } from 'react-icons/fa'

import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from 'reactstrap'

function AdminNavbar({ brandText, user }) {

  return (
    <>
      <Navbar className="navbar-top navbar-dark bg-gradient-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link href="/tickets/@me">
            <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
              {brandText}
            </a>
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <Image
                      alt="..."
                      src={`https://avatars.dicebear.com/v2/initials/${user?.full_name}.svg`}
                      width="48px"
                      height="48px"
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {user.full_name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <Link href="/tickets/@me">
                  <a>
                    <DropdownItem>
                      <FaTicketAlt />
                      <span>Meus tickets</span>
                    </DropdownItem>
                  </a>
                </Link>
                <DropdownItem divider />
                <DropdownItem href="/logout">
                  <FaSignOutAlt />
                  <span>Sair</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar
