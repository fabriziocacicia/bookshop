import Book from "../models/book";
import BooksProvider from "../providers/books_provider";

export default class BooksRepository {
    public static async getBooks(): Promise<Book[] | Response> {
        const response = await BooksProvider.getBooks();

        if (!response.ok) {
            return response;
        }

        const record = await response.json();

        let books: Book[] = []

        for (let i in record['books']) {
            books.push(Book.fromJSON(record['books'][i]))
        }

        return books;
    }
    
    public static async deleteBook(bookID: string): Promise<Response> {
        return BooksProvider.deleteBook(bookID);
    }

    public static async addBook(book: Book): Promise<Response> {
        const bookJSON = book.toJson();

        return BooksProvider.addBook(bookJSON);
    }

    public static async getBook(bookID: string): Promise<Book | Response> {
        const response = await BooksProvider.getBook(bookID);

        if (!response.ok) {
            return response;
        }

        const record = await response.json();

        const book = Book.fromJSON(record['data']);

        return book;
    }
}