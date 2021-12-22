import React from 'react'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import Logo from '../assets/images/homeLogo.png'

const MyNavbar = () => {
    return (
        <div>
            <Navbar
                color="light"
                expand="md"
                light
            >
                <NavbarBrand href="/">
                    <img width={40} height={40} src={Logo} alt={"logo"} />
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() { }} />
                <Collapse navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                        <NavItem>
                            <NavLink href="/">
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/Gallery">
                                Gallery
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/Category">
                                Category
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/Product">
                                Product
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/About">
                                About
                            </NavLink>
                        </NavItem>

                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default MyNavbar
