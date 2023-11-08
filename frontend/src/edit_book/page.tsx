import { useEffect, useState } from 'react';

import { useParams } from "react-router";
import BooksRepository from '../commons/repositories/books_repository';
import { useNavigate } from 'react-router-dom';
import Book from '../commons/models/book';
import Loading from 'react-fullscreen-loading';
import BookEditedModal from './components/book_edited_modal';
import EditBookForm from './components/edit_book_form';
import Spinner from 'react-bootstrap/Spinner';


export default function EditBookPage() {
    const params = useParams();
    const bookID = params["id"];

    const navigate = useNavigate();
    
    const [book, setBook] = useState<Book>();

    const [loadingSpinnerShowState, setLoadingSpinnerShowState] = useState<boolean>(false);
    const [bookEditedModalShowState, setBookEditedModalShowState] = useState<boolean>(false);

    useEffect(() => {
        async function fetchBook() {
            if (bookID != undefined) {
                const response = await BooksRepository.getBook(bookID);

                if (response instanceof Book) {
                    setBook(response);
                }

                return;
            }

            navigate('/404');
        }
        
        fetchBook();
    }, []);
    
    async function handleOnSubmit(book: Book) {
        setLoadingSpinnerShowState(true);

        const response: Response = await BooksRepository.editBook(book);

        setLoadingSpinnerShowState(false);

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
            {
                book == undefined ? 
                <div>
                    <Spinner animation="border" />
                </div> 
                : 
                <div style={{ margin: "40px 300px"}}>
                    <h1 style={{ margin: "40px"}}>Edit Book</h1>
                    <EditBookForm book={book} onSubmit={handleOnSubmit}/>
                </div>
            }
        </>
    )
}