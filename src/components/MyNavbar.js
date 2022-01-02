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
                                <h5>Home</h5>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/Gallery">
                                <h5>Gallery</h5>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/Category">
                                <h5>Category</h5>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/Product">
                                <h5>Product</h5>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/Order">
                                <h5>Order</h5>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/About">
                                <h5>About</h5>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default MyNavbar
