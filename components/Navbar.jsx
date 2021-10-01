import React from "react";
import Link from "next/link";
import Image from 'next/image';
import { FaTicketAlt, FaUser, FaSignOutAlt } from 'react-icons/fa'

import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

function AdminNavbar({ brandText }) {
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link href="/admin/dashboard">
            <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
              {brandText}
            </a>
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <Image
                      alt="..."
                      src="https://avatars.dicebear.com/v2/initials/Marcos-Ferreira.svg"
                      width="48px"
                      height="48px"
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      Marcos Ferreira
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <Link href="/perfil/@me">
                  <a>
                    <DropdownItem>
                      <FaUser />
                      <span>Meu perfil</span>
                    </DropdownItem>
                  </a>
                </Link>
                <Link href="/tickets/@me">
                  <a>
                    <DropdownItem>
                      <FaTicketAlt />
                      <span>Meus tickets</span>
                    </DropdownItem>
                  </a>
                </Link>
                <DropdownItem divider />
                <DropdownItem href="#" onClick={(e) => e.preventDefault()}>
                  <FaSignOutAlt />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
