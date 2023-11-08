import { useState } from 'react';
import Book from '../commons/models/book';
import Loading from 'react-fullscreen-loading';
import BooksRepository from '../commons/repositories/books_repository';
import { useNavigate } from 'react-router-dom';
import BookAddedModal from './components/book_added_modal';
import AddBookForm from './components/add_book_form';

export default function AddBookPage() {
    const navigate = useNavigate();
    
    const [modalTitle, setModalTitle] = useState<string>("");

    const [loadingSpinnerShowState, setLoadingSpinnerShowState] = useState<boolean>(false);
    const [bookAddedModalShowState, setBookAddedModalShowState] = useState<boolean>(false);

    
    async function handleOnSubmit(book: Book) {
        setLoadingSpinnerShowState(true);

        const response = await BooksRepository.addBook(book);

        setLoadingSpinnerShowState(false);      

        if (response.ok) {
            setModalTitle(book.title);
            setBookAddedModalShowState(true);
        }
    }

    function handleClickOkOnBookAddedModal() {
        navigate('/');
    }

    return (
        <>  
            <Loading loading={loadingSpinnerShowState} background="#00000055" loaderColor="#3498db" />
            <BookAddedModal bookTitle={modalTitle} show={bookAddedModalShowState} onClickOK={handleClickOkOnBookAddedModal}/>
            <div style={{ margin: "40px 300px"}}>
                <h1 style={{ margin: "40px"}}>Add a new Book</h1>
                <AddBookForm onSubmit={handleOnSubmit}/>
            </div>
        </>
    ) 
}