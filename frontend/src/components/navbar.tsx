import "bootstrap/dist/css/bootstrap.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function NavigationBar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
            <Container>
                <Navbar.Brand href="/">BookShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Container className="d-flex justify-content-end">
                <Button href="/book">Add Book</Button>
            </Container>
        </Navbar>
    )
}