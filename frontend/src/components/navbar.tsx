import "bootstrap/dist/css/bootstrap.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchIcon from "./search_icon";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';


export default function NavigationBar() {
    const navigate = useNavigate();
    const location = useLocation();

    function handleClickSearch() {
        navigate("/aisearch");
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
            <Container>
                <Navbar.Brand href="/">BookShop</Navbar.Brand>
                <Breadcrumb className="me-auto mt-3">
                    <Breadcrumb.Item href="/" active={location.pathname == "/"}>Home</Breadcrumb.Item>
                    {location.pathname.includes("aisearch") ? <Breadcrumb.Item active>AI Search</Breadcrumb.Item> : null}
                </Breadcrumb>
            </Container>
            <Container className="d-flex justify-content-end">
                <div className="mx-3"><SearchIcon onClick={handleClickSearch}/></div>
                <div><Button className="mx-3" href="/book">Add Book</Button></div>
            </Container>
        </Navbar>
    )
}