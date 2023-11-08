import { SyntheticEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useParams } from "react-router";
import BooksRepository from '../commons/repositories/books_repository';
import { useNavigate } from 'react-router-dom';
import Book from '../commons/models/book';
import Loading from 'react-fullscreen-loading';
import BookEditedModal from './components/book_edited_modal';


export default function EditBookPage() {
    const params = useParams();
    const bookID = params["id"];

    const navigate = useNavigate();
    
    const [bookTitle, setBookTitle] = useState<string>("");
    const [bookAuthor, setBookAuthor] = useState<string>("");
    const [bookYear, setBookYear] = useState<number>(0);
    const [bookPrice, setBookPrice] = useState<number>(0);

    const [loadingSpinnerShowState, setLoadingSpinnerShowState] = useState<boolean>(false);
    const [bookEditedModalShowState, setBookEditedModalShowState] = useState<boolean>(false);

    useEffect(() => {
        async function fetchBook() {
            if (bookID != undefined) {
                const response = await BooksRepository.getBook(bookID);

                if (response instanceof Book) {
                    setBookTitle(response.title);
                    setBookAuthor(response.author);
                    setBookYear(response.year);
                    setBookPrice(response.price);
                }

                return;
            }

            navigate('/404');
        }
        
        fetchBook();
    }, []);
    
    

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

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();

        const book: Book = new Book({id: bookID, title: bookTitle, author: bookAuthor, year: bookYear, price: bookPrice});
        
        setLoadingSpinnerShowState(true);

        const response: Response = await BooksRepository.editBook(book);

        setLoadingSpinnerShowState(false);

        if (response.ok) {
            setBookEditedModalShowState(true);
        }
    }

    function handleClickOkOnBookEditedModal() {
        navigate('/');
    }

    return (
        <>  
            <Loading loading={loadingSpinnerShowState} background="#00000055" loaderColor="#3498db" />
            <BookEditedModal show={bookEditedModalShowState} onClickOK={handleClickOkOnBookEditedModal}/>
            <div style={{ margin: "40px 300px"}}>
                <h1 style={{ margin: "40px"}}>Edit Book</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" as={Row}>
                        <Form.Label column sm={2}>ID</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                disabled
                                readOnly
                                value={bookID}
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
            </div>
        </>
    )
}