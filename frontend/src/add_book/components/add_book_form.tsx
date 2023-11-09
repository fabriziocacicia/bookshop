import { SyntheticEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Book from '../../commons/models/book';

export default function AddBookForm ({onSubmit}: {onSubmit: (book: Book) => void}) {
    const [bookTitle, setBookTitle] = useState<string>("");
    const [bookAuthor, setBookAuthor] = useState<string>("");
    const [bookYear, setBookYear] = useState<number>(0);
    const [bookPrice, setBookPrice] = useState<number>(0);

    function handleFormControlChange(event: any): void {
        const formControlID: string = event.target.id;
        switch(formControlID) {
            case "newBookFormTitle":
                setBookTitle(event.target.value);
                break;
            case "newBookFormAuthor":
                setBookAuthor(event.target.value);
                break;
            case "newBookFormYear":
                setBookYear(event.target.valueAsNumber);
                break;
            case "newBookFormPrice":
                setBookPrice(event.target.valueAsNumber);
                break;
        }
    }

    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();

        const book: Book = new Book({title: bookTitle, author: bookAuthor, year: bookYear, price: bookPrice});
        
        onSubmit(book);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" as={Row} controlId="newBookFormTitle">
                <Form.Label column sm={2}>Title</Form.Label>
                <Col sm={10}>
                    <Form.Control 
                        placeholder="The title of the book"
                        value={bookTitle}
                        onChange={handleFormControlChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" as={Row} controlId="newBookFormAuthor">
                <Form.Label column sm={2}>Author</Form.Label>
                <Col sm={10}>
                    <Form.Control 
                        placeholder="The author of the book" 
                        value={bookAuthor}
                        onChange={handleFormControlChange}
                    />
                </Col> 
            </Form.Group>
            <Form.Group className="mb-3" as={Row} controlId="newBookFormYear">
                <Form.Label column sm={2}>Year</Form.Label>
                <Col sm={10}>
                    <Form.Control 
                        placeholder="The pubblication year of the book" 
                        as="input"
                        type="number"
                        value={bookYear}
                        onChange={handleFormControlChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" as={Row} controlId="newBookFormPrice">
                <Form.Label column sm={2}>Price</Form.Label>
                <Col sm={10}>
                    <Form.Control 
                        placeholder="The price of the book" 
                        as="input"
                        type="number"
                        value={bookPrice}
                        onChange={handleFormControlChange}
                    />
                </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}