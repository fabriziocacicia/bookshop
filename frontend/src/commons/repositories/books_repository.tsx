import Book from "../models/book";
import BooksProvider from "../providers/books_provider";

export default class BooksRepository {
    public static async getBooks(queryParams: string = ""): Promise<Book[] | Response> {
        const response = await BooksProvider.getBooks(queryParams);

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

    public static async editBook(book: Book): Promise<Response> {
        if (book.id == undefined) {
            throw new Error("It's not possible to edit a book without an ID");
        } else {
            return BooksProvider.editBook(book.id, book.toJson());
        }
    }

    public static async aiSearch(searchQuery: string): Promise<Book[] | Response> {
        const response = await BooksProvider.aiSearch(searchQuery);

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
}