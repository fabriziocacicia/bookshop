import Table from 'react-bootstrap/Table';
import DeleteButton from './components/delete_button';
import { useState } from 'react';
import ConfirmBookDeletionModal from './components/confirm_book_deletion_modal';
import EditButton from './components/edit_button';


const books = [
    { _id: "1", title: 'book1', author: 'author', year: 1230, price: 20.0},
    { _id: "2", title: 'book2', author: 'author', year: 1235, price: 25.0},
    { _id: "3", title: 'book3', author: 'author', year: 2002, price: 40.5},
]

function BookListItem({id, title, author, year, price, onClickDelete }: {id: string, title: string, author: string, year: number, price: number, onClickDelete: () => any}) {
    return (
        <tr>
            <td>{id}</td>
            <td>{title}</td>
            <td>{author}</td>
            <td>{year}</td>
            <td>{price}€</td>
            <td>
                <EditButton onClick={()=>{}} />
            </td>
            <td>
                <DeleteButton onClick={onClickDelete} />
            </td>
        </tr> 
    );
}


export default function BooksListPage() {
    const [confirmBookDeletionModalShowState, setConfirmBookDeletionModalShowState] = useState<boolean>(false);
    const [bookToDeleteTitle, setbookToDeleteTitle] = useState<string>("")

    const handleCloseConfirmBookDeletionModal = () => setConfirmBookDeletionModalShowState(false);
    const handleShowConfirmBookDeletionModal = (bookTitle: string) => {
        setbookToDeleteTitle(bookTitle);
        setConfirmBookDeletionModalShowState(true);
    };


    const listItems = books.map(book => 
            <BookListItem key={book._id} id={book._id} title={book.title} author={book.author} year={book.year} price={book.price} onClickDelete={() => handleShowConfirmBookDeletionModal(book.title)}/>
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
        </>
    )
}