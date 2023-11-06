import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useParams } from "react-router";


export default function EditBookPage() {
    const params = useParams();
    const bookID = params["id"];


    return (
        <div style={{ margin: "40px 300px"}}>
            <h1 style={{ margin: "40px"}}>Edit Book: {bookID}</h1>
            <Form>
                <Form.Group className="mb-3" as={Row} controlId="editBookFormTile">
                    <Form.Label column sm={2}>Title</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            placeholder="The title of the book" 
                            onChange={(e) => {}}
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="mb-3" as={Row} controlId="editBookFormAuthor">
                    <Form.Label column sm={2}>Author</Form.Label>
                    <Col sm={10}>
                        <Form.Control placeholder="The author of the book" />
                    </Col> 
                </Form.Group>
                <Form.Group className="mb-3" as={Row} controlId="editBookFormYear">
                    <Form.Label column sm={2}>Year</Form.Label>
                    <Col sm={10}>
                        <Form.Control placeholder="The pubblication year of the book" />
                    </Col>
                </Form.Group>
                <Form.Group className="mb-3" as={Row} controlId="editBookPrice">
                    <Form.Label column sm={2}>Price</Form.Label>
                    <Col sm={10}>
                        <Form.Control placeholder="The price of the book" />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}