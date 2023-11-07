import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import ConfirmBookDeletionModal from './components/confirm_book_deletion_modal';
import { useNavigate } from "react-router-dom";
import Book from '../commons/models/book';
import BooksRepository from '../commons/repositories/books_repository';
import BookListItem from './components/book_list_item';


export default function BooksListPage() {
    const navigate = useNavigate();

    const [books, setBooks] = useState<Book[]>([]);

    const [confirmBookDeletionModalShowState, setConfirmBookDeletionModalShowState] = useState<boolean>(false);
    const [bookToDeleteTitle, setbookToDeleteTitle] = useState<string>("")

    const handleCloseConfirmBookDeletionModal = () => setConfirmBookDeletionModalShowState(false);
    const handleShowConfirmBookDeletionModal = (bookTitle: string) => {
        setbookToDeleteTitle(bookTitle);
        setConfirmBookDeletionModalShowState(true);
    };

    const navigateToEditBookPage = (bookID: string) => {
        navigate(`/book/${bookID}`);
    }

    useEffect(() => {
        async function fetchBooks() {
            const response: Book[] | Response = await BooksRepository.getBooks();

            if (response instanceof Response) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            } else {
                setBooks(response);
                return
            }
        }

        fetchBooks()
    }, []);


    const listItems = books.map(book => 
            <BookListItem key={book.id} id={book.id} title={book.title} author={book.author} year={book.year} price={book.price} onClickEdit={() => navigateToEditBookPage(book.id)} onClickDelete={() => handleShowConfirmBookDeletionModal(book.title)}/>
        );
        
    return (
        <>  
            <ConfirmBookDeletionModal bookTitle={bookToDeleteTitle} show={confirmBookDeletionModalShowState} onHide={handleCloseConfirmBookDeletionModal} onClickCancel={handleCloseConfirmBookDeletionModal} onClickDelete={()=>{}}/>
            <Table responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
                
            </Table>
            {listItems.length == 0 ? "Nessun libro ancora presente" : null}
        </>
    )
}