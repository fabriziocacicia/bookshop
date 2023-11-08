import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Book from '../commons/models/book';
import BooksRepository from '../commons/repositories/books_repository';
import BookListItem from './components/book_list_item';
import Spinner from 'react-bootstrap/Spinner';


export default function BooksListPage() {
    const navigate = useNavigate();

    const [books, setBooks] = useState<Book[]>();
    var listItems: any[] = [];


    const handleDeleteBook = async (bookID: string) => {
        const response: Response = await BooksRepository.deleteBook(bookID);

        if (response.ok) {
            navigate(0);
        }
    }

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


    if (books != undefined) {
        listItems = books
        .filter((book) => book.id != undefined)    
        .map(book => 
            <BookListItem key={book.id} id={book.id!} title={book.title} author={book.author} year={book.year} price={book.price} onClickEdit={() => navigateToEditBookPage(book.id!)} onClickDelete={() => handleDeleteBook(book.id!)}/>
        );
    }

    return (
        <>  
            {
                books == undefined ?
                <Spinner animation="border" />
                :
                <>
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
            }
        </>
    )
}