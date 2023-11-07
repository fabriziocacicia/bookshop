import Table from 'react-bootstrap/Table';
import DeleteButton from './components/delete_button';
import { useEffect, useState } from 'react';
import ConfirmBookDeletionModal from './components/confirm_book_deletion_modal';
import EditButton from './components/edit_button';
import { useNavigate } from "react-router-dom";
import Book from '../commons/models/book';


function BookListItem({id, title, author, year, price, onClickEdit, onClickDelete }: {id: string, title: string, author: string, year: number, price: number, onClickEdit: () => any, onClickDelete: () => any}) {
    return (
        <tr>
            <td>{id}</td>
            <td>{title}</td>
            <td>{author}</td>
            <td>{year}</td>
            <td>{price}€</td>
            <td>
                <EditButton onClick={onClickEdit} />
            </td>
            <td>
                <DeleteButton onClick={onClickDelete} />
            </td>
        </tr> 
    );
}


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
            const response = await fetch(`http://localhost:5123/books`)

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const record = await response.json();
            console.log(record)
            console.log(record['books'])
            
            let parsedBooks: Book[] = []

            for (let i in record['books']) {
                parsedBooks.push(Book.fromJSON(record['books'][i]))
            }
            
            console.log(parsedBooks)
            setBooks(parsedBooks);
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