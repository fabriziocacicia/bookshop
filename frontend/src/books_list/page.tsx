import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Book from '../commons/models/book';
import BooksRepository from '../commons/repositories/books_repository';
import BookListItem from './components/book_list_item';
import Spinner from 'react-bootstrap/Spinner';
import AISearchModal from './components/ai_search_modal';
import UpTriangleUniIcon from './components/up_triangle_uni_icon';
import DownTriangleUniIcon from './components/down_triangle_uni_icon';

const ASCENDING_ORDER = "1";
const DESCENDING_ORDER = "-1";

function ClickableTableHeaderCell({children, sorting, onClick,}: {children: any, sorting: number | null, onClick: () => void}) {
    return (
        <th onClick={onClick} style={{ cursor: 'pointer' }}>
            {children}
            {sorting == null ? null : sorting == 1 ? <UpTriangleUniIcon/> : sorting == -1 ? <DownTriangleUniIcon /> : null}
        </th>
    )
}


export default function BooksListPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchModalShowState, setSearchModalShowState] = useState<boolean>(false);

    function hideSearchModal() {
        setSearchModalShowState(false);
    }

    async function handleSubmitAISearchQuery(searchQuery: string) {
        const response = await BooksRepository.aiSearch(searchQuery);
        
        if (response instanceof Response) {
            setBooks([]);
        } else {
            setBooks(response);
        }

        hideSearchModal();
    }

    const [books, setBooks] = useState<Book[]>();
    var listItems: any[] = [];


    const handleDeleteBook = async (bookID: string) => {
        const response: Response = await BooksRepository.deleteBook(bookID);

        if (response.ok) {
            navigate(0);
        }
    }

    function navigateToEditBookPage(bookID: string) {
        navigate(`/book/${bookID}`);
    }


    function isOnSearchPage(): boolean {
        return location.pathname.includes("aisearch");
    }

    function onClickSort(fieldName: string) {
        const currentSorting: string | null = searchParams.get('sort');
        const currentOrdering: string | null = searchParams.get('ord');

        let newOrdering: string;

        if(currentSorting != fieldName) {
            newOrdering = ASCENDING_ORDER;
        } else {
            newOrdering = currentOrdering == '1' ? '-1' : '1';
        }

        setSearchParams({sort: fieldName, ord: newOrdering})
    }

    useEffect(() => {
        async function fetchBooks() {
            const response: Book[] | Response = await BooksRepository.getBooks(location.search);

            if (response instanceof Response) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            } else {
                setBooks(response);
                return
            }
        }

        if (isOnSearchPage()) {
            setSearchModalShowState(true);
        } else {
            setSearchModalShowState(false);
            fetchBooks()
        }  
    }, [location]);


    if (books != undefined) {
        listItems = books
        .filter((book) => book.id != undefined)    
        .map(book => 
            <BookListItem key={book.id} id={book.id!} title={book.title} author={book.author} year={book.year} price={book.price} onClickEdit={() => navigateToEditBookPage(book.id!)} onClickDelete={() => handleDeleteBook(book.id!)}/>
        );
    }

    return (
        <>  
            <AISearchModal show={searchModalShowState} onHide={hideSearchModal} onSubmit={handleSubmitAISearchQuery}/>
            {   
                books == undefined ?
                <Spinner animation="border" />
                :
                <>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <ClickableTableHeaderCell children={"Title"} sorting={searchParams.get('sort') == 'title' ? parseInt(searchParams.get('ord')!) : null} onClick={() => onClickSort('title')}/>
                            <ClickableTableHeaderCell children={"Author"} sorting={searchParams.get('sort') == 'author' ? parseInt(searchParams.get('ord')!) : null} onClick={() => onClickSort('author')}/>
                            <ClickableTableHeaderCell children={"Year"} sorting={searchParams.get('sort') == 'year' ? parseInt(searchParams.get('ord')!) : null} onClick={() => onClickSort('year')}/>
                            <ClickableTableHeaderCell children={"Price"} sorting={searchParams.get('sort') == 'price' ? parseInt(searchParams.get('ord')!) : null} onClick={() => onClickSort('price')}/>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems}
                    </tbody>
                    
                </Table>
                {listItems.length == 0 ? "No books yet" : null}
                </>
            }
        </>
    )
}