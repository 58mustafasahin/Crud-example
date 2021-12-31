import React from 'react'
import { BsGithub, BsLinkedin, BsMedium } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Container, Row } from 'reactstrap'

const MyFouter = () => {
    var date = new Date()
    return (
        <div className="footer" style={{
            position: 'inherit',
            bottom: '0',
            width: '100%'
        }}>
            <Container fluid className="text-center text-md-left">
                <Row>

                </Row>
                <Row className="footer-copyright text-center py-3">
                    <Container fluid>&copy; {(date.getFullYear())} MUSTAFA ŞAHİN</Container>
                    <Container>
                        <a target='_blank' href='https://www.linkedin.com/in/mustafa-%C5%9Fahin-715b27138/'><BsLinkedin /></a>
                        {' '}
                        <a target='_blank' color='none' href='https://github.com/58mustafasahin'><BsGithub /></a>
                        {' '}
                        {/* <a target='_blank' color='none' href='https://medium.com/58mustafasahin'><BsMedium /></a> */}
                    </Container>
                </Row>
            </Container>
        </div>
    )
}

export default MyFouter
