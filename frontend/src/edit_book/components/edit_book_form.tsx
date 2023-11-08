import { SyntheticEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Book from '../../commons/models/book';

export default function EditBookForm({book, onSubmit}: {book: Book, onSubmit: (book: Book) => void}) {

    const [bookTitle, setBookTitle] = useState<string>(book.title);
    const [bookAuthor, setBookAuthor] = useState<string>(book.author);
    const [bookYear, setBookYear] = useState<number>(book.year);
    const [bookPrice, setBookPrice] = useState<number>(book.price);

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

    function handleSubmit(event: SyntheticEvent, bookID: string) {
        event.preventDefault();

        const book: Book = new Book({id: bookID, title: bookTitle, author: bookAuthor, year: bookYear, price: bookPrice});
        
        onSubmit(book);
    }


    return (
        <Form onSubmit={(event) => handleSubmit(event, book.id!)}>
            <Form.Group className="mb-3" as={Row}>
                <Form.Label column sm={2}>ID</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        disabled
                        readOnly
                        value={book.id}
                    />
                </Col>
            </Form.Group>
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