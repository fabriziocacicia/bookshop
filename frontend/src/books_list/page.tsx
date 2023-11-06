import Table from 'react-bootstrap/Table';

const books = [
    { _id: "1", title: 'book1', author: 'author', year: 1230, price: 20.0},
    { _id: "2", title: 'book2', author: 'author', year: 1235, price: 25.0},
    { _id: "3", title: 'book3', author: 'author', year: 2002, price: 40.5},
]

function BookListItem({id, title, author, year, price }: {id: string, title: string, author: string, year: number, price: number}) {
    return (
        <tr>
            <td>{id}</td>
            <td>{title}</td>
            <td>{author}</td>
            <td>{year}</td>
            <td>{price}€</td>
        </tr> 
    );
}


export default function BooksListPage() {
    const listItems = books.map(book => 
            <BookListItem id={book._id} title={book.title} author={book.author} year={book.year} price={book.price} />
        );
        
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Year</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {listItems}
            </tbody>
        </Table>
    )
}